import Breadcrumb from "../../../components/breadcrumb";
import Footer from "../../../components/footer";
import Content from "../../../components/product-single/content";
import Description from "../../../components/product-single/description";
import Gallery from "../../../components/product-single/gallery";
import ProductsFeatured from "../../../components/products-featured";
import ProductTabs from "../../../components/product-single/producttab"; // ✅ ADD THIS
import { server } from "../../../utils/server";
import { generateSEO } from "../../../utils/seo";
// ✅ Fetch product (Server Side)
async function getProduct(pid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}`,
      // { cache: "no-store" },
      { next: { revalidate: 60 } }, 
      
    );

    // ✅ Handle 404 properly
    if (res.status === 404) {
      console.log("Product not found");
      return null;
    }

    const data = await res.json();
    console.log("Product", data);

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${slug}`,
    // { cache: "no-store" }
    { next: { revalidate: 60 } } 
    
  );

  if (!res.ok) {
    return generateSEO({
      title: "Product Not Found",
      description: "This product does not exist",
      noIndex: true,
    });
  }

  const product = await res.json();
  const imageUrl = product.images[0]?.url
    ? `https://res.cloudinary.com/ds48lk80f/${product.images[0].url}`
    : "/og-image.jpg";
    console.log('imageUrl',imageUrl);


  return generateSEO({
    title: `Buy ${product.name} Online | Best Price in India`,
    description: `Buy ${product.name} online at best price. ${product.description?.slice(0, 120)}`,
    path: `/product/${slug}`,
    image: imageUrl,
  });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            sku: product._id,
            brand: {
              "@type": "premium",
              name: "Dhirago",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

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
