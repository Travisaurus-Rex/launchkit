import { Suspense } from "react";
import type { Metadata } from "next";

import { getTemplates } from "@/lib/strapi";
import TemplateGallery from "@/components/template-gallery";
import { APP_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Website Templates | ${APP_NAME}`,
  description:
    "Browse and preview professionally designed website templates for startups, agencies, and small businesses.",
};

async function GalleryContent() {
  const templates = await getTemplates();

  return <TemplateGallery templates={templates} />;
}

export default function TemplatesPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-stone-200 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-violet-600">
            Template collection
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-stone-950 md:text-6xl">
            Find a design that feels right.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            Browse our collection of landing page templates. Discover a style,
            explore the design, and make it your own.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Suspense
            fallback={
              <p className="py-12 text-stone-500">Loading templates...</p>
            }
          >
            <GalleryContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
