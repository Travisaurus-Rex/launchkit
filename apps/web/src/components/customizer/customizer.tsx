"use client";

import { useState } from "react";

import {
  getTemplateComponent,
  type TemplateLayoutProps,
} from "@/components/templates/registry";

import type { Template } from "@/lib/strapi";

type CustomizerProps = {
  template: Template;
};

export default function Customizer({ template }: CustomizerProps) {
  const TemplateComponent = getTemplateComponent(template.design);

  const [brandName, setBrandName] = useState(template.brand.brandName);
  const [headline, setHeadline] = useState(template.hero.headline);
  const [subheadline, setSubheadline] = useState(template.hero.subheadline);
  const [ctaLabel, setCtaLabel] = useState(template.hero.ctaLabel);
  const [primaryColor, setPrimaryColor] = useState(template.brand.primaryColor);

  if (!TemplateComponent) {
    return (
      <main className="p-8">
        This template does not have a registered design yet.
      </main>
    );
  }

  const previewProps: TemplateLayoutProps = {
    brand: {
      ...template.brand,
      brandName,
      primaryColor,
    },
    hero: {
      ...template.hero,
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

  function resetChanges() {
    setBrandName(template.brand.brandName);
    setHeadline(template.hero.headline);
    setSubheadline(template.hero.subheadline);
    setCtaLabel(template.hero.ctaLabel);
    setPrimaryColor(template.brand.primaryColor);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-stone-100 text-stone-950">
      <header className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
        <a href="/" className="font-semibold tracking-tight">
          LaunchKit
        </a>

        <span className="text-sm text-stone-500">
          Customizing: {template.title}
        </span>

        <button
          type="button"
          onClick={resetChanges}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50"
        >
          Reset changes
        </button>
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-stone-700">Live preview</h2>
            <span className="text-xs text-stone-500">{template.design}</span>
          </div>

          <div className="min-h-[600px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <TemplateComponent {...previewProps} />
          </div>
        </main>
      </div>
    </div>
  );
}
