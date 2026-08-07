export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "function") {
    console.warn("Google Analytics not loaded");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};