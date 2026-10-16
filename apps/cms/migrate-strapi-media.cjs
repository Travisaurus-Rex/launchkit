/**
 * One-time Strapi 5 local-media -> Cloudinary migration.
 * Run from apps/cms after installing pg and cloudinary if needed.
 * Uses Strapi's own DB connection via strapi.load(), avoiding a second DB config.
 * Dry run by default; --apply writes changes. Backups are written first.
 */
const fs = require("node:fs/promises");
const path = require("node:path");
const { createStrapi } = require("@strapi/strapi");
const cloudinary = require("cloudinary").v2;

const apply = process.argv.includes("--apply");
const baseDir = process.cwd();
const now = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(baseDir, `media-backup-${now}.json`);
const strapi = createStrapi({ distDir: path.join(baseDir, "dist") });

function localPath(url) {
  if (!url || typeof url !== "string") return null;
  let parsed;
  try {
    parsed = new URL(url, "http://localhost:1337");
  } catch {
    return null;
  }
  if (!parsed.pathname.startsWith("/uploads/")) return null;
  const filename = decodeURIComponent(
    parsed.pathname.slice("/uploads/".length),
  );
  if (
    !filename ||
    filename.includes("/") ||
    filename.includes("\\") ||
    filename === "." ||
    filename === ".."
  )
    return null;
  return path.join(baseDir, "public", "uploads", filename);
}

function cloudinaryFormat(asset) {
  return {
    name: asset.original_filename || asset.public_id.split("/").pop(),
    hash: asset.public_id.split("/").pop(),
    ext: `.${asset.format}`,
    mime: `${asset.resource_type}/${asset.format === "jpg" ? "jpeg" : asset.format}`,
    width: asset.width,
    height: asset.height,
    size: Math.round(asset.bytes / 1000),
    url: asset.secure_url,
    provider_metadata: {
      public_id: asset.public_id,
      resource_type: asset.resource_type,
    },
  };
}

async function main() {
  await strapi.load();
  try {
    const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
    if (!CLOUDINARY_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
      throw new Error(
        "Missing CLOUDINARY_NAME, CLOUDINARY_KEY or CLOUDINARY_SECRET in apps/cms/.env",
      );
    }
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
      secure: true,
    });

    const files = await strapi.db
      .query("plugin::upload.file")
      .findMany({ limit: 10000 });
    const candidates = files.filter((file) => localPath(file.url));
    await fs.writeFile(backupPath, JSON.stringify(files, null, 2));
    console.log(`Backed up ${files.length} media records to ${backupPath}`);
    console.log(`Found ${candidates.length} local media records to migrate.`);
    if (!apply) {
      for (const f of candidates)
        console.log(`[DRY RUN] #${f.id}: ${f.name} -> ${localPath(f.url)}`);
      console.log(
        "No changes made. Run with --apply after reviewing the list.",
      );
      return;
    }

    let migrated = 0;
    for (const file of candidates) {
      try {
        const original = localPath(file.url);
        await fs.access(original);
        const uploaded = await cloudinary.uploader.upload(original, {
          folder: "launchkit",
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        });
        const updatedFormats = file.formats ? { ...file.formats } : null;
        if (updatedFormats) {
          for (const [key, fmt] of Object.entries(updatedFormats)) {
            const fmtPath = localPath(fmt.url);
            if (!fmtPath) continue;
            await fs.access(fmtPath);
            const uploadedFmt = await cloudinary.uploader.upload(fmtPath, {
              folder: "launchkit",
              resource_type: "image",
              use_filename: true,
              unique_filename: true,
            });
            updatedFormats[key] = { ...fmt, ...cloudinaryFormat(uploadedFmt) };
          }
        }
        await strapi.db.query("plugin::upload.file").update({
          where: { id: file.id },
          data: {
            url: uploaded.secure_url,
            provider: "cloudinary",
            provider_metadata: {
              public_id: uploaded.public_id,
              resource_type: uploaded.resource_type,
            },
            formats: updatedFormats,
          },
        });
        migrated++;
        console.log(`[OK] #${file.id}: ${file.name}`);
      } catch (error) {
        console.error(`[FAILED] #${file.id}: ${file.name}: ${error.message}`);
      }
    }
    console.log(
      `Migrated ${migrated}/${candidates.length}. Backup: ${backupPath}`,
    );
    if (migrated !== candidates.length) process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main().catch(async (error) => {
  console.error(error);
  try {
    await strapi.destroy();
  } catch {}
  process.exitCode = 1;
});
