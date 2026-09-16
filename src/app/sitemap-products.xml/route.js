import {
  fetchProductSlugs,
  getSiteUrl,
  sitemapXmlResponse,
  urlEntry,
} from "../../lib/sitemap";

export async function GET() {
  const baseUrl = getSiteUrl();
  const products = await fetchProductSlugs();

  const urls = products
    .map((p) =>
      urlEntry({
        loc: `${baseUrl}/product/${p.slug}`,
        lastmod: p.updated_at || p.updatedAt,
        changefreq: "weekly",
        priority: "0.8",
      }),
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemapXmlResponse(xml);
}
