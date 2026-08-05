// app/collections/[slug]/page.js

import Breadcrumb from "../../../components/breadcrumb";
import Categorybaner from "../../../components/categorybanner";
import ProductsContent from "../../../components/products-content";
import { notFound } from "next/navigation";

// async function getProducts(slug) {
//   console.log('slug',slug)
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/category/${slug}`,
//     { cache: "no-store" } // always fresh
//   );

//   const data = await res.json();
//   return data.category || [];
// }
import { generateSEO } from "../../../utils/seo";

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

async function getProducts(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category/${slug}`,
      { cache: "no-store" }
    );

    // ✅ check if response is OK
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    // ✅ check content type
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text(); // debug
      console.error("❌ Not JSON response:", text);
      throw new Error("Response is not JSON");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("🔥 Fetch Error:", error);
    // return []; // prevent crash
    return {
  category: [],
  catbanner: null,
};
  }
}



export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const products = await getProducts(slug);
  console.log('catproducts',products);
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
            url: `https://yourdomain.com/collections/${slug}`,
            description: `Shop ${name} online in India`,
          }),
        }}
      />
    </>
  );
}

