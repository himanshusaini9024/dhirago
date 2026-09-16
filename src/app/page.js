import dynamic from "next/dynamic";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home";
import Bestsellers from "../components/page-intro/bestseller";
import Luxurypage from "../components/page-intro/luxury";
import LuxuryHero from "../components/page-intro/luxuryHero";
import CrawlSeo from "../components/seo/CrawlSeo";
import { generateSEO } from "../utils/seo";
import { SITE_LINKS } from "../lib/pageSeo";
import { fetchProductSlugs } from "../lib/sitemap";
import Marquee from "../components/page-intro/marque";

const EditorialGrid = dynamic(
  () => import("../components/page-intro/editorialGrid"),
);

const InstagramFeed = dynamic(
  () => import("../components/InstagramFeed"),
);

export const metadata = generateSEO({
  title: "Dhirago | Premium Men's Shirts Online India — Luxury Menswear",
  description:
    "Dhirago is a luxury Indian menswear brand. Shop premium men's shirts online — natural fabrics, hand embroidery, and timeless design from Udaipur.",
  path: "/",
});

export default async function Home() {
  const products = await fetchProductSlugs();
  const productLinks = products.slice(0, 12).map((p) => ({
    href: `/product/${p.slug}`,
    label:
      p.name ||
      p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  return (
    <main>
      <CrawlSeo
        h1="Dhirago — Premium Men's Shirts & Luxury Indian Menswear"
        h2="Buy handcrafted menswear online in India"
        description="Dhirago Fashion is a luxury Indian menswear brand from Udaipur. We craft premium men's shirts with natural fabrics, hand embroidery, block printing, and timeless design."
        links={[...SITE_LINKS, ...productLinks]}
      />
      <PageIntro />
      <LuxuryHero />
      <Homecontent />
      <Marquee />
      <Bestsellers />
      <Luxurypage />
      <EditorialGrid />
      <InstagramFeed />
    </main>
  );
}
