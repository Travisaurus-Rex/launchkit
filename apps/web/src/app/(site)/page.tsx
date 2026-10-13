import Link from "next/link";
import { Suspense } from "react";

import FeaturedTemplates from "@/components/featured-templates";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            Your next website starts here
          </span>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-stone-950 sm:text-6xl md:text-7xl">
            Great websites start
            <br />
            with a great idea.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-stone-600">
            Discover beautifully designed website templates, explore different
            styles, and make them your own.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#featured"
              className="rounded-xl bg-stone-950 px-7 py-4 font-semibold text-white transition-colors hover:bg-violet-600"
            >
              Explore templates
            </Link>

            <Link
              href="#how-it-works"
              className="rounded-xl border border-stone-300 bg-white px-7 py-4 font-semibold text-stone-800 transition-colors hover:bg-stone-50"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section
        id="featured"
        className="border-t border-stone-200 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600">
              The collection
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-stone-950 md:text-5xl">
              Find your starting point.
            </h2>

            <p className="mt-5 text-lg leading-8 text-stone-600">
              Explore thoughtfully designed templates for startups, creative
              teams, and small businesses.
            </p>
          </div>

          <Suspense
            fallback={
              <p className="text-stone-500">Loading featured templates...</p>
            }
          >
            <FeaturedTemplates />
          </Suspense>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600">
              Simple by design
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-stone-950 md:text-5xl">
              From inspiration to your vision.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Discover",
                description:
                  "Browse our collection and find a design that fits your business.",
              },
              {
                number: "02",
                title: "Preview",
                description:
                  "Explore complete, responsive landing pages before choosing one.",
              },
              {
                number: "03",
                title: "Customize",
                description:
                  "Experiment with colors, content, and branding to make the design yours.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-stone-200 bg-white p-8"
              >
                <span className="text-sm font-semibold text-violet-600">
                  {step.number}
                </span>

                <h3 className="mt-8 text-2xl font-semibold text-stone-950">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
