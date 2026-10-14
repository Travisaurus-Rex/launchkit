import type { Brand, Hero, Feature } from "@/lib/strapi";

type AtelierTemplateProps = {
  brand: Brand;
  hero: Hero;
  features: Feature[];
};

// Placeholder portfolio content.
// We'll replace this with Strapi-managed projects next.
const projects = [
  {
    number: "01",
    name: "Forma",
    category: "Brand Identity / Art Direction",
    background: "#E8DCD0",
    foreground: "#543B31",
    subtitle: "Objects for everyday living.",
    style: "font-serif italic",
  },
  {
    number: "02",
    name: "MONO",
    category: "Digital Experience / Strategy",
    background: "#D5DBCF",
    foreground: "#263A30",
    subtitle: "A new perspective on simplicity.",
    style: "font-sans font-black tracking-tighter",
  },
  {
    number: "03",
    name: "sōl",
    category: "Brand Identity / Packaging",
    background: "#F2D9BA",
    foreground: "#A34A2F",
    subtitle: "A little more sunshine.",
    style: "font-serif italic",
  },
  {
    number: "04",
    name: "STILL.",
    category: "Art Direction / Digital",
    background: "#302D2A",
    foreground: "#F4EFE8",
    subtitle: "Space to slow down.",
    style: "font-sans font-light tracking-widest",
  },
];

export default function AtelierTemplate({
  brand,
  hero,
  features,
}: AtelierTemplateProps) {
  const accent = brand.primaryColor;
  const ctaUrl = hero.ctaUrl || "#work";

  return (
    <main className="overflow-x-hidden bg-[#F7F5F0] text-[#24231F]">
      {/* Navigation */}
      <header className="border-b border-[#24231F]/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <a href="#top" className="text-2xl font-black tracking-[-0.08em]">
            {brand.brandName}
            <span style={{ color: accent }}>.</span>
          </a>

          <div className="hidden items-center gap-10 text-sm font-medium md:flex">
            <a href="#work" className="transition-opacity hover:opacity-50">
              Work
            </a>
            <a href="#about" className="transition-opacity hover:opacity-50">
              About
            </a>
            <a href="#services" className="transition-opacity hover:opacity-50">
              Services
            </a>
          </div>

          <a
            href="#contact"
            className="border-b-2 pb-1 text-sm font-semibold transition-opacity hover:opacity-50"
            style={{ borderColor: accent }}
          >
            Let's talk ↗
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-36 md:pt-36 lg:px-10"
      >
        <div className="mb-12 flex items-center gap-4">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em]">
            Independent creative studio
          </span>
        </div>

        <h1 className="max-w-6xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.98] tracking-[-0.075em]">
          {hero.headline}
        </h1>

        <div className="mt-16 grid gap-10 border-t border-[#24231F]/20 pt-8 md:grid-cols-2">
          <div className="flex items-start gap-3 text-sm font-medium">
            <span style={{ color: accent }}>✳</span>
            <span>Ideas made tangible.</span>
          </div>

          <div className="flex flex-col items-start gap-8">
            <p className="max-w-lg text-xl leading-relaxed text-[#55534D] md:text-2xl">
              {hero.subheadline}
            </p>

            <a
              href={ctaUrl}
              className="inline-flex items-center gap-4 rounded-full px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-1"
              style={{ backgroundColor: accent }}
            >
              {hero.ctaLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="bg-[#EDEAE3] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                01 / Portfolio
              </span>
              <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                Selected work<span style={{ color: accent }}>.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[#77746D]">
              A collection of identities and digital experiences shaped by
              curiosity.
            </p>
          </div>

          <div className="grid gap-x-7 gap-y-14 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.number}
                className={index % 2 === 1 ? "md:pt-24" : ""}
              >
                <div
                  className="flex aspect-[4/5] flex-col items-center justify-center overflow-hidden p-8 text-center transition-transform duration-500 hover:scale-[0.98]"
                  style={{
                    backgroundColor: project.background,
                    color: project.foreground,
                  }}
                >
                  <span className="mb-6 text-xs uppercase tracking-[0.3em] opacity-60">
                    Selected project / {project.number}
                  </span>

                  <span
                    className={`text-[clamp(4rem,9vw,8rem)] leading-none ${project.style}`}
                  >
                    {project.name}
                  </span>

                  <span className="mt-7 max-w-xs text-sm tracking-wide opacity-70">
                    {project.subtitle}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#77746D]">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-sm text-[#77746D]">
                    {project.number}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-[1fr_2fr] md:py-40 lg:px-10"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em]">
          02 / The studio
        </span>

        <div>
          <h2 className="text-4xl font-medium leading-tight tracking-[-0.05em] md:text-6xl">
            Good design looks beyond the obvious.
          </h2>

          <p className="mt-10 max-w-xl text-lg leading-8 text-[#77746D]">
            We believe the most memorable work comes from asking better
            questions, exploring new perspectives, and making every detail
            count.
          </p>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="border-t border-[#24231F]/15 px-6 py-24 md:py-32 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                03 / Expertise
              </span>
              <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                What we do<span style={{ color: accent }}>.</span>
              </h2>
            </div>
          </div>

          <div className="border-t border-[#24231F]/20">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="grid gap-5 border-b border-[#24231F]/20 py-9 md:grid-cols-[60px_1fr_1fr]"
              >
                <span className="text-sm" style={{ color: accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {feature.title}
                </h3>

                <p className="max-w-md leading-7 text-[#77746D]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 py-28 text-white md:py-36 lg:px-10"
        style={{ backgroundColor: accent }}
      >
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]">
            04 / Get in touch
          </span>

          <h2 className="mt-12 max-w-5xl text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[1.02] tracking-[-0.07em]">
            Have something in mind?
          </h2>

          <p className="mt-8 max-w-xl text-xl leading-8 text-white/80">
            We'd love to hear about your next big idea.
          </p>

          <div className="mt-16 inline-flex items-center gap-4 border-b-2 border-white pb-3 text-2xl font-medium md:text-4xl">
            Let's make it happen
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#24231F] px-6 py-12 text-[#F7F5F0] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <span className="text-5xl font-bold tracking-[-0.08em]">
            {brand.brandName}.
          </span>

          <div className="text-sm text-white/50">
            <p>An independent creative studio.</p>
            <p className="mt-2">A LaunchKit website template.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
