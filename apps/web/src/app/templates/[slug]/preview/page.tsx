import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTemplateBySlug } from "@/lib/strapi";
import NovaSaaSTemplate from "@/components/templates/nova-saas";

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
};

async function TemplatePreview({ params }: PreviewPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  if (!template.brand || !template.hero) {
    return (
      <main className="p-12">
        <p>This template is missing its Brand or Hero content.</p>
      </main>
    );
  }

  return (
    <NovaSaaSTemplate
      brand={template.brand}
      hero={template.hero}
      features={template.features}
    />
  );
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return (
    <Suspense fallback={<p className="p-8">Loading preview...</p>}>
      <TemplatePreview params={params} />
    </Suspense>
  );
}
