const { createStrapi } = require("@strapi/strapi");

async function main() {
  const strapi = await createStrapi({
    distDir: "./dist",
  }).load();

  try {
    const files = await strapi.db.query("plugin::upload.file").findMany();

    let updated = 0;

    for (const file of files) {
      if (file.provider === "cloudinary") {
        continue;
      }

      console.log(`Needs migration: ${file.id} - ${file.name}`);
      updated++;
    }

    console.log(`Found ${updated} files requiring migration.`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
