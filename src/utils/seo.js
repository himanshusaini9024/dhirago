const SITE_URL =  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_NAME = "Dhirago";

export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
}) {
  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}${path}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      images: [
        {
            
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}