import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home";
import Bestsellers from "../components/page-intro/bestseller";
import Luxurypage from "../components/page-intro/luxury";
import LuxuryHero from "../components/page-intro/luxuryHero";
import EditorialGrid from "../components/page-intro/editorialGrid";
import CrawlSeo from "../components/seo/CrawlSeo";
import { generateSEO } from "../utils/seo";
import { SITE_LINKS } from "../lib/pageSeo";
import Marquee from "../components/page-intro/marque";

export const metadata = generateSEO({
  title: "Buy Premium Men's Shirts Online in India | Dhirago",
  description:
    "Shop premium men's shirts online at Dhirago. Timeless designer shirts in quality fabrics, with refined details and effortless style.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <CrawlSeo
        h1="Buy Premium Men's Shirts Online in India | Dhirago"
        h2="Premium menswear rooted in craft and time"
        description="Dhirago offers premium men's shirts crafted with natural fabrics, hand embroidery, and timeless design."
        links={SITE_LINKS}
      />
      <PageIntro />
      <LuxuryHero />
      <Homecontent />
      <Marquee />
      <Bestsellers />
      <Luxurypage />
      <EditorialGrid />
    </main>
  );
}
