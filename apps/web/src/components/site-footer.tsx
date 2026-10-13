import Link from "next/link";

export default async function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-[#FAFAF8]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-stone-950"
            >
              LaunchKit
            </Link>

            <p className="mt-4 text-sm leading-7 text-stone-500">
              Discover beautifully designed website templates and make them your
              own.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-8 gap-y-4"
          >
            <Link
              href="/templates"
              className="text-sm text-stone-600 hover:text-violet-600"
            >
              Templates
            </Link>

            <Link
              href="/guides"
              className="text-sm text-stone-600 hover:text-violet-600"
            >
              Guides
            </Link>

            <Link
              href="/about"
              className="text-sm text-stone-600 hover:text-violet-600"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-stone-200 pt-6 text-sm text-stone-400 md:flex-row">
          <p>© 2026 LaunchKit</p>
          <p>Designed to inspire. Built to explore.</p>
        </div>
      </div>
    </footer>
  );
}
