import { notFound } from "next/navigation";
import ProductGrid from "../../../components/product-single/ProductGrid";
import ProductsFeatured from "../../../components/products-featured";
import RecentlyViewedTracker from "../../../components/recentlyviewtracker";
import { generateSEO } from "../../../utils/seo";
import { sortProductImages } from "../../../utils/sortProductImages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhirago.com";
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || "";

function absoluteImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${IMG_URL}${url}`;
}

async function getProduct(pid) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}`,
      {
        next: {
          revalidate: 30,
          tags: ["products", `product-${pid}`],
        },
      },
    );
    if (res.status === 404) return null;
    if (!res.ok) return null;
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
  const product = await getProduct(slug);

  if (!product) {
    return generateSEO({
      title: "Product Not Found",
      description: "This Dhirago product does not exist.",
      noIndex: true,
    });
  }

  const imageUrl =
    absoluteImageUrl(product.images?.[0]?.url) ||
    "https://images.dhirago.com/ecommerce/dhirago-og.webp";

  const plainDesc = String(product.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return generateSEO({
    title: `${product.name} | Dhirago Men's Shirt`,
    description:
      plainDesc.slice(0, 150) ||
      `Buy ${product.name} online at Dhirago — premium men's shirts and luxury Indian menswear.`,
    path: `/product/${slug}`,
    image: imageUrl,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const imageUrls = (product.images || [])
    .map((i) => absoluteImageUrl(i.url))
    .filter(Boolean);

  const selling =
    Number(product.currentPrice ?? product.special_price ?? product.price) ||
    0;
  const mrp = Number(product.mrp ?? product.price) || selling;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: imageUrls,
      description: product.description || product.name,
      sku: product.sku || String(product.id),
      brand: {
        "@type": "Brand",
        name: "Dhirago",
      },
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/product/${slug}`,
        priceCurrency: "INR",
        price: selling,
        priceValidUntil: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 60,
        )
          .toISOString()
          .slice(0, 10),
        availability:
          Number(product.quantityAvailable) > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: "Dhirago Fashion Private Limited",
        },
      },
      ...(mrp > selling
        ? {
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "MRP",
                value: mrp,
              },
            ],
          }
        : {}),
      ...(product.punctuation?.countOpinions > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.punctuation.punctuation,
          reviewCount: product.punctuation.countOpinions,
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shirts",
          item: `${SITE_URL}/collections/shirts`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: `${SITE_URL}/product/${slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <RecentlyViewedTracker product={product} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ProductGrid product={product} />

      <div className="mt-10 border-t border-[#e0ddd6] md:mt-[60px]">
        <ProductsFeatured />
      </div>
    </>
  );
}
