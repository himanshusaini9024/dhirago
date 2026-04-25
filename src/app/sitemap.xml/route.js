export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const sitemaps = [
    `${baseUrl}/sitemap-products.xml`,
    `${baseUrl}/sitemap-collections.xml`,
    `${baseUrl}/sitemap-pages.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `
  <sitemap>
    <loc>${url}</loc>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}