import Image from "next/image";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home";
import ProductsFeatured from "../components/products-featured";
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

  title: "Dhirago - Premium Menswear",
  description:
    "Shop premium menswear including shirts, t-shirts, polos, trousers & more. High quality products with fast delivery.",
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
      <EditorialGrid />

      {/* <ProductsFeatured /> */}

      {/* <ProductTabs />
      <EditorialGrid />
      <Bestsellers />
      <Luxurypage /> */}
    </main>
  );
}
