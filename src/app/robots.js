export default function robots() {
  const isIndexingEnabled =
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  if (!isIndexingEnabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/checkout",
        "/account",
        "/login",
        "/register",
        "/wishlist",
        "/search",
        "/api",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}