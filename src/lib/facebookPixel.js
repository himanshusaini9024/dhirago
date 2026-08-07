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