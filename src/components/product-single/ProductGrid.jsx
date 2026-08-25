"use client";

import { useEffect, useState } from "react";
import Gallery from "./gallery";
import Content from "./content";
import VirtualTryOn from "../../components/VirtualTryOn/VirtualTryOn";

export default function ProductGrid({ product }) {
  const [showTryOn, setShowTryOn] = useState(false);

  // clip allows sticky; existing global overflow-x:hidden breaks it
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;
    html.style.overflowX = "clip";
    body.style.overflowX = "clip";
    return () => {
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
    };
  }, []);

  return (
    <div
      data-pdp-grid
      className="flex w-full flex-col md:mx-auto md:grid md:max-w-[1280px] md:grid-cols-[minmax(0,1fr)_360px] md:items-start md:justify-center md:gap-10 md:px-6 md:pt-20 lg:grid-cols-[minmax(0,850px)_380px] lg:gap-20"
    >
      <div className="w-full min-w-0">
        <Gallery images={product.images} />
      </div>
      <div
        data-pdp-content
        className="w-full border-t border-[#e0ddd6] px-4 pt-5 md:sticky md:top-32 md:h-[calc(100vh-140px)] md:max-h-[calc(100vh-140px)] md:min-h-0 md:self-start md:overflow-x-hidden md:overflow-y-auto md:overscroll-contain md:border-t-0 md:px-0 md:pt-2 md:pb-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          type="button"
          onClick={() => setShowTryOn(true)}
          className="mb-4 w-full rounded-full border border-[#1a1a1a] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] transition-colors hover:bg-black hover:text-white"
        >
          Virtual Try-On
        </button>
        <Content product={product} />
      </div>
      {showTryOn && (
        <VirtualTryOn
          shirtImage={product.images}
          tryOnCutout={
            product?.slug
              ? `/tryon/${product.slug}.png`
              : undefined
          }
          onClose={() => setShowTryOn(false)}
        />
      )}
    </div>
  );
}
