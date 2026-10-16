import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import * as cheerio from "cheerio";

function getOriginalImageUrl(value: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value, "http://localhost");

    // Next.js optimized image URLs contain the original URL
    // in their "url" query parameter.
    if (url.pathname === "/_next/image") {
      return url.searchParams.get("url");
    }

    if (url.protocol === "http:" || url.protocol === "https:") {
      return value;
    }

    return null;
  } catch {
    return null;
  }
}

function getImageExtension(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("avif")) return "avif";
  if (contentType.includes("svg")) return "svg";
  return "jpg";
}

export async function POST(request: NextRequest) {
  try {
    const { templateSlug, ...customizations } = await request.json();

    if (typeof templateSlug !== "string" || !templateSlug) {
      return NextResponse.json(
        { error: "Missing template slug." },
        { status: 400 },
      );
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(customizations)) {
      if (typeof value === "string") {
        params.set(key, value);
      }
    }

    const previewUrl = new URL(
      `/export-preview/${encodeURIComponent(templateSlug)}`,
      request.url,
    );

    previewUrl.search = params.toString();

    const [pageResponse, cssResponse] = await Promise.all([
      fetch(previewUrl, { cache: "no-store" }),
      fetch(new URL("/export/styles.css", request.url), {
        cache: "no-store",
      }),
    ]);

    if (!pageResponse.ok || !cssResponse.ok) {
      throw new Error("Unable to load export preview or stylesheet.");
    }

    const $ = cheerio.load(await pageResponse.text());

    // Remove Next.js scripts and framework-specific resources.
    $("script").remove();
    $('link[rel="preload"]').remove();
    $('link[rel="modulepreload"]').remove();
    $('link[rel="stylesheet"]').remove();

    // Attach the standalone stylesheet.
    $("head").append('<link rel="stylesheet" href="./assets/styles.css">');

    const zip = new JSZip();
    const imageCache = new Map<string, string>();
    let imageCount = 0;

    async function saveImage(source: string): Promise<string | null> {
      const originalUrl = getOriginalImageUrl(source);

      if (!originalUrl) return null;

      if (imageCache.has(originalUrl)) {
        return imageCache.get(originalUrl)!;
      }

      const imageUrl = new URL(originalUrl, previewUrl);

      // Only download images from the configured Strapi server.
      // This avoids fetching arbitrary URLs supplied by visitors.
      const strapiOrigin = new URL(
        process.env.STRAPI_URL ??
          process.env.NEXT_PUBLIC_STRAPI_URL ??
          "http://localhost:1337",
      ).origin;

      if (
        imageUrl.origin !== strapiOrigin ||
        !imageUrl.pathname.startsWith("/uploads/")
      ) {
        return null;
      }

      const imageResponse = await fetch(imageUrl, {
        cache: "no-store",
      });

      if (!imageResponse.ok) {
        throw new Error(`Unable to download image: ${imageUrl.pathname}`);
      }

      const contentType = imageResponse.headers.get("content-type") ?? "";

      if (!contentType.startsWith("image/")) {
        throw new Error(`Unexpected image type: ${contentType}`);
      }

      imageCount++;

      const extension = getImageExtension(contentType);
      const filename = `image-${imageCount}.${extension}`;
      const localPath = `assets/images/${filename}`;

      zip.file(localPath, await imageResponse.arrayBuffer());

      const htmlPath = `./${localPath}`;
      imageCache.set(originalUrl, htmlPath);

      return htmlPath;
    }

    // Download each image and replace its Next.js URL.
    for (const element of $("img").toArray()) {
      const img = $(element);

      const source = img.attr("src") ?? "";
      const localPath = await saveImage(source);

      if (localPath) {
        img.attr("src", localPath);
      }

      // Remove responsive image URLs that still reference Next.js.
      img.removeAttr("srcset");
      img.removeAttr("sizes");
      img.removeAttr("data-nimg");
      img.removeAttr("decoding");
      img.removeAttr("loading");
      img.removeAttr("fetchpriority");
    }

    // Remove any remaining Next.js image preloads.
    $("link[imagesrcset]").remove();

    zip.file("index.html", $.html());
    zip.file("assets/styles.css", await cssResponse.text());

    const archive = await zip.generateAsync({
      type: "uint8array",
      compression: "DEFLATE",
    });

    return new NextResponse(Buffer.from(archive), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${templateSlug}.zip"`,
      },
    });
  } catch (error) {
    console.error("Export failed:", error);

    return NextResponse.json(
      { error: "Failed to generate website export." },
      { status: 500 },
    );
  }
}
