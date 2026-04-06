import Breadcrumb from "../../../components/breadcrumb";
import Footer from "../../../components/footer";
import Content from "../../../components/product-single/content";
import Description from "../../../components/product-single/description";
import Gallery from "../../../components/product-single/gallery";
import ProductsFeatured from "../../../components/products-featured";
import ProductTabs from "../../../components/product-single/producttab"; // ✅ ADD THIS
import { server } from "../../../utils/server";
// ✅ Fetch product (Server Side)
async function getProduct(pid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}`,
      { cache: "no-store" }
    );


    // ✅ Handle 404 properly
    if (res.status === 404) {
      console.log("Product not found");
      return null;
    }

    const data = await res.json();
      console.log("Product",data);

    return data;

  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// ✅ Page Component (Server Component)
export default async function ProductPage({ params }) {

  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <>
      <Breadcrumb />

      <section className="product-single">
        <div className="container-fluied">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          {/* ✅ Tabs moved to client component */}
          <ProductTabs product={product} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>

    </>
  );
}