"use client";

import { useRef, useState } from "react";

// ── Config ──────────────────────────────────────────────────────────
const VIDEO_URL =
  "https://pub-f4b2c7f0b6174bbdb5e18f57a2251298.r2.dev/ecommerce/Home/homefooter.mp4";

// Aspect ratio of the source video. This is what controls the black
// pillar bars: if the video is narrower than the screen (e.g. a
// vertical/portrait clip at 9/16), black bars fill the remaining
// left/right space automatically.
const VIDEO_ASPECT_RATIO = "16 / 8";

export default function ProductsFeatured() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // All layout-critical styling is inline on purpose — this guarantees
  // full-height, full-width, centered rendering with black pillar bars
  // no matter how the host project's Tailwind (or other CSS) is
  // configured, since inline styles can't be dropped by a purge step.
  return (
    <div
      className="mt-10"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        // backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: VIDEO_ASPECT_RATIO,
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          controls={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            border: "none",
            display: "block",
          }}
        />
      </div>

      {/* Mute / unmute control */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.94 8.94 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  );
}