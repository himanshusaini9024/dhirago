"use client";

/**
 * Keeps the old export surface for layout, but no longer auto-opens
 * the register/login popup on scroll. Login opens only from profile /
 * checkout (header LoginDrawer, cart drawer, etc.).
 */
export function clearLoginPopupCount() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("popupCount");
  } catch {
    /* ignore */
  }
}

export default function PopupProvider({ children }) {
  return children;
}
