export default function robots() {
  const isIndexingEnabled =
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhirago.com"
  ).replace(/\/$/, "");

  if (!isIndexingEnabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/account/",
          "/signup",
          "/success",
          "/return",
          "/login",
          "/register",
          "/wishlist",
          "/search",
          "/api",
        ],
      },
      {
        // Help Googlebot prioritize public catalog pages
        userAgent: "Googlebot",
        allow: ["/", "/collections/", "/product/", "/about", "/sitemap"],
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/signup",
          "/success",
          "/return",
          "/login",
          "/register",
          "/wishlist",
          "/search",
          "/api",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
