"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const normalizeSize = (size) => String(size ?? "").trim().toUpperCase();

export const stockKey = (id, size) => `${id}|${normalizeSize(size)}`;

/**
 * Ask the API whether every cart line can be fulfilled right now.
 * Returns null when the check itself fails; the order API still validates stock.
 */
export async function checkCartStock(cartItems) {
  const items = (cartItems || [])
    .filter((item) => item?.id && Number(item.quantity) > 0)
    .map((item) => ({
      id: item.id,
      size: item.size ? String(item.size) : null,
      quantity: Number(item.quantity),
      name: item.name || null,
    }));

  if (!items.length) return { ok: true, lines: {} };

  try {
    const res = await fetch(`${API_URL}/api/cart/stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ items }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();

    const lines = {};
    for (const line of data.items || []) {
      lines[stockKey(line.product_id, line.size)] = line;
    }
    return { ok: Boolean(data.ok), lines };
  } catch {
    return null;
  }
}

/** Stock line for a cart item; one-size products are keyed with an empty size. */
export function lineFor(stock, item) {
  if (!stock?.lines) return null;
  return stock.lines[stockKey(item.id, item.size)] || stock.lines[stockKey(item.id, "")] || null;
}

export function stockProblem(line) {
  if (!line || line.ok) return null;
  if (line.missing) return "No longer available. Please remove it to continue.";
  if (line.available <= 0) return "Out of stock. Please remove it to continue.";
  return `Only ${line.available} left. Please reduce the quantity.`;
}

/**
 * Live stock status for the cart. Re-checks when the cart changes and when the
 * tab regains focus, so stock updated in the admin shows up without a reload.
 */
export function useCartStock(cartItems) {
  const [checked, setChecked] = useState({ key: null, stock: null });
  const itemsRef = useRef(cartItems);
  const requestId = useRef(0);

  const cartKey = (cartItems || [])
    .map((item) => `${stockKey(item.id, item.size)}x${item.quantity}`)
    .join(",");
  const keyRef = useRef(cartKey);

  useEffect(() => {
    itemsRef.current = cartItems;
    keyRef.current = cartKey;
  }, [cartItems, cartKey]);

  const recheck = useCallback(async () => {
    const id = ++requestId.current;
    const key = keyRef.current;
    const result = await checkCartStock(itemsRef.current);
    if (id === requestId.current) setChecked({ key, stock: result });
    return result;
  }, []);

  useEffect(() => {
    recheck();
  }, [cartKey, recheck]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") recheck();
    };
    window.addEventListener("focus", recheck);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", recheck);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [recheck]);

  const checking = checked.key !== cartKey;
  const stock = checked.stock;
  const blocked = Boolean(!checking && stock && !stock.ok);

  return { stock, checking, blocked, recheck };
}
