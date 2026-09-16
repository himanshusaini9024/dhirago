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
    if (slug) {
      revalidatePath(`/product/${slug}`);
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
