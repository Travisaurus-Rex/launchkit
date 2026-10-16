import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Design with purpose",
    description:
      "A great website should feel right for the people and ideas behind it. Each template takes a different approach to layout, typography, and visual identity.",
  },
  {
    number: "02",
    title: "Explore before deciding",
    description:
      "Screenshots only tell part of the story. LaunchKit lets you explore complete, responsive pages and experience how each design actually works.",
  },
  {
    number: "03",
    title: "Make room for personality",
    description:
      "A starting point shouldn't feel like a limitation. Experiment with your own messaging, branding, and colors to see how a design can become yours.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Strapi",
  "PostgreSQL",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-stone-950">
      {/* Hero */}
      <section className="relative border-b border-stone-200 px-6 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            About LaunchKit
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Good design starts
            <br />
            with{" "}
            <span className="font-serif font-normal italic text-violet-700">
              possibility.
            </span>
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-20">
            <p className="max-w-lg text-xl leading-9 text-stone-700">
              LaunchKit is a small collection of website designs built around
              one simple idea: finding the right direction should be part of the
              creative process.
            </p>

            <p className="max-w-lg text-base leading-8 text-stone-500">
              Rather than choosing a design from a static screenshot, you can
              explore complete websites, see how they adapt across screen sizes,
              and experiment with content and branding in real time.
            </p>
          </div>
        </div>
      </section>

      {/* The idea */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              The idea
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Not every website
              <br />
              should look the same.
            </h2>

            <p className="mt-7 text-lg leading-8 text-stone-600">
              A technology product, a creative studio, and a neighborhood café
              have very different stories to tell. Their websites should reflect
              that.
            </p>

            <p className="mt-5 leading-8 text-stone-600">
              LaunchKit explores those differences through three distinct
              templates, each with its own visual language and content
              structure.
            </p>

            <Link
              href="/#templates"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-800 transition hover:text-violet-600"
            >
              Explore the collection
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* Visual composition */}
          <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-stone-900/[0.04] sm:p-8">
            <div className="grid gap-3">
              <div className="rounded-2xl bg-violet-100 p-7 sm:p-9">
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-700">
                  01 / Technology
                </span>
                <p className="mt-8 text-3xl font-semibold tracking-tight text-violet-950">
                  Bold ideas.
                  <br />
                  Clear direction.
                </p>
                <div className="mt-8 h-2 w-24 rounded-full bg-violet-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#eae1d4] p-5 sm:p-7">
                  <span className="text-xs font-semibold text-stone-600">
                    02 / Creative
                  </span>
                  <p className="mt-10 font-serif text-2xl italic text-stone-900 sm:text-3xl">
                    Made to
                    <br />
                    express.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#dce9dc] p-5 sm:p-7">
                  <span className="text-xs font-semibold text-emerald-800">
                    03 / Local
                  </span>
                  <p className="mt-10 font-serif text-2xl text-emerald-950 sm:text-3xl">
                    A place to
                    <br />
                    belong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-stone-200 bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              The approach
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Thoughtful by design.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              A few principles shape how LaunchKit is designed and how people
              interact with it.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="rounded-2xl border border-stone-200 bg-[#faf9f6] p-7 sm:p-8"
              >
                <span className="font-serif text-3xl italic text-violet-700">
                  {principle.number}
                </span>

                <h3 className="mt-10 text-xl font-semibold tracking-tight">
                  {principle.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the build */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Behind the build
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Built for the web.
              <br />
              Built to explore.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-stone-600">
              LaunchKit is an independent web development project combining
              modern frontend development with a content-managed template
              system.
            </p>
            <p className="mt-5 max-w-lg leading-8 text-stone-600">
              The templates use shared content models while maintaining their
              own layouts and visual identities. Strapi manages the content, and
              Next.js powers the website previews and interactive customizer.
            </p>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-7 sm:p-10">
            <p className="text-sm font-semibold text-stone-500">
              Technology stack
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-stone-200 pt-8">
              <p className="text-sm font-semibold text-stone-900">
                Independently developed
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Created as a practical exploration of reusable website
                architecture, content management, responsive design, and
                interactive frontend experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 pb-20 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 px-8 py-16 text-white sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Ready to explore?
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Find a design that feels right.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              Browse the collection, explore a complete website, and try making
              it your own.
            </p>
            <Link
              href="/#templates"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-stone-950 transition hover:bg-violet-100"
            >
              Explore templates <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
