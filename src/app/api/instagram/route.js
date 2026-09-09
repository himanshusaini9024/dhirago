import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Instagram access token missing" },
        { status: 500 },
      );
    }

    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{media_url,media_type,thumbnail_url}",
    ].join(",");

    const mediaUrl =
      `https://graph.instagram.com/v26.0/me/media` +
      `?fields=${fields}` +
      `&limit=12` +
      `&access_token=${accessToken}`;

    const profileUrl =
      `https://graph.instagram.com/v26.0/me` +
      `?fields=username,account_type,media_count` +
      `&access_token=${accessToken}`;

    const [mediaRes, profileRes] = await Promise.all([
      fetch(mediaUrl, { next: { revalidate: 3600 } }),
      fetch(profileUrl, { next: { revalidate: 3600 } }),
    ]);

    if (!mediaRes.ok) {
      const error = await mediaRes.json().catch(() => ({}));
      console.error("Instagram API error:", error);
      return NextResponse.json(
        { error: "Failed to fetch Instagram posts" },
        { status: mediaRes.status },
      );
    }

    const data = await mediaRes.json();
    const profile = profileRes.ok ? await profileRes.json() : {};

    return NextResponse.json({
      posts: data.data || [],
      profile: {
        username: profile.username || "dhirago_",
      },
    });
  } catch (error) {
    console.error("Instagram error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
