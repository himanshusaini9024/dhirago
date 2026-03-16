import Image from "next/image";
import PageIntro from "../components/page-intro";
import Homecontent from "../components/page-intro/home"
import ProductsFeatured from "../components/products-featured";

export default function Home() {
   return (
    <main>
      <PageIntro />
      <Homecontent />

       <ProductsFeatured />

    </main>
  );
}
