export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
};

export type Brand = {
  id: number;
  brandName: string;
  primaryColor: string;
};

export type Hero = {
  id: number;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaUrl: string | null;
};

export type Template = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  templateCategory: Category | null;
  brand: Brand | null;
  hero: Hero | null;
};

type TemplatesResponse = {
  data: Template[];
};

const getStrapiUrl = () => {
  const url = process.env.STRAPI_URL;

  if (!url) {
    throw new Error("STRAPI_URL is not configured");
  }

  return url;
};

export async function getTemplates(): Promise<Template[]> {
  const response = await fetch(`${getStrapiUrl()}/api/templates?populate=*`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.status}`);
  }

  const result: TemplatesResponse = await response.json();
  return result.data;
}

export async function getTemplateBySlug(
  slug: string,
): Promise<Template | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  const response = await fetch(
    `${getStrapiUrl()}/api/templates?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.status}`);
  }

  const result: TemplatesResponse = await response.json();
  return result.data[0] ?? null;
}
