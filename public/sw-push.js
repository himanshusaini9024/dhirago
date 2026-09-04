/* Native Web Push — works with tab closed / app in background / lock screen (supported devices) */

const DEFAULT_ICON = "https://images.dhirago.com/ecommerce/logo/logo.jpg";
const DEFAULT_URL = "https://dhirago.com";

self.addEventListener("install", (event) => {
  // Activate updated SW immediately so background push uses latest handler
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  // Browsers require a visible notification for push events while the site is closed.
  event.waitUntil(handlePush(event));
});

async function handlePush(event) {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = {
      title: "Dhirago",
      body: event.data ? event.data.text() : "You have a new notification.",
    };
  }

  const title = payload.title || "Dhirago";
  const options = {
    body: payload.body || "You have a new update from Dhirago.",
    icon: toAbsoluteUrl(payload.icon) || DEFAULT_ICON,
    badge: toAbsoluteUrl(payload.badge || payload.icon) || DEFAULT_ICON,
    // Keep notification until user interacts (better for lock screen / background)
    requireInteraction: false,
    renotify: true,
    tag: payload.tag || "dhirago-push",
    vibrate: [120, 60, 120],
    data: {
      url: payload.url || (payload.data && payload.data.url) || DEFAULT_URL,
    },
  };

  // Large banner (Chrome / Android)
  if (payload.image) {
    options.image = toAbsoluteUrl(payload.image);
  }

  await self.registration.showNotification(title, options);
}

function toAbsoluteUrl(value) {
  if (!value || typeof value !== "string") return null;
  if (/^https?:\/\//i.test(value)) return value;
  try {
    return new URL(value, self.registration.scope).href;
  } catch (e) {
    return value;
  }
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    (event.notification &&
      event.notification.data &&
      event.notification.data.url) ||
    DEFAULT_URL;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.navigate(url);
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
