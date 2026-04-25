export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let products = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      { cache: "no-store" }
    );
    products = await res.json();
  } catch (err) {
    console.error("Sitemap fetch failed:", err);
  }

  const categories = ["mens-shirts", "womens-wear"];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(p.updated_at || Date.now()),
      changeFrequency: "weekly",
      priority: 0.9,

      images: p.images?.map((img) => ({
        url: img.url.startsWith("http")
          ? img.url
          : `https://res.cloudinary.com/ds48lk80f/${img.url}`,
        title: p.name,
      })) || [],
    })),

    ...categories.map((c) => ({
      url: `${baseUrl}/collections/${c}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];
}