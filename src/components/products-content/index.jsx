"use client";

import ProductList from "./list";

const ProductsContent = ({ products, slug }) => {
  return (
    <section className="products-content">
      <ProductList initialProducts={products} slug={slug} />
    </section>
  );
};

export default ProductsContent;