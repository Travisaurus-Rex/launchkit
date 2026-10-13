export async function getTemplates(): Promise<Template[]> {
  const baseUrl = process.env.STRAPI_URL;

  if (!baseUrl) {
    throw new Error("STRAPI_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/api/templates`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.status}`);
  }

  const result: TemplatesResponse = await response.json();

  return result.data;
}
