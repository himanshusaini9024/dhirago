import Breadcrumb from "../../../components/breadcrumb";
import ProductGrid from "../../../components/product-single/ProductGrid";
import ProductsFeatured from "../../../components/products-featured";
import RecentlyViewedTracker from "../../../components/recentlyviewtracker";
import HeroCarousel from "../../../components/product-single/HeroCarousel";
import ProductTabs from "../../../components/product-single/producttab";
import { generateSEO } from "../../../utils/seo";
import { sortProductImages } from "../../../utils/sortProductImages";

async function getProduct(pid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}`,
      { next: { revalidate: 60 } },
    );
    if (res.status === 404) return null;
    const product = await res.json();
    return {
      ...product,
      images: sortProductImages(product.images),
    };
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${slug}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok)
    return generateSEO({
      title: "Product Not Found",
      description: "This product does not exist",
      noIndex: true,
    });
  const product = await res.json();
  const images = sortProductImages(product.images);
  const s3url = process.env.NEXT_PUBLIC_IMG_URL;
  const imageUrl = images[0]?.url
    ? `${s3url}${images[0].url}`
    : "/og-image.jpg";
  return generateSEO({
    title: `Buy ${product.name} `,
    description: `Buy ${product.name} online at best price. ${product.description?.slice(0, 120)}`,
    path: `/product/${slug}`,
    image: imageUrl,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "#aaa",
          letterSpacing: "0.1em",
          fontFamily: "'Josefin Sans', sans-serif",
        }}
      >
        Product not found
      </div>
    );
  }

  return (
    <>
      {/* <Breadcrumb product={product} /> */}
      <RecentlyViewedTracker product={product} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images?.map((i) => i.url),
            description: product.description || product.name,
            sku: product.id,

            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.currentPrice,
              availability:
                product.quantityAvailable > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },

            ...(product.punctuation?.countOpinions > 0 && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.punctuation.punctuation,
                reviewCount: product.punctuation.countOpinions,
              },
            }),
          }),
        }}
      />

      <ProductGrid product={product} />

      <div className="mt-10 border-t border-[#e0ddd6] md:mt-[60px]">
        <ProductsFeatured />
      </div>
    </>
  );
}
