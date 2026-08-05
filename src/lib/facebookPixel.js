export const fbEvent = (event, data = {}) => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", event, data);
  }
};