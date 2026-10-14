import type { ComponentType } from "react";

import type {
  Brand,
  Feature,
  Hero,
  Project,
  TemplateDesign,
  MenuItem,
  BusinessInfo,
  StrapiImage,
} from "@/lib/strapi";

import NovaSaaSTemplate from "./nova-saas";
import AtelierTemplate from "./atelier";
import HearthAndHoneyTemplate from "./hearth-and-honey";

export type TemplateLayoutProps = {
  brand: Brand;
  hero: Hero;
  features: Feature[];
  projects: Project[];
  menuItems: MenuItem[];
  businessInfo: BusinessInfo | null;
  galleryImages: StrapiImage[];
};

const templateRegistry: Partial<
  Record<TemplateDesign, ComponentType<TemplateLayoutProps>>
> = {
  nova: NovaSaaSTemplate,
  atelier: AtelierTemplate,
  local: HearthAndHoneyTemplate,
};

export function getTemplateComponent(design: TemplateDesign) {
  return templateRegistry[design] ?? null;
}
