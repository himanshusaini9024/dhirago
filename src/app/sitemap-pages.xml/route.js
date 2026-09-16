import {
  getSiteUrl,
  sitemapXmlResponse,
  urlEntry,
  SITEMAP_PAGES,
} from "../../lib/sitemap";

export async function GET() {
  const baseUrl = getSiteUrl();
  const now = new Date().toISOString();

  const urls = SITEMAP_PAGES.map((page) =>
    urlEntry({
      loc: `${baseUrl}${page.path}`,
      lastmod: now,
      changefreq: page.changefreq,
      priority: page.priority,
    }),
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemapXmlResponse(xml);
}
