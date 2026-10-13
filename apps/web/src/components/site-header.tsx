import Link from "next/link";

const navigation = [
  { label: "Templates", href: "/templates" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-stone-200 bg-[#FAFAF8]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-stone-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white">
            L
          </span>
          LaunchKit
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-violet-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/templates"
          className="hidden rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-600 md:inline-flex"
        >
          Explore templates
        </Link>

        <details className="group relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-900 marker:hidden [&::-webkit-details-marker]:hidden">
            Menu
          </summary>

          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-12 flex w-56 flex-col gap-1 rounded-xl border border-stone-200 bg-white p-3 shadow-xl"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
