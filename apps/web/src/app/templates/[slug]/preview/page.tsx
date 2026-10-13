import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTemplateBySlug } from "@/lib/strapi";
import { getTemplateComponent } from "@/components/templates/registry";

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

  const TemplateComponent = getTemplateComponent(template.design);

  if (!TemplateComponent) {
    return (
      <main className="p-12">
        <h1 className="text-2xl font-bold">Template design unavailable</h1>
        <p className="mt-3 text-slate-600">
          This template uses a design that hasn't been built yet.
        </p>
      </main>
    );
  }

  return (
    <TemplateComponent
      brand={template.brand}
      hero={template.hero}
      features={template.features ?? []}
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
