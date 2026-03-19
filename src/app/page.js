import Image from "next/image";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home"
import ProductsFeatured from "../components/products-featured";
import ProductTabs from "../components/page-intro/producttab"
import Bestsellers from "../components/page-intro/bestseller";
import EditorialGrid from "../components/page-intro/editorialGrid"

export const metadata = {
  title: "Dhirago - Premium Menswear",
  description:
    "Shop premium menswear including shirts, t-shirts, polos, trousers & more. High quality products with fast delivery.",

  openGraph: {
    title: "Dhirago",
    description:
      "Shop premium menswear with best quality and modern style.",
    url: "https://yourwebsite.com",
    siteName: "Dhirago",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 628,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dhirago",
    description: "Premium menswear collection available now.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function Home() {
   return (
    <main>
      <PageIntro />
      <Homecontent />
  <ProductTabs />
       <ProductsFeatured />
       <EditorialGrid/>
       <Bestsellers/>

    </main>
  );
}
