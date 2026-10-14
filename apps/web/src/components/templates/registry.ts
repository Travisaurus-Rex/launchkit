import type { ComponentType } from "react";

import type {
  Brand,
  Feature,
  Hero,
  Project,
  TemplateDesign,
} from "@/lib/strapi";

import NovaSaaSTemplate from "./nova-saas";
import AtelierTemplate from "./atelier";

export type TemplateLayoutProps = {
  brand: Brand;
  hero: Hero;
  features: Feature[];
  projects: Project[];
};

const templateRegistry: Partial<
  Record<TemplateDesign, ComponentType<TemplateLayoutProps>>
> = {
  nova: NovaSaaSTemplate,
  atelier: AtelierTemplate,
};

export function getTemplateComponent(design: TemplateDesign) {
  return templateRegistry[design] ?? null;
}
