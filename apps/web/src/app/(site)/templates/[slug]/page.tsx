import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTemplateBySlug } from "@/lib/strapi";

type TemplateDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function TemplateDetails({ params }: TemplateDetailPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const category = template.templateCategory?.name ?? "Uncategorized";

  const previewUrl = `/templates/${template.slug}/preview`;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-12 text-sm text-stone-500">
          <Link href="/templates" className="hover:text-violet-600">
            Templates
          </Link>
          <span className="mx-3">/</span>
          <span className="text-stone-900">{template.title}</span>
        </nav>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Preview image placeholder */}
          <div>
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-violet-100 via-indigo-50 to-stone-100">
              <div className="text-center">
                <span className="text-5xl font-bold tracking-tight text-violet-700">
                  {template.brand?.brandName ?? template.title}
                </span>

                <p className="mt-4 text-sm text-violet-500">
                  Website template preview
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-stone-500">
              Interactive preview available
            </p>
          </div>

          {/* Details */}
          <div className="flex flex-col items-start">
            <span className="rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-700">
              {category}
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-950 md:text-5xl">
              {template.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-stone-600">
              {template.description}
            </p>

            <Link
              href={previewUrl}
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-stone-950 px-8 py-4 font-semibold text-white transition-colors hover:bg-violet-600"
            >
              Open live preview
              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </Link>

            <div className="mt-12 w-full border-t border-stone-200 pt-8">
              <h2 className="text-lg font-semibold text-stone-950">
                Template highlights
              </h2>

              {template.features?.length ? (
                <ul className="mt-6 space-y-4">
                  {template.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1 text-violet-600">
                        ✓
                      </span>
                      <div>
                        <h3 className="font-medium text-stone-900">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-stone-500">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-stone-500">
                  Explore the live preview to see this design.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="mt-24 rounded-3xl bg-stone-950 px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            See the design in action.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-stone-300">
            Explore the complete landing page and see how it looks on different
            screen sizes.
          </p>

          <Link
            href={previewUrl}
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-4 font-semibold text-stone-950 transition-colors hover:bg-violet-100"
          >
            Launch preview →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function TemplateDetailPage({
  params,
}: TemplateDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-stone-500">Loading template details...</p>
        </div>
      }
    >
      <TemplateDetails params={params} />
    </Suspense>
  );
}
