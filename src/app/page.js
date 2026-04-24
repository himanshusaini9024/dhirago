"use client";
import AnnouncementBar from "../components/Dhirago/AnnouncementBar";
import Navbar from "../components/Dhirago/Navbar";
import HeroSection from "../components/Dhirago/HeroSection";
import MarqueeSection from "../components/Dhirago/MarqueeSection";
import FeaturedProducts from "../components/Dhirago/FeaturedProducts";
import EditorialSection from "../components/Dhirago/EditorialSection";
import CollectionsSlider from "../components/Dhirago/CollectionsSlider";
import BrandStatement from "../components/Dhirago/BrandStatement";
import ReviewsSection from "../components/Dhirago/ReviewsSection";
import StyleCraftedSection from "../components/Dhirago/StyleCraftedSection";
import TrendingStyles from "../components/Dhirago/TrendingStyles";
import BestSellers from "../components/Dhirago/BestSellers";
import VideoSection from "../components/Dhirago/VideoSection";
import FAQSection from "../components/Dhirago/FAQSection";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <AnnouncementBar />
      {/* <Navbar /> */}
      <HeroSection />
      <MarqueeSection text="STYLE • LUXURY • FOREVER • ELEGANCE" />
      <FeaturedProducts />
      <EditorialSection />
      <CollectionsSlider />
      <BrandStatement />
      <ReviewsSection />
      <StyleCraftedSection />
      <TrendingStyles />
      <BestSellers />
      <VideoSection />
      <FAQSection />
      <MarqueeSection text="Your Favorite Styles at Unbeatable Prices!" dark slow />
      {/* <Footer /> */}
    </main>
  );
}
