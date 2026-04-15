export default async function sitemap() {
  const products = await fetch("http://localhost:3000/products").then((r) =>
    r.json()
  );

  const categories = ["mens-shirts", "womens-wear"];

  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
    },
    ...products.map((p) => ({
      url: `https://yourdomain.com/product/${p.slug}`,
      lastModified: new Date(),
    })),
    ...categories.map((c) => ({
      url: `https://yourdomain.com/collections/${c}`,
      lastModified: new Date(),
    })),
  ];
}