export default function robots() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : "",
      disallow: isProduction
        ? ["/cart", "/account", "/checkout"]
        : "/",
    },
    sitemap: isProduction
      ? "https://dhirago-a6xq.vercel.app/sitemap.xml"
      : "",
  };
}