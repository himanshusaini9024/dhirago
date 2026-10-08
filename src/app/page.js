import CrawlSeo from "../components/seo/CrawlSeo";
import HomeNew from "../components/home-new";
import { generateSEO } from "../utils/seo";
import { SITE_LINKS } from "../lib/pageSeo";
import { getCategoryProducts } from "../lib/fetchCategory";

export const metadata = generateSEO({
  title: "Dhirago | Premium Men's Shirts Online India — Luxury Menswear",
  description:
    "Dhirago is a luxury Indian menswear brand. Shop premium men's shirts online — natural fabrics, hand embroidery, and timeless design from Udaipur.",
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

  return (
    <main>
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
