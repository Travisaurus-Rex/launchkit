import Link from "next/link";
import type { Template } from "@/lib/strapi";

type TemplateCardProps = {
  template: Template;
};

export default function TemplateCard({ template }: TemplateCardProps) {
  const category = template.templateCategory?.name ?? "Uncategorized";

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/templates/${template.slug}`}
        className="block"
        aria-label={`View details for ${template.title}`}
      >
        <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-50 to-stone-100">
          <span className="text-3xl font-bold tracking-tight text-violet-700">
            {template.brand?.brandName ?? template.title}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">
          {category}
        </p>

        <h2 className="mt-3 text-xl font-semibold text-stone-950">
          {template.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">
          {template.description}
        </p>

        <Link
          href={`/templates/${template.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-950 hover:text-violet-600"
        >
          View Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
