const FALLBACK_SITE_URL = "https://www.dhirago.com";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toIsoDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

export function urlEntry({
  loc,
  lastmod,
  changefreq = "weekly",
  priority = "0.7",
  videos = [],
}) {
  const videoXml = (videos || [])
    .map((video) => {
      const parts = [
        `<video:thumbnail_loc>${xmlEscape(video.thumbnailLoc)}</video:thumbnail_loc>`,
        `<video:title>${xmlEscape(video.title)}</video:title>`,
        `<video:description>${xmlEscape(video.description)}</video:description>`,
      ];
      if (video.contentLoc) {
        parts.push(
          `<video:content_loc>${xmlEscape(video.contentLoc)}</video:content_loc>`,
        );
      }
      if (video.publicationDate) {
        parts.push(
          `<video:publication_date>${xmlEscape(toIsoDate(video.publicationDate))}</video:publication_date>`,
        );
      }
      if (video.familyFriendly != null) {
        parts.push(
          `<video:family_friendly>${video.familyFriendly ? "yes" : "no"}</video:family_friendly>`,
        );
      }
      return `
    <video:video>
      ${parts.join("\n      ")}
    </video:video>`;
    })
    .join("");

  return `
  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${toIsoDate(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${videoXml}
  </url>`;
}

/** Homepage hero video — shared by sitemap + VideoObject JSON-LD */
export const HOME_HERO_VIDEO = {
  contentLoc: "https://images.dhirago.com/ecommerce/Home/video-1-1.mp4",
  thumbnailLoc: "https://images.dhirago.com/ecommerce/Home/banner1.webp",
  title: "Dhirago — Premium Men's Shirts & Luxury Indian Menswear",
  description:
    "Cinematic brand film introducing Dhirago luxury menswear — handcrafted premium men's shirts from Udaipur, India.",
  publicationDate: "2026-08-08T10:44:06.000Z",
};

export function sitemapXmlResponse(body) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

/** Core indexable pages — ordered by crawl importance */
export const SITEMAP_PAGES = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/collections/shirts", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.8", changefreq: "weekly" },
  { path: "/handwork", priority: "0.7", changefreq: "weekly" },
  { path: "/timeless", priority: "0.7", changefreq: "weekly" },
  { path: "/pages/better-materials", priority: "0.7", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.5", changefreq: "monthly" },
  { path: "/product-care", priority: "0.5", changefreq: "monthly" },
  { path: "/linen", priority: "0.5", changefreq: "monthly" },
  { path: "/essence", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/shipping-and-return", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-conditions", priority: "0.3", changefreq: "yearly" },
  { path: "/sitemap", priority: "0.4", changefreq: "weekly" },
];

export async function fetchProductSlugs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { next: { revalidate: 3600, tags: ["products"] } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];
    return list.filter((p) => p?.slug);
  } catch {
    return [];
  }
}
