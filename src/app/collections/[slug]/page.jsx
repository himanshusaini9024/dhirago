import React from "react";

import Breadcrumb from "../../../components/breadcrumb";
import ProductsContent from "../../../components/products-content";
import ProductsFilter from "../../../components/products-filter";
import Image from "next/image";

const Products = () => (
   <>
    <Breadcrumb />
      <div className="w-full mt-4">
      <div className="container">
        <div className="relative w-full h-[120px] overflow-hidden">
          
          <Image
            src="/images/category-.jpg" // 👈 add your image in public/images
            alt="Shop Banner"
            fill
            priority
          />

          {/* Overlay Content */}
       

        </div>
      </div>
    </div>

    <section className="products-page mt-20">
      <div className="container">
          <div className="col-span-3 sticky top-20 h-fit">
      <ProductsFilter />
    </div>
        <div className="col-span-9">
      <ProductsContent />
    </div>

      </div>
    </section>
  </>
);

export default Products;
