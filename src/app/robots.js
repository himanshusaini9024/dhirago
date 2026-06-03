export default function robots() {
  const isIndexingEnabled =
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    rules: {
      userAgent: "*",
      allow: isIndexingEnabled ? "/" : "",
      disallow: isIndexingEnabled
        ? ["/cart", "/account", "/checkout","/"]
        : "/",
    },
    sitemap: isIndexingEnabled
      ? "https://dhirago-a6xq.vercel.app/sitemap.xml"
      : "",
  };
}