"use client";

import api from "./api";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * Ask browser for notification permission + save Web Push subscription.
 * After this, Laravel can push even when the Dhirago tab is closed.
 */
export async function enablePushNotifications() {
  try {
    if (
      typeof window === "undefined" ||
      !("Notification" in window) ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window)
    ) {
      return {
        success: false,
        message: "Push notifications are not supported in this browser.",
      };
    }

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      return {
        success: false,
        message: "Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY in .env.local",
      };
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return {
        success: false,
        message: "Notification permission denied.",
      };
    }

    // Register SW at site root so it stays active with tabs closed
    const registration = await navigator.serviceWorker.register("/sw-push.js", {
      scope: "/",
      updateViaCache: "none",
    });

    // Ensure an active worker is controlling / ready for background push
    if (registration.installing) {
      await new Promise((resolve) => {
        registration.installing.addEventListener("statechange", function onChange() {
          if (this.state === "activated") {
            this.removeEventListener("statechange", onChange);
            resolve();
          }
        });
      });
    }

    await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // userVisibleOnly: true is required — push must show a visible notification
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    }

    const json = subscription.toJSON();

    await api.post("/push-tokens", {
      endpoint: json.endpoint,
      keys: {
        p256dh: json.keys?.p256dh,
        auth: json.keys?.auth,
      },
      browser: navigator.userAgent,
    });

    return {
      success: true,
      endpoint: json.endpoint,
      message: "Push notifications enabled for background delivery.",
    };
  } catch (error) {
    console.error("Push notification error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Push setup failed.",
    };
  }
}
