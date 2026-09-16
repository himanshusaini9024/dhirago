import {
  getSiteUrl,
  sitemapXmlResponse,
  urlEntry,
} from "../../lib/sitemap";

export async function GET() {
  const baseUrl = getSiteUrl();
  const categories = ["shirts"];

  const urls = categories
    .map((c) =>
      urlEntry({
        loc: `${baseUrl}/collections/${c}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: "0.9",
      }),
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemapXmlResponse(xml);
}
