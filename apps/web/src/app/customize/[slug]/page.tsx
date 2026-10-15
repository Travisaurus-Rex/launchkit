import { notFound } from "next/navigation";
import { getTemplateBySlug } from "@/lib/strapi";

import Customizer from "@/components/customizer/customizer";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CustomizePage({ params }: PageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <Customizer template={template} />;
}
