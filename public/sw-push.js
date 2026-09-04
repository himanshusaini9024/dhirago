/* Native Web Push — rich notification (title, body, icon, large image) */

self.addEventListener("push", (event) => {
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
    body: payload.body || "You have a new notification.",
    icon: payload.icon || "/images/logo/logo.gif",
    badge: payload.badge || payload.icon || "/images/logo/logo.gif",
    data: {
      url: payload.url || (payload.data && payload.data.url) || "https://dhirago.com",
    },
  };

  // Large banner image (Chrome / Android — Meesho-style expanded notification)
  if (payload.image) {
    options.image = payload.image;
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    (event.notification &&
      event.notification.data &&
      event.notification.data.url) ||
    "https://dhirago.com";

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
