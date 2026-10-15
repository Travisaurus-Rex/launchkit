import Link from "next/link";
import { Suspense } from "react";

import FeaturedTemplates from "@/components/featured-templates";

const designTypes = [
  {
    number: "01",
    title: "SaaS & technology",
    description: "Clear messaging and purposeful layouts for digital products.",
    color: "bg-violet-100 text-violet-700",
    symbol: "S",
  },
  {
    number: "02",
    title: "Creative studios",
    description: "Editorial layouts that put your work and personality first.",
    color: "bg-amber-100 text-amber-800",
    symbol: "A",
  },
  {
    number: "03",
    title: "Local businesses",
    description: "Welcoming designs built around your services and customers.",
    color: "bg-emerald-100 text-emerald-800",
    symbol: "H",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your direction",
    description:
      "Explore designs for different industries and discover an approach that fits your vision.",
  },
  {
    number: "02",
    title: "See the whole picture",
    description:
      "Preview a complete website and explore its layout before deciding what works for you.",
  },
  {
    number: "03",
    title: "Make it your own",
    description:
      "Experiment with your brand name, messaging, button text, and colors in the live customizer.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-stone-950">
      {/* Hero */}
      <section className="relative px-6 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-200/30 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-violet-500" />A better
              starting point for your website
            </span>

            <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Find the look.
              <br />
              <span className="font-serif font-normal italic text-violet-700">
                Make it yours.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              Explore thoughtfully designed websites for your next idea. Preview
              complete layouts, try different styles, and customize the details
              to see what feels right.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#templates"
                className="inline-flex items-center gap-3 rounded-xl bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Explore the collection
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-xl border border-stone-300 bg-white/70 px-6 py-4 text-sm font-semibold text-stone-800 transition hover:border-stone-500 hover:bg-white"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-200 pt-6 text-sm text-stone-500">
              <span className="flex items-center gap-2">
                <span className="text-violet-700">✳</span>
                Three distinct design directions
              </span>
              <span className="flex items-center gap-2">
                <span className="text-violet-700">↗</span>
                Interactive live previews
              </span>
            </div>
          </div>

          {/* Visual introduction */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-violet-200/50 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-stone-200/80 bg-white/80 p-4 shadow-2xl shadow-stone-900/[0.06] sm:p-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
                </div>
                <span className="text-xs font-medium tracking-wide text-stone-400">
                  YOUR NEXT IDEA
                </span>
              </div>

              <div className="grid gap-3 py-5">
                {designTypes.map((design, index) => (
                  <div
                    key={design.number}
                    className={`group flex items-center gap-4 rounded-2xl border border-stone-200/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-stone-900/[0.04] sm:p-5 ${
                      index === 1 ? "sm:ml-8" : index === 2 ? "sm:ml-4" : ""
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-serif text-2xl ${design.color}`}
                    >
                      {design.symbol}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium tracking-wider text-stone-400">
                        {design.number}
                      </p>
                      <h2 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
                        {design.title}
                      </h2>
                      <p className="mt-1 text-sm leading-5 text-stone-500">
                        {design.description}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-xl text-stone-300 transition group-hover:text-violet-600"
                    >
                      ↗
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-xl bg-stone-950 px-5 py-4 text-white">
                <div>
                  <p className="text-sm font-medium">One starting point.</p>
                  <p className="mt-1 text-xs text-stone-400">
                    Room to make it your own.
                  </p>
                </div>
                <span className="font-serif text-2xl italic text-violet-300">
                  lk.
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-lg sm:-left-7">
              <p className="text-xs font-medium text-stone-400">
                YOUR CREATIVE PROCESS
              </p>
              <p className="mt-1 text-sm font-semibold">
                Explore. Preview. Refine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template collection */}
      <section
        id="templates"
        className="scroll-mt-24 border-y border-stone-200 bg-white px-6 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                The collection
              </p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Three ideas.
                <br />
                <span className="font-serif font-normal italic text-stone-500">
                  Three different directions.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
                Start with a SaaS product, a creative studio, or a local
                business. Each design has its own personality, structure, and
                purpose.
              </p>
            </div>

            <p className="max-w-xs text-sm leading-6 text-stone-500">
              A small, considered collection designed to be explored, not just
              scrolled past.
            </p>
          </div>

          <div className="mt-12">
            <Suspense
              fallback={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse overflow-hidden rounded-2xl border border-stone-200"
                    >
                      <div className="aspect-[4/3] bg-stone-100" />
                      <div className="space-y-3 p-5">
                        <div className="h-4 w-2/3 rounded bg-stone-100" />
                        <div className="h-3 w-full rounded bg-stone-100" />
                        <div className="h-3 w-1/2 rounded bg-stone-100" />
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <FeaturedTemplates />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Design directions */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Different by design
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Start with the right foundation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              A website should reflect what it represents. Explore three
              different approaches, each built around a different kind of
              business.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {designTypes.map((design) => (
              <article
                key={design.number}
                className="rounded-2xl border border-stone-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-stone-900/[0.04] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-400">
                    {design.number} / 03
                  </span>
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-serif text-xl ${design.color}`}
                  >
                    {design.symbol}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  {design.title}
                </h3>
                <p className="mt-3 leading-7 text-stone-600">
                  {design.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-stone-200 bg-[#f1efe9] px-6 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                Simple by design
              </p>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                A little inspiration can go a long way.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-stone-600">
                You don't need to commit to a design straight away. Explore the
                possibilities, try a few changes, and find a direction that
                makes sense for your idea.
              </p>
              <Link
                href="#templates"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-800 transition hover:text-violet-600"
              >
                Find your starting point <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="divide-y divide-stone-300/80">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="grid gap-3 py-7 sm:grid-cols-[64px_1fr] sm:gap-5 sm:py-8"
                >
                  <span className="font-serif text-2xl italic text-violet-700">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg leading-7 text-stone-600">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-6 py-20 sm:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 px-7 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Your next idea starts here
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              The right design is worth exploring.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
              Take a look around, find a style that speaks to you, and see what
              happens when you make it your own.
            </p>
            <Link
              href="#templates"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-stone-950 transition hover:bg-violet-100"
            >
              Explore the templates <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
