import type { Template } from "@/lib/strapi";

export type ExportConfig = {
  templateSlug: string;
  brandName: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  primaryColor: string;
};

export function createExportConfig(template: Template): ExportConfig {
  if (!template.brand || !template.hero) {
    throw new Error(
      `Template "${template.slug}" is missing required brand or hero content.`,
    );
  }

  return {
    templateSlug: template.slug,
    brandName: template.brand.brandName,
    headline: template.hero.headline,
    subheadline: template.hero.subheadline,
    ctaLabel: template.hero.ctaLabel,
    primaryColor: template.brand.primaryColor,
  };
}
