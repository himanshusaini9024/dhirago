import { getSiteUrl, sitemapXmlResponse, toIsoDate } from "../../lib/sitemap";

export async function GET() {
  const baseUrl = getSiteUrl();
  const now = toIsoDate();

  const sitemaps = [
    `${baseUrl}/sitemap-pages.xml`,
    `${baseUrl}/sitemap-collections.xml`,
    `${baseUrl}/sitemap-products.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join("")}
</sitemapindex>`;

  return sitemapXmlResponse(xml);
}
