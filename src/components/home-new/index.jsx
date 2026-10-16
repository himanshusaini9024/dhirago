import CinematicHero from "./CinematicHero";
import TwoUp from "./TwoUp";
import Ticker from "./Ticker";
import IntroStatement from "./IntroStatement";
import ProductGrid from "./ProductGrid";
import EditorialBanner from "./EditorialBanner";
import MeetTheMaker from "./MeetTheMaker";
import MoodCarousel from "./MoodCarousel";
import ScriptCampaign from "./ScriptCampaign";
import Spotlight from "./Spotlight";
import BrandNote from "./BrandNote";
import { OrnamentHeading } from "./Ornament";
import InstagramFeed from "../InstagramFeed";
import { PAPER_BG, cdn, productImage } from "./theme";
import ProductsFeatured from "../../components/page-intro/editorialGrid";
import Hero from "../../components/page-intro/luxury";
import PageIntro from "../../components/page-intro";
import Homecontent from "../../components/page-intro/home";
import Bestsellers from "../../components/page-intro/bestseller";
import shopCollection from "../../data/shop-our-collection.json";

const bySlug = (list, slug) => list.find((p) => p.slug === slug);

const MOODS = [
  { title: "Ombre", slug: "blue-ombre-kantha-detailed-shirt" },
  { title: "Hand Embroidered", slug: "natural-grey-hand-embroidered-shirt" },
  { title: "Block Printed", slug: "light-yellow-block-printed-shirt" },
  { title: "Stripes", slug: "amber-blush-stripe-shirt" },
  { title: "Classics", slug: "ivory-beige-classic-shirt" },
  { title: "Hand Stitched", slug: "jet-black-hand-stitched-seam-shirt" },
];

const SPOTLIGHT = [
  "natural-grey-hand-embroidered-shirt",
  "blue-ombre-kantha-detailed-shirt",
  "jet-black-hand-stitched-seam-shirt",
  "hand-detailed-rust-shirt",
];

export default function HomeNew({ products = [] }) {
  const active = products.filter((p) => p.status !== "inactive");
  const newArrivals = shopCollection.products;

  const indigo = bySlug(active, "deep-indigo-embroidered-neckline-shirt") || active[2];
  const grey = bySlug(active, "natural-grey-hand-embroidered-shirt");
  const rust = bySlug(active, "hand-detailed-rust-shirt");

  const moods = MOODS.map(({ title, slug }) => {
    const p = bySlug(active, slug);
    return p ? { title, href: `/product/${p.slug}`, src: productImage(p, 0) } : null;
  }).filter(Boolean);

  const spotlight = SPOTLIGHT.map((slug) => bySlug(active, slug))
    .filter(Boolean)
    .map((p) => ({ href: `/product/${p.slug}`, title: p.name, src: productImage(p, 1) }));

  return (
    <div style={PAPER_BG} className="text-[#2b241c]">
      {/* <CinematicHero /> */}

      {/* <TwoUp
        panels={[
          {
            src: cdn("Home/dsc06295.webp"),
            alt: "Natural linen shirt with hand embroidery",
            href: "/collections/shirts",
            caption: "Linen",
            position: "object-[center_20%]",
          },
          {
            src: productImage(indigo, 0) || cdn("Home/wi.webp"),
            alt: indigo?.name || "Indigo shirt",
            href: indigo ? `/product/${indigo.slug}` : "/collections/shirts",
            caption: "Indigo",
            position: "object-top",
          },
        ]}
      /> */}

      {/* <TwoUp
  panels={[
    {
      // src: cdn("Home/dsc06295.webp"),
      src: "/images/cp.jpeg",
      alt: "Natural linen shirt with hand embroidery",
      href: "/collections/shirts",
      caption: "Linen",
      position: "object-[center_20%]",
    },
  ]}
/> */}
<PageIntro/>
 {/* <TwoUp
  panels={[
   
       {
      src: "/images/cppp1.png",
      alt: "Dhirago linen shirt collection",
      href: "/collections/shirts",
      caption: "Natural Linen",
      position: "object-[center_20%]",
    }
  
  ]}
/> */}

      {/* <Ticker
        items={[
          "New shirts now live",
          "Flat 15% off on MRP",
          "Hand embroidered in India",
          "Natural linen & kala cotton",
        ]}
      /> */}

      <IntroStatement />

      <ProductGrid
        title={shopCollection.title}
        products={newArrivals}
        cta={shopCollection.cta}
        priority
      />

      {/* <EditorialBanner
        src={cdn("Home/wi2.webp")}
        alt="Artisan embroidering a Dhirago shirt by hand"
        href="/handwork"
        position="object-[center_45%]"
      /> */}
      <Homecontent />
      {/* <Bestsellers /> */}

      {/* <Hero/> */}

      <div className="h-14 md:h-20" />


      <MeetTheMaker
        portrait={ cdn("Home/wi.webp")}
        slides={[
          { src: cdn("Home/img2.webp"), alt: "Hand embroidery on linen", position: "object-[center_40%]" },
          { src: cdn("Home/wi2.webp") , alt: "Embroidered collar detail" },
          { src: cdn("Home/img1.webp"), alt: "Kantha stitches being worked by hand" },
          { src: cdn("Home/story6.webp") , alt: "Hand detailing on a rust shirt" },
 
          
        ]}
      />
        <ProductsFeatured/>


      {/* <MoodCarousel title="Shop by Mood" items={moods} /> */}

      {/* <ScriptCampaign
        src={cdn("Home/bts1.png")}
        alt="Jet black hand-stitched seam shirt"
        href="/product/jet-black-hand-stitched-seam-shirt"
        pre="the"
        title="Seam"
        sub="Hand stitched, by design"
        position="object-[22%_center] md:object-center"
      /> */}

      {/* <Spotlight items={spotlight} /> */}

      <InstagramFeed
        className="bg-transparent pb-16 md:pb-20"
        
      />

      {/* <BrandNote /> */}
    </div>
  );
}
