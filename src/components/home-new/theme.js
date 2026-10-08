import { Courier_Prime, Cormorant_Garamond, Pinyon_Script ,Josefin_Sans } from "next/font/google";

export const mono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});


export const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const v = process.env.NEXT_PUBLIC_IMAGE_VERSION || "";
export const IMG_BASE = process.env.NEXT_PUBLIC_IMG_URL || "https://images.dhirago.com";
export const cdn = (path) => `${IMG_BASE}/ecommerce/${path}?${v}`;

export const productImage = (product, index = 0) => {
  const list = Array.isArray(product?.image) ? product.image : [];
  const sorted = [...list].sort(
    (a, b) => (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99),
  );
  const url = sorted[index]?.url || sorted[0]?.url;
  return url ? `${IMG_BASE}${url}` : null;
};

export const formatPrice = (value) =>
  `₹ ${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

export const label = `${mono.className} uppercase tracking-[0.12em]`;

export const PAPER_BG = {
  backgroundColor: "#f6f1e7",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.38 0 0 0 0 0.28 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

export const IG_URL = "https://www.instagram.com/dhirago_/";
