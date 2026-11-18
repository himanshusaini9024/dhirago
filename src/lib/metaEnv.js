/**
 * Keep local / LAN traffic out of the production Meta dataset.
 * - Private hosts: do not load the browser Pixel.
 * - CAPI: only send when META_TEST_EVENT_CODE is set (Events Manager → Test events).
 * - Production (dhirago.com): always send normally; never attach a leftover test code.
 */

const PRIVATE_HOST_RE =
  /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/i;

export function hostnameFromUrl(value) {
  if (!value || typeof value !== "string") return "";
  try {
    return new URL(value).hostname;
  } catch {
    return "";
  }
}

export function isPrivateHostname(hostname) {
  if (!hostname) return false;
  const host = String(hostname).trim().toLowerCase().replace(/\.$/, "");
  return PRIVATE_HOST_RE.test(host);
}

export function isPrivateUrl(value) {
  return isPrivateHostname(hostnameFromUrl(value));
}

/** True when this runtime should not feed the live Meta dataset. */
export function isMetaNonProductionContext(eventSourceUrl) {
  if (process.env.META_FORCE_PRODUCTION === "1") return false;
  if (process.env.META_FORCE_NON_PRODUCTION === "1") return true;

  if (isPrivateUrl(eventSourceUrl)) return true;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (isPrivateUrl(siteUrl)) return true;

  if (typeof window !== "undefined" && isPrivateHostname(window.location.hostname)) {
    return true;
  }

  // Local `next dev` without a private SITE_URL still must not pollute prod.
  if (process.env.NODE_ENV !== "production") return true;

  return false;
}

export function getMetaTestEventCode() {
  const code = String(process.env.META_TEST_EVENT_CODE || "").trim();
  return code || null;
}

/**
 * Browser Pixel may load only in production contexts.
 * Local/LAN never loads the live pixel (CAPI test code does not apply to fbq).
 */
export function shouldLoadMetaPixel() {
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) return false;
  return !isMetaNonProductionContext();
}

/**
 * Whether this process may POST to Meta CAPI.
 * - Production host + public event URL: send live (never attach test code).
 * - Private/LAN event URL on a production deployment: block (local UI → prod API).
 * - Local/dev runtime: require META_TEST_EVENT_CODE (Test events only).
 */
export function shouldSendMetaCapi(eventSourceUrl) {
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID || !process.env.META_ACCESS_TOKEN) {
    return { ok: false, reason: "not_configured" };
  }

  if (process.env.META_FORCE_PRODUCTION === "1") {
    return { ok: true, testEventCode: null, nonProduction: false };
  }

  const privateSource = isPrivateUrl(eventSourceUrl);
  const runtimeNonProd =
    process.env.META_FORCE_NON_PRODUCTION === "1" ||
    isPrivateUrl(process.env.NEXT_PUBLIC_SITE_URL || "") ||
    process.env.NODE_ENV !== "production";

  if (!runtimeNonProd && privateSource) {
    return { ok: false, reason: "private_event_source_blocked_on_production" };
  }

  if (runtimeNonProd || privateSource) {
    const testCode = getMetaTestEventCode();
    if (!testCode) {
      return { ok: false, reason: "non_production_requires_test_event_code" };
    }
    return { ok: true, testEventCode: testCode, nonProduction: true };
  }

  return { ok: true, testEventCode: null, nonProduction: false };
}
