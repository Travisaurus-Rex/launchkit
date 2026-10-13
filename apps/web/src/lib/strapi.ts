export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Template = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  templateCategory: Category | null;
};

type TemplatesResponse = {
  data: Template[];
};

export async function getTemplates(): Promise<Template[]> {
  const baseUrl = process.env.STRAPI_URL;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not configured");
  }

  const response = await fetch(
    `${baseUrl}/api/templates?populate=templateCategory`,
    {
      cache: "no-store", // keep this in dev so we can see updates
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.status}`);
  }

  const result: TemplatesResponse = await response.json();

  return result.data;
}
