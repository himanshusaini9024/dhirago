"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoginPopup from "../../components/loginpopup/index";

const POPUP_COUNT_KEY = "popupCount";
const MAX_POPUP_SHOWS = 2;
const SCROLL_TRIGGER_Y = 300;
const OPEN_DELAY_MS = 500;

function readPopupCount() {
  if (typeof window === "undefined") return 0;
  const value = parseInt(localStorage.getItem(POPUP_COUNT_KEY) || "0", 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function writePopupCount(count) {
  localStorage.setItem(POPUP_COUNT_KEY, String(count));
}

export function clearLoginPopupCount() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(POPUP_COUNT_KEY);
}

export default function PopupProvider({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedInRef = useRef(isLoggedIn);
  const wasLoggedIn = useRef(isLoggedIn);
  const showPopupRef = useRef(showPopup);
  const hasTriggeredRef = useRef(hasTriggered);

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    showPopupRef.current = showPopup;
  }, [showPopup]);

  useEffect(() => {
    hasTriggeredRef.current = hasTriggered;
  }, [hasTriggered]);

  // Close when logged in; clear count + reset state after logout
  useEffect(() => {
    if (isLoggedIn) {
      setShowPopup(false);
      setHasTriggered(false);
    } else if (wasLoggedIn.current && !isLoggedIn) {
      clearLoginPopupCount();
      setHasTriggered(false);
      setShowPopup(false);
    }
    wasLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  // Show popup up to 2 times on scroll (guests only)
  useEffect(() => {
    if (isLoggedIn) return undefined;

    const handleScroll = () => {
      if (isLoggedInRef.current) return;

      const popupCount = readPopupCount();
      if (
        popupCount >= MAX_POPUP_SHOWS ||
        hasTriggeredRef.current ||
        showPopupRef.current ||
        window.scrollY <= SCROLL_TRIGGER_Y
      ) {
        return;
      }

      setHasTriggered(true);
      window.setTimeout(() => {
        if (isLoggedInRef.current) return;

        const latestCount = readPopupCount();
        if (latestCount >= MAX_POPUP_SHOWS) return;

        setShowPopup(true);
        writePopupCount(latestCount + 1);
      }, OPEN_DELAY_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn]);

  const handleClose = () => {
    setShowPopup(false);

    // Allow another scroll-trigger if under the max
    const popupCount = readPopupCount();
    if (!isLoggedInRef.current && popupCount < MAX_POPUP_SHOWS) {
      setHasTriggered(false);
    }
  };

  return (
    <>
      {children}
      {!isLoggedIn && (
        <LoginPopup isOpen={showPopup} onClose={handleClose} />
      )}
    </>
  );
}
