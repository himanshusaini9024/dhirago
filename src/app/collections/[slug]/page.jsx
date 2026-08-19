import Breadcrumb from "../../../components/breadcrumb";
import Categorybaner from "../../../components/categorybanner";
import ProductsContent from "../../../components/products-content";
import { notFound } from "next/navigation";
import { generateSEO } from "../../../utils/seo";
import { getCategoryProducts } from "../../../lib/fetchCategory";

export async function generateMetadata({ params }) {
  const { slug } = await  params;

  const name = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return generateSEO({
    title: `Buy ${name} Online in India | Best Price`,
    description: `Shop ${name} online at best price in India. Explore latest styles, premium quality & trending designs.`,
    path: `/collections/${slug}`,
  });
}

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const products = await getCategoryProducts(slug);

  if (!products?.category || products.category.length === 0) {
    notFound();
  }
  const name = slug.replace(/-/g, " ");
  return (
    <>
      <Categorybaner catbanner={products?.catbanner} catbannerMobile={products?.catbanner_mobile} slug={slug} />
      {/* <Breadcrumb /> */}
      <section>
        <ProductsContent products={products?.category || []} slug={slug} />
      </section>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: name,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}`,
            description: `Shop ${name} online in India`,
          }),
        }}
      />
    </>
  );
}

