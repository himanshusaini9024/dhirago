export default function robots() {
  const isIndexingEnabled = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: isIndexingEnabled ? ["/cart", "/account", "/checkout"] : "/",
    },
    sitemap: isIndexingEnabled
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
      : "",
  };
}
