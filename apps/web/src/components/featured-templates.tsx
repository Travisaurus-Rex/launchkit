import { getTemplates } from "@/lib/strapi";
import TemplateCard from "@/components/template-card";

export default async function FeaturedTemplates() {
  const templates = await getTemplates();
  const featured = templates.filter((template) => template.featured);

  if (featured.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 p-8 text-stone-500">
        No featured templates available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((template) => (
        <TemplateCard key={template.documentId} template={template} />
      ))}
    </div>
  );
}
