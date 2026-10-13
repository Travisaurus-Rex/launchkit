import Link from "next/link";
import { getTemplates } from "@/lib/strapi";

export default async function FeaturedTemplates() {
  const templates = await getTemplates();

  const featuredTemplates = templates.filter((template) => template.featured);

  if (featuredTemplates.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 p-8 text-stone-500">
        No featured templates available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {featuredTemplates.map((template) => (
        <article
          key={template.documentId}
          className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-xl"
        >
          {/* Temporary visual placeholder */}
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-50 to-stone-100">
            <span className="text-3xl font-bold tracking-tight text-violet-700">
              {template.brand?.brandName ?? template.title}
            </span>
          </div>

          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
              {template.templateCategory?.name ?? "Uncategorized"}
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-stone-950">
              {template.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">
              {template.description}
            </p>

            <Link
              href={`/templates/${template.slug}/preview`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-950 transition-colors hover:text-violet-600"
            >
              Live preview
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
