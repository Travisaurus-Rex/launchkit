import { getTemplates } from "@/lib/strapi";

export default async function TemplateList() {
  const templates = await getTemplates();

  if (templates.length === 0) {
    return <p className="text-slate-500">No templates published yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <article
          key={template.documentId}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <span className="text-sm font-medium uppercase text-indigo-600">
            {template.category.replace("_", " ")}
          </span>

          <h3 className="mt-3 text-xl font-semibold text-slate-900">
            {template.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {template.description}
          </p>
        </article>
      ))}
    </div>
  );
}
