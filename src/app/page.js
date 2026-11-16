import CrawlSeo from "../components/seo/CrawlSeo";
import HomeNew from "../components/home-new";
import { generateSEO } from "../utils/seo";
import { SITE_LINKS } from "../lib/pageSeo";
import { getCategoryProducts } from "../lib/fetchCategory";
import { HOME_HERO_VIDEO } from "../lib/sitemap";

export const metadata = generateSEO({
  title: "Dhirago | Premium Men's Shirts Online India — Luxury Menswear",
  description:
    "Discover Dhirago, a luxury Indian menswear brand offering premium men's shirts crafted with natural fabrics, hand embroidery and timeless design.",
  path: "/",
});

export default async function Home() {
  const data = await getCategoryProducts("shirts");
  const products = Array.isArray(data?.category) ? data.category : [];

  const productLinks = products.slice(0, 12).map((p) => ({
    href: `/product/${p.slug}`,
    label:
      p.name ||
      p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  const videoObjectLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": "https://www.dhirago.com/#home-hero-video",
    name: HOME_HERO_VIDEO.title,
    description: HOME_HERO_VIDEO.description,
    thumbnailUrl: [HOME_HERO_VIDEO.thumbnailLoc],
    contentUrl: HOME_HERO_VIDEO.contentLoc,
    uploadDate: HOME_HERO_VIDEO.publicationDate,
    isFamilyFriendly: true,
    inLanguage: "en",
    publisher: {
      "@id": "https://www.dhirago.com/#organization",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectLd) }}
      />
      <CrawlSeo
        h1="Dhirago — Premium Men's Shirts & Luxury Indian Menswear"
        h2="Buy handcrafted menswear online in India"
        description="Dhirago Fashion is a luxury Indian menswear brand from Udaipur. We craft premium men's shirts with natural fabrics, hand embroidery, block printing, and timeless design."
        links={[...SITE_LINKS, ...productLinks]}
      />
      <HomeNew products={products} />
    </main>
  );
}
