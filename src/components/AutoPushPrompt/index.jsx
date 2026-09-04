"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { enablePushNotifications } from "../../lib/pushNotification";

const ASKED_KEY = "dhirago_push_asked";
const ENABLED_KEY = "dhirago_push_enabled";

/**
 * Auto-asks the browser for notification permission (no profile button).
 * Runs once per browser until the user allows or blocks.
 */
export default function AutoPushPrompt() {
  const ran = useRef(false);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (ran.current) return;
    if (typeof window === "undefined") return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

    // Already blocked — never ask again
    if (Notification.permission === "denied") {
      localStorage.setItem(ASKED_KEY, "1");
      return;
    }

    // Already granted — ensure subscription is saved (re-sync after login)
    if (Notification.permission === "granted") {
      ran.current = true;
      enablePushNotifications().then((result) => {
        if (result.success) {
          localStorage.setItem(ENABLED_KEY, "1");
        }
      });
      return;
    }

    // permission === 'default' — prompt the browser automatically
    if (localStorage.getItem(ASKED_KEY) === "1") return;

    ran.current = true;

    const timer = setTimeout(async () => {
      localStorage.setItem(ASKED_KEY, "1");
      const result = await enablePushNotifications();
      if (result.success) {
        localStorage.setItem(ENABLED_KEY, "1");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return null;
}
