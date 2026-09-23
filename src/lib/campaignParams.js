/**
 * Capture ad/campaign params from the landing URL.
 * Instagram/Facebook in-app browsers often strip referrers, so UTMs are required
 * for GA4 source/medium. Persist for the browser session.
 */
const STORAGE_KEY = "dhirago_campaign";

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "ttclid",
  "igshid",
];

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStored(params) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    /* ignore */
  }
}

export function captureCampaignParams(searchParams) {
  if (typeof window === "undefined") return {};

  const fromUrl = {};
  PARAM_KEYS.forEach((key) => {
    const value = searchParams?.get?.(key);
    if (value) fromUrl[key] = value;
  });

  if (Object.keys(fromUrl).length > 0) {
    writeStored(fromUrl);
    return fromUrl;
  }

  return readStored() || {};
}

export function buildPagePath(pathname, searchParams) {
  const query = searchParams?.toString?.() || "";
  return query ? `${pathname}?${query}` : pathname;
}

export function buildPageLocation(pathname, searchParams) {
  if (typeof window === "undefined") return pathname;
  return `${window.location.origin}${buildPagePath(pathname, searchParams)}`;
}
