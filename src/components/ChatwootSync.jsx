"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

function waitForChatwoot(timeoutMs = 15000) {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.$chatwoot?.hasLoaded) {
      resolve(window.$chatwoot);
      return;
    }

    const started = Date.now();
    const onReady = () => {
      window.removeEventListener("chatwoot:ready", onReady);
      resolve(window.$chatwoot);
    };
    window.addEventListener("chatwoot:ready", onReady);

    const timer = setInterval(() => {
      if (window.$chatwoot?.hasLoaded) {
        clearInterval(timer);
        window.removeEventListener("chatwoot:ready", onReady);
        resolve(window.$chatwoot);
      } else if (Date.now() - started > timeoutMs) {
        clearInterval(timer);
        window.removeEventListener("chatwoot:ready", onReady);
        resolve(null);
      }
    }, 250);
  });
}

function orderIdFromPath(pathname = "") {
  const match = pathname.match(/\/(?:account\/)?orders?\/([^/?#]+)/i)
    || pathname.match(/\/return\/([^/?#]+)/i);
  return match?.[1] || null;
}

export default function ChatwootSync() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const chatwoot = await waitForChatwoot();
      if (cancelled || !chatwoot) return;

      if (isLoggedIn && user) {
        const identifier = String(
          user.id || user._id || user.email || user.phone || "",
        );
        if (identifier) {
          chatwoot.setUser(identifier, {
            name: user.name || user.fullName || user.firstName || "Customer",
            email: user.email || "",
            phone_number: user.phone || user.phoneNumber || "",
            avatar_url: user.avatar || user.profileImage || "",
          });
        }

        const attrs = {
          store: "Dhirago",
          customer_id: String(user.id || user._id || ""),
        };
        const orderId = orderIdFromPath(pathname);
        if (orderId) attrs.order_id = orderId;
        chatwoot.setCustomAttributes(attrs);
      } else {
        chatwoot.reset();
        const orderId = orderIdFromPath(pathname);
        if (orderId) {
          chatwoot.setCustomAttributes({
            store: "Dhirago",
            order_id: orderId,
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isLoggedIn, pathname]);

  return null;
}
