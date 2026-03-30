"use client";

import Link from "next/link";
import useSWR from "swr";
import ProductsCarousel from "./carousel";

// ✅ Robust fetcher (handles errors properly)
const fetcher = async (url) => {
  try {
    console.log("Fetching URL:", url);

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("STATUS:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("API ERROR RESPONSE:", text);
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("FETCH ERROR:", err);
    throw err;
  }
};

const ProductsFeatured = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log("ENV API URL:", apiUrl);

  const { data, error, isLoading } = useSWR(
    apiUrl ? `${apiUrl}/api/justproduct` : null, // ✅ prevents bad calls
    fetcher
  );

  console.log("FULL RESPONSE:", data);
  console.log("ERROR:", error);

  // ✅ handle both formats safely
  const products = data?.data || data || [];

  return (
    <section className="py-16">
      <div className="max-w-[95%] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl lg:text-2xl font-light tracking-wide">
            Selected just for you
          </h2>

          <Link
            href="/products"
            className="text-sm tracking-wide text-gray-500 hover:text-black transition"
          >
            View All →
          </Link>
        </div>

        {/* STATES */}
        {isLoading && (
          <p className="text-sm text-gray-400 tracking-wide">
            Loading products...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400 tracking-wide">
            Failed to load products
          </p>
        )}

        {/* DATA */}
        {!isLoading && !error && products.length > 0 && (
          <ProductsCarousel products={products} />
        )}

        {/* EMPTY */}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-sm text-gray-400">No products found</p>
        )}
      </div>
    </section>
  );
};

export default ProductsFeatured;