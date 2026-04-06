// app/collections/[slug]/page.js

import Breadcrumb from "../../../components/breadcrumb";
import ProductsContent from "../../../components/products-content";

// async function getProducts(slug) {
//   console.log('slug',slug)
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/category/${slug}`,
//     { cache: "no-store" } // always fresh
//   );

//   const data = await res.json();
//   return data.category || [];
// }


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
    return data.category;
  } catch (error) {
    console.error("🔥 Fetch Error:", error);
    return []; // prevent crash
  }
}

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const products = await getProducts(slug);

  return (
    <>
      <Breadcrumb />
      <section className="mt-1 ">
        <ProductsContent products={products} slug={slug} />
      </section>
    </>
  );
}

