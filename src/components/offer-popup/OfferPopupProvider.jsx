"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import OfferPopup from "./index";

const OFFER_SEEN_KEY = "dhirago_offer_popup_seen";
const SCROLL_TRIGGER_Y = 280;
const OPEN_DELAY_MS = 650;

const BLOCKED_PATHS = ["/checkout", "/cart", "/success", "/account"];

function hasSeenOffer() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(OFFER_SEEN_KEY) === "1";
}

function markOfferSeen() {
  try {
    localStorage.setItem(OFFER_SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export default function OfferPopupProvider({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);

  const pathBlocked = BLOCKED_PATHS.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`),
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    markOfferSeen();
  }, []);

  useEffect(() => {
    if (pathBlocked || hasSeenOffer() || triggeredRef.current) return undefined;

    const handleScroll = () => {
      if (
        triggeredRef.current ||
        hasSeenOffer() ||
        window.scrollY <= SCROLL_TRIGGER_Y
      ) {
        return;
      }

      triggeredRef.current = true;
      window.setTimeout(() => {
        if (hasSeenOffer()) return;
        markOfferSeen();
        setOpen(true);
      }, OPEN_DELAY_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathBlocked, pathname]);

  return (
    <>
      {children}
      <OfferPopup isOpen={open} onClose={handleClose} />
    </>
  );
}
