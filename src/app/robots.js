export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart","/account", "/checkout"],
    },
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}