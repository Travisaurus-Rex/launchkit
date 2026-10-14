import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch();

const page = await browser.newPage({
  viewport: { width: 1440, height: 1080 },
  deviceScaleFactor: 1,
});

const output = "screenshots";
await mkdir(output, { recursive: true });

await page.goto("http://localhost:3000/templates/atelier-studio/preview", {
  waitUntil: "networkidle",
});

await page.screenshot({
  path: `${output}/atelier-thumbnail.png`,
});

await page.screenshot({
  path: `${output}/atelier-full.png`,
  fullPage: true,
});

await browser.close();

console.log("Atelier screenshots captured successfully.");
