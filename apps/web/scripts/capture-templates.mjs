import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch();

const page = await browser.newPage({
  viewport: { width: 1440, height: 1080 },
  deviceScaleFactor: 1,
});

const output = "screenshots";
await mkdir(output, { recursive: true });

await page.goto("http://localhost:3000/templates/hearth-and-honey/preview", {
  waitUntil: "networkidle",
});

// Wait until all images have finished loading
await page.locator("img").evaluateAll(async (images) => {
  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }

      if (img.complete && img.naturalWidth > 0) {
        await img.decode().catch(() => {});
      }
    }),
  );
});

await page.screenshot({
  path: `${output}/local-thumbnail.png`,
});

await page.screenshot({
  path: `${output}/local-full.png`,
  fullPage: true,
});

await browser.close();

console.log("local business screenshots captured successfully.");
