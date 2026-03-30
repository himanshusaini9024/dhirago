"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  return (
    <main
      className={`
        ${
          pathname === "/"
            ? "pt-0"
            : "pt-[60px] lg:pt-[80px]"
        }
      `}
    >
      {children}
    </main>
  );
}