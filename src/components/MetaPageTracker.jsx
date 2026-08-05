"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MetaPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}