"use client";

import { useState } from "react";

import {
  getTemplateComponent,
  type TemplateLayoutProps,
} from "@/components/templates/registry";

import type { Template } from "@/lib/strapi";
import { APP_NAME } from "@/lib/config";
import type { ExportConfig } from "@/lib/export-config";

type CustomizerProps = {
  template: Template;
};

export default function Customizer({ template }: CustomizerProps) {
  const TemplateComponent = getTemplateComponent(template.design);

  const brand = template.brand ?? {
    id: 0,
    brandName: "",
    primaryColor: "#000000",
  };

  const hero = template.hero ?? {
    id: 0,
    headline: "",
    subheadline: "",
    ctaLabel: "",
    ctaUrl: null,
  };

  const initialBrandName = brand?.brandName ?? "";
  const initialHeadline = hero?.headline ?? "";
  const initialSubheadline = hero?.subheadline ?? "";
  const initialCtaLabel = hero?.ctaLabel ?? "";
  const initialPrimaryColor = brand?.primaryColor ?? "#000000";

  const [brandName, setBrandName] = useState(initialBrandName);
  const [headline, setHeadline] = useState(initialHeadline);
  const [subheadline, setSubheadline] = useState(initialSubheadline);
  const [ctaLabel, setCtaLabel] = useState(initialCtaLabel);
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);

  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  if (!TemplateComponent) {
    return (
      <main className="p-8">
        This template does not have a registered design yet.
      </main>
    );
  }

  const previewProps: TemplateLayoutProps = {
    brand: {
      ...brand,
      brandName,
      primaryColor,
    },
    hero: {
      ...hero,
      headline,
      subheadline,
      ctaLabel,
    },
    features: template.features ?? [],
    projects: template.projects ?? [],
    menuItems: template.menuItems ?? [],
    businessInfo: template.businessInfo ?? null,
    galleryImages: template.galleryImages ?? [],
  };

  const exportConfig: ExportConfig = {
    templateSlug: template.slug,
    brandName,
    headline,
    subheadline,
    ctaLabel,
    primaryColor,
  };

  const previewWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };

  function resetChanges() {
    setBrandName(brand.brandName);
    setHeadline(hero.headline);
    setSubheadline(hero.subheadline);
    setCtaLabel(hero.ctaLabel);
    setPrimaryColor(brand.primaryColor);
  }

  function openExportPreview() {
    const params = new URLSearchParams({
      brandName,
      headline,
      subheadline,
      ctaLabel,
      primaryColor,
    });

    window.open(
      `/export-preview/${encodeURIComponent(template.slug)}?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function downloadWebsite() {
    const response = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateSlug: template.slug,
        brandName,
        headline,
        subheadline,
        ctaLabel,
        primaryColor,
      }),
    });

    if (!response.ok) {
      alert("Website export failed.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.slug}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-stone-100 text-stone-950">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-stone-200 bg-white px-6 py-4">
        <a href="/" className="font-semibold tracking-tight">
          {APP_NAME}
        </a>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="mr-3 hidden text-sm text-stone-500 md:inline">
            Customizing: {template.title}
          </span>

          <button
            type="button"
            onClick={resetChanges}
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
          >
            Reset changes
          </button>

          <button
            type="button"
            onClick={openExportPreview}
            className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Preview export
          </button>

          <button
            type="button"
            onClick={downloadWebsite}
            className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Download website
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden lg:grid-cols-[320px_minmax(0,1fr)] lg:grid-rows-1">
        <aside className="min-h-0 space-y-6 overflow-y-auto border-b border-stone-200 bg-white p-6 lg:border-b-0 lg:border-r">
          <div>
            <h1 className="text-xl font-semibold">Customize your site</h1>
            <p className="mt-1 text-sm text-stone-500">
              Changes appear in the preview as you type.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Brand name
              <input
                value={brandName}
                onChange={(event) => setBrandName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-stone-600"
              />
            </label>

            <label className="block text-sm font-medium">
              Hero headline
              <textarea
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-stone-600"
              />
            </label>

            <label className="block text-sm font-medium">
              Hero description
              <textarea
                value={subheadline}
                onChange={(event) => setSubheadline(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-stone-600"
              />
            </label>

            <label className="block text-sm font-medium">
              Button text
              <input
                value={ctaLabel}
                onChange={(event) => setCtaLabel(event.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-stone-600"
              />
            </label>

            <label className="block text-sm font-medium">
              Primary color
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(event) => setPrimaryColor(event.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-stone-300 bg-white p-1"
                />
                <span className="font-mono text-sm text-stone-600">
                  {primaryColor}
                </span>
              </div>
            </label>
          </div>

          <p className="border-t border-stone-200 pt-4 text-xs leading-5 text-stone-500">
            These edits are temporary. They change your preview, not the
            original content saved in Strapi.
          </p>
        </aside>

        <main className="min-h-0 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-stone-700">Live preview</h2>

            <div className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`rounded-md px-3 py-2 text-sm ${
                  previewMode === "desktop"
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                Desktop
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("tablet")}
                className={`rounded-md px-3 py-2 text-sm ${
                  previewMode === "tablet"
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                Tablet
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`rounded-md px-3 py-2 text-sm ${
                  previewMode === "mobile"
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          <div
            className="@container mx-auto min-h-[600px] overflow-hidden bg-white shadow-sm transition-[width] duration-300"
            style={{
              width: previewWidths[previewMode],
              maxWidth: "100%",
            }}
          >
            <TemplateComponent {...previewProps} />
          </div>
        </main>
      </div>
    </div>
  );
}
