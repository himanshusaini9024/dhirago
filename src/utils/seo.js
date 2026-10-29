const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_NAME = "Dhirago";

function clampDescription(description, max = 155) {
  if (!description) return description;
  if (description.length <= max) return description;
  return `${description.slice(0, max - 1).replace(/\s+\S*$/, "").trim()}…`;
}

export function generateSEO({
  title,
  description,
  path = "",
  image = "https://images.dhirago.com/ecommerce/dhirago-og.webp",
  noIndex = false,
  type = "website",
  imageWidth = 1200,
  imageHeight = 600,
}) {
  const safeDescription = clampDescription(description);
  // Next.js typed Open Graph only allows website/article/etc — not "product".
  // For product pages we emit og:type via `other` so crawlers still see product.
  const isProduct = type === "product";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description: safeDescription,

    alternates: {
      canonical: `${SITE_URL}${path}`,
    },

    openGraph: {
      title,
      description: safeDescription,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
        },
      ],
      // Omit typed `type` for products so we don't also emit og:type=website.
      ...(isProduct ? {} : { type: "website" }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [image],
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
    },

    ...(isProduct
      ? {
          other: {
            "og:type": "product",
          },
        }
      : {}),
  };
}