"use client";

import useSWR from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { useParams } from "next/navigation";

const ProductsContent = () => {
  const { slug } = useParams();

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    slug
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/category/${slug}`
      : null,
    fetcher
  );


  if (error) return <div>Failed to load products</div>;

  const products = data?.category || []; // ✅ FIX
  return (
    <>
      {isLoading && <ProductsLoading />}

      {products.length > 0 ? (
        <section className="products-list">
          {products.map((item, index) => {
            const price = item.price;
            const discount = item.discount || 0;

            const currentPrice =
              price - (price * discount) / 100;

            const images = item.photo
              ? item.photo.split(",")
              : [];

            return (
              <ProductItem
                key={`${item.id}-${index}`}
                id={item.id}
                slug={item.slug}
                name={item.title} // ✅ FIX (not name)
                price={price}
                currentPrice={currentPrice}
                images={images}
              />
            );
          })}
        </section>
      ) : (
        <p>No products found</p>
      )}
    </>
  );
};

export default ProductsContent;