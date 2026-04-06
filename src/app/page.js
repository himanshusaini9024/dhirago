import Image from "next/image";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home"
import ProductsFeatured from "../components/products-featured";
import ProductTabs from "../components/page-intro/producttab"
import Bestsellers from "../components/page-intro/bestseller";
import Luxurypage from "../components/page-intro/luxury";
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
     <section className="h-[50vh] bg-white flex items-center justify-center border-t">
  <div className="max-w-2xl px-6 transition-all duration-700 hover:scale-[1.02] flex flex-col items-center text-center">
    {/* Logo Image */}
   <div className="h-[8rem] md:h-[13rem] mb-2 ">
  <img
    src="/images/logo/fram.png"
    alt="Logo"
    className="w-[5rem] md:w-[8rem]"
  />
</div>

 {/* <div className="h-[12rem] md:h-[15rem]">
  <img
    src="/images/logo/3.svg"
    alt="Logo"
    className="w-[13rem] md:w-[17rem]"
  />
</div> */}

    {/* Heading */}
    <h3 className="lg:text-4xl md:text-2xl mb-4 ">
      Welcome to DHIRAGO
    </h3>

    {/* Description paragraph */}
     <p className="text-gray-500 text-sm md:text-base leading-relaxed md:leading-loose max-w-xm mb-8">
      We craft premium menswear designed to last. Explore our collections and 
      <a 
        href="/signup" 
        className="text-black font-medium underline underline-offset-4 hover:opacity-70 transition ml-1"
      >
        join Club Dhirago
      </a>{" "}
      for exclusive benefits.
    </p>

    {/* Button */}
      <a
      href="/pages/signup"
      className="px-6 py-2.5 border border-black text-black text-sm tracking-wide hover:bg-black hover:text-white transition duration-300"
    >
      JOIN CLUB
    </a>
  </div>
</section>
      <Homecontent />
  <ProductTabs />
       <ProductsFeatured />
       <EditorialGrid/>
       <Bestsellers/>
       <Luxurypage/>

    </main>
  );
}