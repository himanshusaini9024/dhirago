import Image from "next/image";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home";
import ProductTabs from "../components/page-intro/producttab";
import Bestsellers from "../components/page-intro/bestseller";
import Luxurypage from "../components/page-intro/luxury";
import LuxuryHero from "../components/page-intro/luxuryHero";
import EditorialGrid from "../components/page-intro/editorialGrid";

import { generateSEO } from "../utils/seo";
import Marquee from "../components/page-intro/marque";

export const metadata = generateSEO({
  // title: "Buy Fashion Online | Best Price in India",
  // description:
  //   "Shop latest fashion products online at best price in India. Explore premium clothing, trending styles & fast delivery.",
  // path: "/",

  title: "Buy Premium Men's Shirts Online in India | Dhirago",
  description:
    "Shop premium men's shirts online in India. Explore cotton, oversized, formal and casual shirts crafted with premium fabrics. Free shipping & easy returns..",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <PageIntro />
      <LuxuryHero />
      <Homecontent />
      <Marquee/>
      <Bestsellers />
      {/* <ProductsFeatured/> */}
      <EditorialGrid />

      {/* <ProductsFeatured /> */}

      {/* <ProductTabs />
      <EditorialGrid />
      <Bestsellers />
      <Luxurypage /> */}
    </main>
  );
}
