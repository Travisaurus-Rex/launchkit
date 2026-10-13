import Link from "next/link";
import type { Template } from "@/lib/strapi";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/strapi";

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
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          {template.thumbnail ? (
            <Image
              src={getStrapiMediaUrl(template.thumbnail.url)}
              alt={
                template.thumbnail.alternativeText ??
                `${template.title} website preview`
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-50">
              <span className="text-3xl font-bold text-violet-700">
                {template.brand?.brandName ?? template.title}
              </span>
            </div>
          )}
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
