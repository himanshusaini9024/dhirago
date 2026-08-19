const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FETCH_TIMEOUT_MS = 8000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCategoryProducts(slug) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/category/${slug}`, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Category fetch error:", error.message);
    return { category: [], catbanner: null, catbanner_mobile: null };
  }
}
