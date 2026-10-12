export const CART_DRAWER_EVENT = "dhirago:cart-drawer";

export function openCartDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CART_DRAWER_EVENT, { detail: { open: true } }));
}
