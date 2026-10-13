import { Suspense } from "react";
import TemplateList from "@/components/template-list";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">LaunchKit</h1>

          <p className="mt-3 text-lg text-slate-600">
            Discover your next website design.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">
            Available Templates
          </h2>

          <Suspense
            fallback={<p className="text-slate-500">Loading templates...</p>}
          >
            <TemplateList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
