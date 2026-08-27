import CrawlSeo from "../components/seo/CrawlSeo";
import { generateSEO } from "../utils/seo";

/** Shared internal links so public pages are never crawl dead-ends */
export const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections/shirts", label: "Shirts" },
  { href: "/about", label: "About" },
  { href: "/handwork", label: "Handwork" },
  { href: "/timeless", label: "Timeless" },
  { href: "/pages/better-materials", label: "Materials" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/product-care", label: "Product Care" },
];

export const PAGE_SEO = {
  about: {
    title: "About Dhirago | Luxury Indian Menswear",
    description:
      "Discover Dhirago—a luxury Indian menswear label rooted in traditional textiles, hand embroidery, and a quieter way of living.",
    path: "/about",
    crawl: {
      h2: "Our story and craft philosophy",
      description:
        "DHIRAGO crafts menswear that celebrates simplicity, comfort, and well-considered details—shaped in stillness and refined through time.",
      links: SITE_LINKS,
    },
  },
  contact: {
    title: "Contact Dhirago | Customer Support",
    description:
      "Contact Dhirago for orders, product questions, and support. We’re here to help with your menswear enquiry.",
    path: "/contact",
    crawl: {
      h2: "Get in touch with Dhirago",
      description:
        "Reach the Dhirago team for product details, orders, shipping, and care guidance.",
      links: SITE_LINKS,
    },
  },
  faq: {
    title: "FAQ | Dhirago Menswear",
    description:
      "Frequently asked questions about Dhirago shirts, sizing, shipping, returns, and product care.",
    path: "/faq",
    crawl: {
      h2: "Helpful answers for shopping with Dhirago",
      description:
        "Find answers on sizing, shipping, returns, fabrics, and caring for your Dhirago garments.",
      links: SITE_LINKS,
    },
  },
  privacy: {
    title: "Privacy Policy | Dhirago",
    description:
      "Read how Dhirago collects, uses, and protects your personal information when you shop with us.",
    path: "/privacy",
    crawl: {
      h2: "How we protect your data",
      description:
        "Our privacy policy explains personal data use, cookies, and your rights when using dhirago.com.",
      links: SITE_LINKS,
    },
  },
  shipping: {
    title: "Shipping & Returns | Dhirago",
    description:
      "Learn about Dhirago shipping timelines, delivery, exchanges, and return guidelines for orders in India.",
    path: "/shipping-and-return",
    crawl: {
      h2: "Delivery and return guidelines",
      description:
        "Shipping timelines, delivery expectations, and how to return or exchange Dhirago orders.",
      links: SITE_LINKS,
    },
  },
  terms: {
    title: "Terms & Conditions | Dhirago",
    description:
      "Terms and conditions for shopping on Dhirago—orders, payments, usage of the website, and policies.",
    path: "/terms-conditions",
    crawl: {
      h2: "Website and purchase terms",
      description:
        "The terms that apply when browsing and purchasing from Dhirago online.",
      links: SITE_LINKS,
    },
  },
  handwork: {
    title: "Hand Embroidery & Craft | Dhirago",
    description:
      "Explore Dhirago hand embroidery—Sashiko, Kantha, and Tangaliya-inspired detailing crafted by skilled artisans.",
    path: "/handwork",
    crawl: {
      h2: "The handwork behind every garment",
      description:
        "From khakha pinning to adda embroidery, discover how Dhirago handwork is made with patience and precision.",
      links: SITE_LINKS,
    },
  },
  timeless: {
    title: "Timeless Design | Dhirago",
    description:
      "Explore Dhirago’s timeless perspective—beauty that deepens with wear, age, and lived-in character.",
    path: "/timeless",
    crawl: {
      h1: "Timeless Design at Dhirago",
      h2: "Beauty that grows with time",
      description:
        "A reflection on character, patina, and garments made to gather meaning as they are worn and kept.",
      links: SITE_LINKS,
    },
  },
  linen: {
    title: "Linen Menswear | Dhirago",
    description:
      "Discover Dhirago linen menswear—natural fabrics, refined construction, and lasting comfort.",
    path: "/linen",
    crawl: {
      h2: "Natural linen, thoughtfully made",
      description:
        "Dhirago linen pieces prioritise comfort, breathability, and enduring craft.",
      links: SITE_LINKS,
    },
  },
  essence: {
    title: "The Essence of Dhirago",
    description:
      "The essence of Dhirago—slow living, traditional textiles, and menswear refined through craft and time.",
    path: "/essence",
    crawl: {
      h2: "What Dhirago stands for",
      description:
        "A quieter approach to luxury menswear rooted in material honesty and handmade detail.",
      links: SITE_LINKS,
    },
  },
  productCare: {
    title: "Product Care Guide | Dhirago",
    description:
      "Care guides for Dhirago cotton, linen, silk, modal, and lycra garments—wash, dry, iron, and avoid tips.",
    path: "/product-care",
    crawl: {
      h1: "Product Care Guide",
      h2: "How to care for your Dhirago garments",
      description:
        "Fabric-specific washing, drying, ironing, and care advice to help your pieces last.",
      links: SITE_LINKS,
    },
  },
  betterMaterials: {
    title: "Better Materials | Dhirago",
    description:
      "Learn about Dhirago’s better materials—linen, kala cotton, and fabrics chosen for comfort and longevity.",
    path: "/pages/better-materials",
    crawl: {
      h2: "Materials that shape every garment",
      description:
        "True craftsmanship starts with the material—chosen with care for wearer and world.",
      links: SITE_LINKS,
    },
  },
};

export function pageMetadata(key) {
  const page = PAGE_SEO[key];
  if (!page) return generateSEO({ title: "Dhirago", path: "/" });
  return generateSEO({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export function PageCrawlSeo({ pageKey }) {
  const page = PAGE_SEO[pageKey];
  if (!page?.crawl) return null;
  return <CrawlSeo {...page.crawl} />;
}
