const { createStrapi } = require("@strapi/strapi");
const fs = require("node:fs");
const path = require("node:path");

function sqlString(value) {
  return "'" + value.replace(/'/g, "''") + "'";
}

async function main() {
  const strapi = await createStrapi({
    distDir: "./dist",
  }).load();

  try {
    const files = await strapi.db.query("plugin::upload.file").findMany();

    const cloudinaryFiles = files.filter(
      (file) =>
        file.provider === "cloudinary" &&
        file.url?.startsWith("https://res.cloudinary.com/"),
    );

    const statements = cloudinaryFiles.map((file) => {
      const formats = file.formats
        ? `${sqlString(JSON.stringify(file.formats))}::jsonb`
        : "NULL";

      return `
UPDATE files
SET
  url = ${sqlString(file.url)},
  provider = 'cloudinary',
  provider_metadata = ${
    file.provider_metadata
      ? `${sqlString(JSON.stringify(file.provider_metadata))}::jsonb`
      : "NULL"
  },
  formats = ${formats}
WHERE name = ${sqlString(file.name)}
  AND provider = 'local';
`;
    });

    const output = ["BEGIN;", ...statements, "COMMIT;"].join("\n");

    const outputPath = path.join(__dirname, "cloudinary-migration.sql");
    fs.writeFileSync(outputPath, output);

    console.log(
      `Generated SQL for ${cloudinaryFiles.length} Cloudinary images.`,
    );
    console.log(`Saved to: ${outputPath}`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
