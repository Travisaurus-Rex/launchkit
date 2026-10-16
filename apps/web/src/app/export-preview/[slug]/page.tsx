import { notFound } from "next/navigation";

import { getTemplateBySlug } from "@/lib/strapi";
import { getTemplateComponent } from "@/components/templates/registry";

export const instant = false;

type ExportPreviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  value: string | string[] | undefined,
  fallback: string,
): string {
  return typeof value === "string" ? value : fallback;
}

export default async function ExportPreviewPage({
  params,
  searchParams,
}: ExportPreviewPageProps) {
  const { slug } = await params;
  const overrides = await searchParams;

  const template = await getTemplateBySlug(slug);

  if (!template || !template.brand || !template.hero) {
    notFound();
  }

  const TemplateComponent = getTemplateComponent(template.design);

  if (!TemplateComponent) {
    notFound();
  }

  const brand = {
    ...template.brand,
    brandName: getParam(overrides.brandName, template.brand.brandName),
    primaryColor: getParam(overrides.primaryColor, template.brand.primaryColor),
  };

  const hero = {
    ...template.hero,
    headline: getParam(overrides.headline, template.hero.headline),
    subheadline: getParam(overrides.subheadline, template.hero.subheadline),
    ctaLabel: getParam(overrides.ctaLabel, template.hero.ctaLabel),
  };

  return (
    <TemplateComponent
      brand={brand}
      hero={hero}
      features={template.features ?? []}
      projects={template.projects ?? []}
      menuItems={template.menuItems ?? []}
      businessInfo={template.businessInfo ?? null}
      galleryImages={template.galleryImages ?? []}
    />
  );
}
