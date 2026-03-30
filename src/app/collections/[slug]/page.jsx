import Breadcrumb from "../../../components/breadcrumb";
import ProductsContent from "../../../components/products-content";

const Products = () => {
  return (
    <>
      <Breadcrumb />

      <section className="mt-1 px-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* OPTIONAL SIDEBAR */}
          {/* <div className="col-span-3">
            <ProductsFilter />
          </div> */}

          {/* PRODUCTS */}
          <div className="col-span-12">
            <ProductsContent />
          </div>

        </div>
      </section>
    </>
  );
};

export default Products;