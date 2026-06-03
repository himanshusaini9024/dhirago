const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ?  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  : "https://next-ecommerce-front.vercel.app";
