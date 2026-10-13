import { createHash } from "crypto";
import { NextResponse } from "next/server";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

// Purchase is sent by the Laravel backend after the order is saved, never from here,
// so nobody can post fake purchases through this public endpoint.
const ALLOWED_EVENTS = new Set(["ViewContent", "AddToCart", "InitiateCheckout"]);
const CUSTOM_DATA_KEYS = [
  "value",
  "currency",
  "content_ids",
  "content_name",
  "content_type",
  "contents",
  "num_items",
];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const hashed = (value, normalize) => {
  if (!value) return undefined;
  const v = normalize(String(value));
  if (!v) return undefined;
  return /^[a-f0-9]{64}$/.test(v) ? v : sha256(v);
};

const normalizeEmail = (v) => v.trim().toLowerCase();
const normalizePhone = (v) => {
  let digits = v.replace(/\D+/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.length === 10 ? `91${digits}` : digits;
};

export async function POST(req) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ success: false, error: "Meta CAPI not configured" }, { status: 503 });
  }

  let input;
  try {
    const body = await req.json();
    input = Array.isArray(body?.data) ? body.data[0] : body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!input || !ALLOWED_EVENTS.has(input.event_name)) {
    return NextResponse.json({ success: false, error: "Event not allowed" }, { status: 400 });
  }

  const customData = {};
  for (const key of CUSTOM_DATA_KEYS) {
    if (input.custom_data?.[key] !== undefined) customData[key] = input.custom_data[key];
  }

  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const userData = {
    client_ip_address:
      req.headers.get("cf-connecting-ip") ||
      forwardedFor.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined,
    client_user_agent: req.headers.get("user-agent") || undefined,
    fbp: req.cookies.get("_fbp")?.value,
    fbc: req.cookies.get("_fbc")?.value,
    em: hashed(input.user_data?.em, normalizeEmail),
    ph: hashed(input.user_data?.ph, normalizePhone),
  };
  Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k]);

  const event = {
    event_name: input.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: typeof input.event_id === "string" ? input.event_id.slice(0, 100) : undefined,
    action_source: "website",
    event_source_url:
      typeof input.event_source_url === "string" ? input.event_source_url.slice(0, 500) : req.headers.get("referer") || undefined,
    user_data: userData,
    custom_data: customData,
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v23.0/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [event],
        access_token: ACCESS_TOKEN,
        ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result?.error?.message || result);
    }

    return NextResponse.json(
      { success: response.ok, events_received: result?.events_received },
      { status: response.ok ? 200 : 502 },
    );
  } catch (error) {
    console.error("Meta CAPI error:", error);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
