import type { ComponentType } from "react";

import type { Brand, Feature, Hero, TemplateDesign } from "@/lib/strapi";

import NovaSaaSTemplate from "./nova-saas";

export type TemplateLayoutProps = {
  brand: Brand;
  hero: Hero;
  features: Feature[];
};

const templateRegistry: Partial<
  Record<TemplateDesign, ComponentType<TemplateLayoutProps>>
> = {
  nova: NovaSaaSTemplate,
};

export function getTemplateComponent(design: TemplateDesign) {
  return templateRegistry[design] ?? null;
}
