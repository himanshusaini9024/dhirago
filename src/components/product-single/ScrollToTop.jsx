"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Product pages must open at the top. Without this, growing gallery height
 * (image load) can trigger browser scroll-anchoring and land you on the footer.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevRestoration = window.history.scrollRestoration;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    const html = document.documentElement;
    const prevAnchor = html.style.overflowAnchor;
    html.style.overflowAnchor = "none";

    const jump = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jump();
    const t1 = requestAnimationFrame(jump);
    const t2 = setTimeout(jump, 50);
    const t3 = setTimeout(jump, 300);

    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      html.style.overflowAnchor = prevAnchor;
      try {
        window.history.scrollRestoration = prevRestoration || "auto";
      } catch {
        /* ignore */
      }
    };
  }, [pathname]);

  return null;
}
