"use client";

import { usePathname } from "next/navigation";
const TRANSPARENT_HERO_PAGES = [
  "/",
  "/pages/better-materials",
  "/embroidery",
  "/sustainability"
  // Add more hero pages here as needed, e.g.:
  // "/pages/why-dhirago",
  // "/about",
];
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHeroPage = TRANSPARENT_HERO_PAGES.includes(pathname);

  return (
    <main
      className={`
        ${
          isHeroPage
            ? "pt-0"
            : "pt-[60px] lg:pt-[80px]"
        }
      `}
    >
      {children}
    </main>
  );
}