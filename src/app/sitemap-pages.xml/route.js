import {
  getSiteUrl,
  sitemapXmlResponse,
  urlEntry,
  SITEMAP_PAGES,
  HOME_HERO_VIDEO,
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
      ...(page.path === ""
        ? {
            videos: [
              {
                thumbnailLoc: HOME_HERO_VIDEO.thumbnailLoc,
                title: HOME_HERO_VIDEO.title,
                description: HOME_HERO_VIDEO.description,
                contentLoc: HOME_HERO_VIDEO.contentLoc,
                publicationDate: HOME_HERO_VIDEO.publicationDate,
                familyFriendly: true,
              },
            ],
          }
        : {}),
    }),
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

  return sitemapXmlResponse(xml);
}
