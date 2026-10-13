export const newEventId = (prefix = "evt") =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;

export const fbEvent = (event, data = {}, eventID = null) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (eventID) {
      window.fbq("track", event, data, {
        eventID,
      });
    } else {
      window.fbq("track", event, data);
    }
  }
};

const readCookie = (name) => {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie.split("; ").find((r) => r.startsWith(`${name}=`));
  return row ? decodeURIComponent(row.split("=").slice(1).join("=")) : undefined;
};

/**
 * Pixel browser ids, sent with the order so the backend's server-side Purchase can be
 * matched to the same person (the API is on another domain and can't read these cookies).
 */
export const getMetaBrowserIds = () => ({
  fbp: readCookie("_fbp"),
  fbc: readCookie("_fbc"),
  event_source_url:
    typeof window !== "undefined" ? window.location.href : undefined,
});
