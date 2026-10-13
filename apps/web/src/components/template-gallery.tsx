"use client";

import { useMemo, useState } from "react";
import type { Template } from "@/lib/strapi";
import TemplateCard from "@/components/template-card";

type TemplateGalleryProps = {
  templates: Template[];
};

export default function TemplateGallery({ templates }: TemplateGalleryProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = new Map<string, string>();

    templates.forEach((template) => {
      const item = template.templateCategory;

      if (item) {
        unique.set(item.slug, item.name);
      }
    });

    return Array.from(unique, ([slug, name]) => ({
      slug,
      name,
    }));
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesCategory =
        category === "all" || template.templateCategory?.slug === category;

      const searchableText = [
        template.title,
        template.description,
        template.templateCategory?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [templates, search, category]);

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <label
          htmlFor="template-search"
          className="mb-3 block text-sm font-medium text-stone-700"
        >
          Search templates
        </label>

        <input
          id="template-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, category, or keyword..."
          className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-stone-950 outline-none transition-colors placeholder:text-stone-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Category filters */}
      <div
        className="mb-10 flex flex-wrap gap-3"
        role="group"
        aria-label="Filter templates by category"
      >
        <button
          type="button"
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${
            category === "all"
              ? "bg-stone-950 text-white"
              : "border border-stone-200 bg-white text-stone-600 hover:border-violet-300"
          }`}
        >
          All templates
        </button>

        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setCategory(item.slug)}
            aria-pressed={category === item.slug}
            className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${
              category === item.slug
                ? "bg-stone-950 text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:border-violet-300"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-6" aria-live="polite">
        <p className="text-sm text-stone-500">
          Showing {filteredTemplates.length} of {templates.length} templates
        </p>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.documentId} template={template} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
          <h2 className="text-xl font-semibold text-stone-950">
            No matching templates
          </h2>

          <p className="mt-3 text-stone-500">
            Try another search or select a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-6 text-sm font-semibold text-violet-600 hover:text-violet-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
