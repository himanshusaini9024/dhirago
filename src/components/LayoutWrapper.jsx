"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Announcement (36px) + header: mobile 56px / desktop 64px + nav ~36px
  // Always offset content below the fixed white header (11-11 style).
  // The home page banner starts at the top; the header only appears after scrolling.
  return (
    <main
      className={pathname === "/" ? "" : "pt-[72px] lg:pt-[120px]"}
      data-path={pathname}
    >
      {children}
    </main>
  );
}
