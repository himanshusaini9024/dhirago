// Browsing events (ViewContent, AddToCart, InitiateCheckout) to Meta's Conversions API via
// our server route. Purchase is sent by the backend. Never throws or blocks the UI.
export const sendMetaEvent = (event) => {
  if (typeof window === "undefined") return;
  fetch("/api/meta/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...event,
      event_source_url: event.event_source_url || window.location.href,
    }),
    keepalive: true,
  }).catch(() => {});
};
