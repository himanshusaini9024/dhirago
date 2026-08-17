"use client";

import { useEffect } from "react";
import Gallery from "./gallery";
import Content from "./content";

export default function ProductGrid({ product }) {
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
        className="w-full border-t border-[#e0ddd6] px-4 pt-5 md:sticky md:top-32 md:h-[calc(100vh-140px)] md:max-h-[calc(100vh-140px)] md:min-h-0 md:self-start md:overflow-x-hidden md:overflow-y-auto md:overscroll-contain md:border-t-0 md:px-0 md:pt-2 md:pb-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <Content product={product} />
      </div>
    </div>
  );
}
