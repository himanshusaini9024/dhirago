import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by adminpanel after product create/update/delete.
 * Body: { secret, slug?, tags?: string[] }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const secret = body?.secret;
    const expected = process.env.REVALIDATE_SECRET;

    if (!expected || secret !== expected) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const tags = Array.isArray(body?.tags) ? body.tags : [];
    const slug = typeof body?.slug === "string" ? body.slug : null;

    const tagSet = new Set([
      "products",
      "categories",
      ...tags,
      ...(slug ? [`product-${slug}`] : []),
    ]);

    for (const tag of tagSet) {
      if (tag) revalidateTag(tag);
    }

    revalidatePath("/");
    revalidatePath("/collections", "layout");
    revalidatePath("/sitemap");
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap-pages.xml");
    revalidatePath("/sitemap-products.xml");
    revalidatePath("/sitemap-collections.xml");
    if (slug) {
      revalidatePath(`/product/${slug}`);
    }

    // Notify Bing/Yandex via IndexNow when key is configured (Google uses GSC)
    const indexNowKey = process.env.INDEXNOW_KEY;
    if (indexNowKey) {
      const siteUrl = (
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhirago.com"
      ).replace(/\/$/, "");
      const urls = [
        `${siteUrl}/`,
        `${siteUrl}/collections/shirts`,
        `${siteUrl}/sitemap.xml`,
        ...(slug ? [`${siteUrl}/product/${slug}`] : []),
      ];
      try {
        await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            host: new URL(siteUrl).host,
            key: indexNowKey,
            keyLocation: `${siteUrl}/${indexNowKey}.txt`,
            urlList: urls,
          }),
        });
      } catch {
        /* non-blocking */
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: [...tagSet],
      slug,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Revalidate failed" },
      { status: 500 },
    );
  }
}
