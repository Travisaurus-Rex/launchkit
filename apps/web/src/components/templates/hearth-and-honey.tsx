import Image from "next/image";

import {
  getStrapiMediaUrl,
  type Brand,
  type Hero,
  type MenuItem,
  type BusinessInfo,
  type StrapiImage,
} from "@/lib/strapi";

type HearthAndHoneyProps = {
  brand: Brand;
  hero: Hero;
  menuItems: MenuItem[];
  businessInfo: BusinessInfo | null;
  galleryImages: StrapiImage[];
};

function formatPrice(price: number | string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function HearthAndHoneyTemplate({
  brand,
  hero,
  menuItems,
  businessInfo,
  galleryImages,
}: HearthAndHoneyProps) {
  const accent = brand.primaryColor;
  const heroImage = galleryImages[galleryImages.length - 1];

  return (
    <main className="bg-[#FAF7F0] text-[#34251D]">
      {/* Navigation */}
      <header className="border-b border-[#34251D]/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6">
          <a
            href="#top"
            className="font-serif text-xl font-bold tracking-tight sm:text-2xl"
          >
            {brand.brandName}
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#menu" className="hover:opacity-60">
              Menu
            </a>
            <a href="#story" className="hover:opacity-60">
              Our Story
            </a>
            <a href="#visit" className="hover:opacity-60">
              Visit Us
            </a>
          </div>

          <a
            href="#visit"
            className="rounded-full px-5 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Find us
          </a>
        </nav>
      </header>

      {/* Hero */}

      {/* Hero */}
      <section id="top" className="overflow-hidden">
        <div className="grid min-h-[720px] lg:grid-cols-2">
          {/* Left half: existing content */}
          <div className="flex items-center px-6 py-16 lg:px-12 xl:pl-[max(3rem,calc((100vw-80rem)/2))] xl:pr-16">
            <div className="max-w-xl">
              <p
                className="mb-7 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                A little place to slow down
              </p>

              <h1 className="max-w-xl font-serif text-6xl leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
                {hero.headline}
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-8 text-[#786B61]">
                {hero.subheadline}
              </p>

              <a
                href={hero.ctaUrl || "#menu"}
                className="mt-10 inline-flex rounded-full px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-1"
                style={{ backgroundColor: accent }}
              >
                {hero.ctaLabel}
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right half: full-height café photograph */}
          <div className="relative min-h-[420px] bg-[#E5D6C3] lg:min-h-full">
            {heroImage ? (
              <Image
                src={getStrapiMediaUrl(heroImage.url)}
                alt={
                  heroImage.alternativeText ?? "Interior of Hearth & Honey café"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#8B5E3C]">
                Café image coming soon
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="story" className="bg-[#EEE6D9] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            Welcome to our table
          </p>

          <h2 className="mt-8 font-serif text-4xl leading-tight md:text-6xl">
            The best moments are the ones we take our time with.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#786B61]">
            At {brand.brandName}, we believe a good cup of coffee is more than a
            daily ritual. It's a reason to slow down, connect, and enjoy
            something made with care.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              Something delicious
            </p>

            <h2 className="mt-5 font-serif text-5xl md:text-7xl">
              The little things.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-[#786B61]">
              Thoughtfully prepared drinks and comforting favorites, made to
              brighten your day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {menuItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#E8DFD2] bg-white"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] bg-[#EEE6D9]">
                    <Image
                      src={getStrapiMediaUrl(item.image.url)}
                      alt={item.image.alternativeText ?? item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl">{item.name}</h3>

                    <span
                      className="whitespace-nowrap text-sm font-bold"
                      style={{ color: accent }}
                    >
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#786B61]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {menuItems.length === 0 && (
            <p className="text-center text-[#786B61]">
              Our menu is coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="bg-[#EEE6D9] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 font-serif text-4xl md:text-6xl">
              A little glimpse inside.
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-xl bg-[#D9C7B2]"
                >
                  <Image
                    src={getStrapiMediaUrl(image.url)}
                    alt={image.alternativeText ?? "Hearth & Honey café"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visit */}
      <section id="visit" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              Come say hello
            </p>

            <h2 className="mt-6 font-serif text-5xl md:text-7xl">
              There's a seat waiting for you.
            </h2>

            <p className="mt-8 max-w-md text-lg leading-8 text-[#786B61]">
              Whether it's your morning coffee or a slow afternoon with friends,
              we'd love to see you.
            </p>
          </div>

          <div className="rounded-3xl bg-[#EEE6D9] p-8 md:p-12">
            <div className="space-y-10">
              <div>
                <h3 className="mb-3 font-serif text-2xl">Find us</h3>
                <p className="whitespace-pre-line leading-7 text-[#786B61]">
                  {businessInfo?.address ?? "Location details coming soon."}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif text-2xl">Opening hours</h3>
                <p className="whitespace-pre-line leading-7 text-[#786B61]">
                  {businessInfo?.openingHours ?? "Hours coming soon."}
                </p>
              </div>

              {(businessInfo?.phone || businessInfo?.email) && (
                <div>
                  <h3 className="mb-3 font-serif text-2xl">Get in touch</h3>

                  {businessInfo.phone && (
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="block text-[#786B61] hover:underline"
                    >
                      {businessInfo.phone}
                    </a>
                  )}

                  {businessInfo.email && (
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="mt-2 block text-[#786B61] hover:underline"
                    >
                      {businessInfo.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#34251D] px-6 py-12 text-[#FAF7F0]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-3xl">{brand.brandName}</p>
            <p className="mt-3 text-sm text-white/60">
              Good coffee. Good company. Good days.
            </p>
          </div>

          <p className="text-sm text-white/50">
            A fictional café concept by LaunchKit.
          </p>
        </div>
      </footer>
    </main>
  );
}
