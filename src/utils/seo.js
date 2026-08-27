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
}) {
  const safeDescription = clampDescription(description);

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
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ],
      type: "website",
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
  };
}