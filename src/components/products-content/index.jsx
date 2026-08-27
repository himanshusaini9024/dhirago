"use client";

import { Suspense } from "react";
import ProductList from "./list";

const ProductsContent = ({ products, slug }) => {
  return (
    <section className="products-content">
      <Suspense fallback={null}>
        <ProductList initialProducts={products} slug={slug} />
      </Suspense>
    </section>
  );
};

export default ProductsContent;
