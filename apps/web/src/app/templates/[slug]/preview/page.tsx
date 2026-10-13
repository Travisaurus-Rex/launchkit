import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTemplateBySlug } from "@/lib/strapi";

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

  const { brand, hero } = template;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-2xl font-bold">{brand.brandName}</span>

        <a
          href={hero.ctaUrl || "#"}
          className="rounded-lg px-5 py-3 text-sm font-medium text-white"
          style={{ backgroundColor: brand.primaryColor }}
        >
          {hero.ctaLabel}
        </a>
      </header>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
        <span
          className="mb-6 text-sm font-semibold uppercase tracking-widest"
          style={{ color: brand.primaryColor }}
        >
          Introducing {brand.brandName}
        </span>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          {hero.headline}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          {hero.subheadline}
        </p>

        <a
          href={hero.ctaUrl || "#"}
          className="mt-10 rounded-xl px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: brand.primaryColor }}
        >
          {hero.ctaLabel}
        </a>
      </section>
    </main>
  );
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return (
    <Suspense fallback={<p className="p-8">Loading preview...</p>}>
      <TemplatePreview params={params} />
    </Suspense>
  );
}
