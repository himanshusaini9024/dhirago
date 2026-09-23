"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  buildPageLocation,
  buildPagePath,
  captureCampaignParams,
} from "../lib/campaignParams";

/**
 * SPA page tracking for GTM: stores UTMs and pushes page_view on client navigations.
 * Skips first load (GTM Google Tag already handles it).
 */
export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    captureCampaignParams(searchParams);

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const pagePath = buildPagePath(pathname, searchParams);
    const pageLocation = buildPageLocation(pathname, searchParams);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: pageLocation,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
