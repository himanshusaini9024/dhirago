"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { enablePushNotifications } from "../../lib/pushNotification";

const ASKED_KEY = "dhirago_push_asked";
const ENABLED_KEY = "dhirago_push_enabled";

/**
 * Auto-asks the browser for notification permission (no profile button).
 * Also re-saves the subscription after login so customer_id is linked.
 */
export default function AutoPushPrompt() {
  const askedDefault = useRef(false);
  const lastLoginSync = useRef(false);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  // First visit: request permission if still default
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

    if (Notification.permission === "denied") {
      localStorage.setItem(ASKED_KEY, "1");
      return;
    }

    if (Notification.permission === "granted") {
      enablePushNotifications().then((result) => {
        if (result.success) localStorage.setItem(ENABLED_KEY, "1");
      });
      return;
    }

    // permission === default
    if (askedDefault.current || localStorage.getItem(ASKED_KEY) === "1") return;
    askedDefault.current = true;

    const timer = setTimeout(async () => {
      localStorage.setItem(ASKED_KEY, "1");
      const result = await enablePushNotifications();
      if (result.success) localStorage.setItem(ENABLED_KEY, "1");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // After login: re-save subscription so Laravel stores customer_id
  useEffect(() => {
    if (!isLoggedIn) {
      lastLoginSync.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (lastLoginSync.current) return;

    lastLoginSync.current = true;
    enablePushNotifications().then((result) => {
      if (result.success) localStorage.setItem(ENABLED_KEY, "1");
    });
  }, [isLoggedIn]);

  return null;
}
