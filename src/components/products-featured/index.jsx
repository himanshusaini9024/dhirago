"use client";

import Link from "next/link";
import useSWR from "swr";
import ProductsCarousel from "./carousel";

// fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductsFeatured = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/justproduct`,
    fetcher
  );

  const products = data?.data || [];

  return (
    <section className="py-16">
      {/* CONTAINER (same as bestseller) */}
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
          <p className="text-sm text-gray-400 tracking-wide">Loading products...</p>
        )}

        {error && (
          <p className="text-sm text-red-400 tracking-wide">
            Failed to load products
          </p>
        )}

        {/* CAROUSEL */}
        {!isLoading && !error && (
          <ProductsCarousel products={products} />
        )}

      </div>
    </section>
  );
};

export default ProductsFeatured;