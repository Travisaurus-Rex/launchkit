import type { Brand, Hero, Feature } from "@/lib/strapi";

type NovaSaaSTemplateProps = {
  brand: Brand;
  hero: Hero;
  features: Feature[];
};

export default function NovaSaaSTemplate({
  brand,
  hero,
  features,
}: NovaSaaSTemplateProps) {
  const primaryColor = brand.primaryColor;
  const ctaUrl = hero.ctaUrl || "#features";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Navigation */}
      <header className="border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              N
            </span>
            <span className="text-xl font-bold tracking-tight">
              {brand.brandName}
            </span>
          </a>

          <div className="hidden items-center gap-9 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-950">
              Features
            </a>
            <a href="#product" className="hover:text-slate-950">
              Product
            </a>
          </div>

          <a
            href={ctaUrl}
            className="rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            {hero.ctaLabel}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 text-center md:pt-32">
          <div
            className="mb-8 inline-flex rounded-full border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{
              color: primaryColor,
              borderColor: primaryColor,
            }}
          >
            Introducing {brand.brandName}
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            {hero.headline}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={ctaUrl}
              className="rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:-translate-y-1"
              style={{ backgroundColor: primaryColor }}
            >
              {hero.ctaLabel} →
            </a>

            <a
              href="#product"
              className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Explore the platform
            </a>
          </div>
        </div>

        {/* Product Preview */}
        <div id="product" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-100">
            {/* Window toolbar */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-300" />
              <span className="ml-4 text-xs text-slate-400">
                {brand.brandName} / Dashboard Preview
              </span>
            </div>

            <div className="grid md:grid-cols-[200px_1fr]">
              {/* Dashboard sidebar */}
              <aside className="hidden border-r border-slate-100 bg-slate-50/50 p-6 md:block">
                <div className="mb-10 font-bold">{brand.brandName}</div>

                {["Overview", "Analytics", "Projects", "Team"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`mb-3 rounded-lg px-4 py-3 text-sm ${
                        index === 0
                          ? "bg-indigo-50 font-semibold"
                          : "text-slate-500"
                      }`}
                      style={index === 0 ? { color: primaryColor } : undefined}
                    >
                      {item}
                    </div>
                  ),
                )}
              </aside>

              {/* Dashboard content */}
              <div className="p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Overview</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your performance at a glance
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Total Revenue", "$48,295", "+12.8%"],
                    ["Active Users", "12,480", "+8.2%"],
                    ["Conversion Rate", "4.86%", "+2.4%"],
                  ].map(([label, value, change]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-200 p-5"
                    >
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-3 text-2xl font-bold">{value}</p>
                      <p className="mt-2 text-xs font-medium text-emerald-600">
                        {change} this month
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-semibold">Revenue Growth</h3>
                    <span className="text-xs text-slate-400">
                      Last 7 months
                    </span>
                  </div>

                  <div className="flex h-48 items-end gap-3">
                    {[35, 48, 42, 64, 58, 76, 92].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col justify-end"
                      >
                        <div
                          className="rounded-t-md opacity-80"
                          style={{
                            height: `${height * 1.8}px`,
                            backgroundColor: primaryColor,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Illustrative product preview with sample data
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p
              className="mb-4 text-sm font-bold uppercase tracking-widest"
              style={{ color: primaryColor }}
            >
              Why {brand.brandName}
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Everything you need to move forward.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Powerful tools designed to simplify your work and help your
              business grow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: primaryColor }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-8 text-xl font-bold">{feature.title}</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-24 text-center md:py-32">
        <h2 className="text-4xl font-bold tracking-tight">
          Ready to get started?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
          Your next big milestone is just around the corner.
        </p>

        <a
          href={ctaUrl}
          className="mt-8 inline-block rounded-xl px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          {hero.ctaLabel}
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-bold">{brand.brandName}</span>

          <p className="text-sm text-slate-400">
            A LaunchKit website template.
          </p>
        </div>
      </footer>
    </main>
  );
}
