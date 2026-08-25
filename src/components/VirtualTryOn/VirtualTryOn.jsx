"use client";

/**
 * Virtual Try-On — body-fitted shirt (torso + sleeves).
 *
 * Uses MediaPipe pose to place the garment cutout on the chest and along
 * the arms. Fast strip-warp (not a heavy triangle mesh) so it stays smooth
 * and does not collapse into a spike.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

const WASM_URL = "/mediapipe/wasm";
const POSE_MODEL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

const L_SHOULDER = 11;
const R_SHOULDER = 12;
const L_ELBOW = 13;
const R_ELBOW = 14;
const L_WRIST = 15;
const R_WRIST = 16;
const L_HIP = 23;
const R_HIP = 24;

function resolveAbsoluteShirtUrl(shirtImage, tryOnCutout) {
  if (tryOnCutout) return tryOnCutout;
  if (!shirtImage) return "";
  if (typeof shirtImage === "string") {
    return shirtImage.startsWith("http") || shirtImage.startsWith("/")
      ? shirtImage
      : `${process.env.NEXT_PUBLIC_IMG_URL || ""}${shirtImage}`;
  }
  const list = Array.isArray(shirtImage) ? shirtImage : [shirtImage];
  const preferred =
    list.find((img) => /front/i.test(String(img?.type || ""))) ||
    list.find((img) => img?.url) ||
    list[0];
  const path = preferred?.url || "";
  if (!path) return "";
  return path.startsWith("http") || path.startsWith("/")
    ? path
    : `${process.env.NEXT_PUBLIC_IMG_URL || ""}${path}`;
}

function toLoadUrl(absoluteUrl) {
  if (!absoluteUrl) return "";
  if (absoluteUrl.startsWith("/")) return absoluteUrl;
  return `/api/proxy-image?url=${encodeURIComponent(absoluteUrl)}`;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothPt(prev, next, t = 0.55) {
  if (!prev) return { x: next.x, y: next.y };
  return {
    x: lerp(prev.x, next.x, t),
    y: lerp(prev.y, next.y, t),
  };
}

function isStudioBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return (max > 230 && sat < 0.1) || (max > 210 && sat < 0.06);
}

function isSkinTone(r, g, b) {
  return (
    r > 90 &&
    g > 40 &&
    b > 20 &&
    r > g &&
    r > b &&
    Math.abs(r - g) > 12 &&
    r - b > 12
  );
}

/** Crop opaque garment bounds and clean background. */
async function loadGarmentImage(url, { dedicatedCutout = false } = {}) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Image fetch failed (${res.status})`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);

  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode garment image"));
      el.src = objectUrl;
    });

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;
    const full = document.createElement("canvas");
    full.width = srcW;
    full.height = srcH;
    const fctx = full.getContext("2d", { willReadFrequently: true });
    fctx.drawImage(img, 0, 0);

    const imageData = fctx.getImageData(0, 0, srcW, srcH);
    const data = imageData.data;
    let minX = srcW;
    let minY = srcH;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < srcH; y++) {
      for (let x = 0; x < srcW; x++) {
        const i = (y * srcW + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        let a = data[i + 3] / 255;
        if (a < 0.02) {
          data[i + 3] = 0;
          continue;
        }
        if (isStudioBackground(r, g, b)) a = 0;
        else if (!dedicatedCutout && isSkinTone(r, g, b)) a = 0;
        else if (dedicatedCutout && r < 14 && g < 14 && b < 14) a = 0;
        data[i + 3] = Math.round(a * 255);
        if (a > 0.15) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    fctx.putImageData(imageData, 0, 0);

    if (maxX <= minX || maxY <= minY) {
      return { canvas: full, objectUrl };
    }

    // Pad slightly so we don't clip fabric edges
    const pad = 4;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(srcW - 1, maxX + pad);
    maxY = Math.min(srcH - 1, maxY + pad);

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    canvas.getContext("2d").drawImage(
      full,
      minX,
      minY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH,
    );

    return { canvas, objectUrl };
  } catch (err) {
    URL.revokeObjectURL(objectUrl);
    throw err;
  }
}

async function createPoseLandmarker(delegate) {
  const vision = await FilesetResolver.forVisionTasks(WASM_URL);
  return PoseLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: POSE_MODEL, delegate },
    runningMode: "VIDEO",
    numPoses: 1,
    minPoseDetectionConfidence: 0.45,
    minPosePresenceConfidence: 0.45,
    minTrackingConfidence: 0.45,
  });
}

/** MediaPipe → mirrored canvas pixels */
function toPx(p, w, h) {
  return { x: (1 - p.x) * w, y: p.y * h };
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function mid(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Warp a rectangular source region onto a destination quad using vertical strips.
 * Fast and stable — no collapsing mesh.
 */
function drawTexturedQuad(ctx, img, src, dst, strips = 10) {
  const { sx, sy, sw, sh } = src;
  const { tl, tr, bl, br } = dst;
  if (sw < 2 || sh < 2) return;

  for (let i = 0; i < strips; i++) {
    const t0 = i / strips;
    const t1 = (i + 1) / strips;

    const srcY0 = sy + sh * t0;
    const srcH = Math.max(1, sh / strips + 0.5);

    // Top edge of strip on dest
    const left0 = { x: lerp(tl.x, bl.x, t0), y: lerp(tl.y, bl.y, t0) };
    const right0 = { x: lerp(tr.x, br.x, t0), y: lerp(tr.y, br.y, t0) };
    const left1 = { x: lerp(tl.x, bl.x, t1), y: lerp(tl.y, bl.y, t1) };
    const right1 = { x: lerp(tr.x, br.x, t1), y: lerp(tr.y, br.y, t1) };

    const midL = mid(left0, left1);
    const midR = mid(right0, right1);
    const width = dist(midL, midR);
    const height = Math.max(dist(left0, left1), dist(right0, right1));
    if (width < 1 || height < 1) continue;

    const angle = Math.atan2(midR.y - midL.y, midR.x - midL.x);
    const cx = (midL.x + midR.x) / 2;
    const cy = (midL.y + midR.y) / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.drawImage(
      img,
      sx,
      srcY0,
      sw,
      srcH,
      -width / 2,
      -height / 2,
      width,
      height,
    );
    ctx.restore();
  }
}

/** Draw sleeve strip along shoulder → elbow → wrist */
function drawSleeveAlongArm(ctx, img, src, shoulder, elbow, wrist, thickness) {
  const segments = [
    [shoulder, elbow],
    [elbow, { x: lerp(elbow.x, wrist.x, 0.65), y: lerp(elbow.y, wrist.y, 0.65) }],
  ];

  const { sx, sy, sw, sh } = src;
  let drawn = 0;
  const totalLen =
    dist(shoulder, elbow) +
    dist(elbow, { x: lerp(elbow.x, wrist.x, 0.65), y: lerp(elbow.y, wrist.y, 0.65) });
  if (totalLen < 8) return;

  for (const [a, b] of segments) {
    const len = dist(a, b);
    if (len < 4) continue;
    const t0 = drawn / totalLen;
    const t1 = (drawn + len) / totalLen;
    drawn += len;

    const srcY = sy + sh * t0;
    const srcH = Math.max(1, sh * (t1 - t0));
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    // Source is vertical sleeve; rotate so fabric runs along arm (local +X)
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(
      img,
      sx,
      srcY,
      sw,
      srcH,
      -thickness / 2,
      -len / 2,
      thickness,
      len,
    );
    ctx.restore();
  }
}

export default function VirtualTryOn({ shirtImage, tryOnCutout, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);
  const runningRef = useRef(false);
  const garmentRef = useRef(null);
  const objectUrlRef = useRef(null);
  const smoothRef = useRef(null);
  const hintRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("");
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");

  const absoluteShirtUrl = resolveAbsoluteShirtUrl(shirtImage, tryOnCutout);
  const isDedicatedCutout = Boolean(tryOnCutout);

  const updateHint = useCallback((next) => {
    if (hintRef.current === next) return;
    hintRef.current = next;
    setHint(next);
  }, []);

  const stopEverything = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    try {
      poseRef.current?.close();
    } catch (_) {
      /* ignore */
    }
    poseRef.current = null;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    garmentRef.current = null;
    smoothRef.current = null;
    lastTsRef.current = 0;
    hintRef.current = "";
    setStarted(false);
    setHint("");
  }, []);

  useEffect(() => () => stopEverything(), [stopEverything]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        stopEverything();
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, stopEverything]);

  const drawGarment = useCallback((ctx, w, h, landmarks) => {
    const img = garmentRef.current;
    if (!img) return false;

    const need = [
      L_SHOULDER,
      R_SHOULDER,
      L_ELBOW,
      R_ELBOW,
      L_WRIST,
      R_WRIST,
      L_HIP,
      R_HIP,
    ];
    const raw = {};
    for (const id of need) {
      const p = landmarks[id];
      if (!p || (p.visibility != null && p.visibility < 0.3)) return false;
      raw[id] = toPx(p, w, h);
    }

    const prev = smoothRef.current;
    const s = {};
    for (const id of need) s[id] = smoothPt(prev?.[id], raw[id]);
    smoothRef.current = s;

    // After mirror: MediaPipe L appears on canvas-right, R on canvas-left.
    // Screen-left shoulder (visual) = person's right = R_SHOULDER
    const shoulderL = s[R_SHOULDER]; // visual left
    const shoulderR = s[L_SHOULDER]; // visual right
    const elbowL = s[R_ELBOW];
    const elbowR = s[L_ELBOW];
    const wristL = s[R_WRIST];
    const wristR = s[L_WRIST];
    const hipL = s[R_HIP];
    const hipR = s[L_HIP];

    const shoulderMid = mid(shoulderL, shoulderR);
    const hipMid = mid(hipL, hipR);
    const shoulderW = dist(shoulderL, shoulderR);
    const torsoH = dist(shoulderMid, hipMid);
    if (shoulderW < 28 || torsoH < 36) return false;

    // Expand slightly past landmarks so fabric covers body
    const outX = shoulderW * 0.18;
    const upY = shoulderW * 0.12;
    const downY = torsoH * 0.22;

    const tl = {
      x: shoulderL.x - outX,
      y: shoulderL.y - upY,
    };
    const tr = {
      x: shoulderR.x + outX,
      y: shoulderR.y - upY,
    };
    const bl = {
      x: hipL.x - outX * 0.7,
      y: hipL.y + downY,
    };
    const br = {
      x: hipR.x + outX * 0.7,
      y: hipR.y + downY,
    };

    const gw = img.width;
    const gh = img.height;

    // Ghost-mannequin layout: left sleeve | torso | right sleeve
    const torsoSrc = {
      sx: gw * 0.22,
      sy: gh * 0.02,
      sw: gw * 0.56,
      sh: gh * 0.96,
    };
    const sleeveLSrc = {
      sx: gw * 0.0,
      sy: gh * 0.1,
      sw: gw * 0.24,
      sh: gh * 0.7,
    };
    const sleeveRSrc = {
      sx: gw * 0.76,
      sy: gh * 0.1,
      sw: gw * 0.24,
      sh: gh * 0.7,
    };

    ctx.save();
    ctx.globalAlpha = 0.96;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1) Torso on chest (strip warp follows shoulder tilt / hip taper)
    drawTexturedQuad(ctx, img, torsoSrc, { tl, tr, bl, br }, 12);

    // 2) Sleeves along arms
    const sleeveThick = shoulderW * 0.32;
    drawSleeveAlongArm(
      ctx,
      img,
      sleeveLSrc,
      shoulderL,
      elbowL,
      wristL,
      sleeveThick,
    );
    drawSleeveAlongArm(
      ctx,
      img,
      sleeveRSrc,
      shoulderR,
      elbowR,
      wristR,
      sleeveThick,
    );

    ctx.restore();
    return true;
  }, []);

  const loop = useCallback(() => {
    if (!runningRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const pose = poseRef.current;

    if (!video || !canvas || !pose || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    ctx.save();
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore();

    let ts = Math.round(performance.now());
    if (ts <= lastTsRef.current) ts = lastTsRef.current + 1;
    lastTsRef.current = ts;

    try {
      const result = pose.detectForVideo(video, ts);
      const landmarks = result?.landmarks?.[0];
      if (landmarks?.length) {
        const ok = drawGarment(ctx, w, h, landmarks);
        updateHint(
          ok
            ? "Shirt on body — raise arms slightly for sleeve fit"
            : "Step back — keep shoulders and chest in frame",
        );
      } else {
        updateHint("Looking for your body… stand in frame");
      }
    } catch (err) {
      console.error(err);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [drawGarment, updateHint]);

  async function startCamera() {
    try {
      setError("");
      setLoading(true);

      if (!absoluteShirtUrl) {
        throw new Error("No product image available for try-on.");
      }

      setStatus("Preparing shirt…");
      let prepared;
      try {
        prepared = await loadGarmentImage(toLoadUrl(absoluteShirtUrl), {
          dedicatedCutout: isDedicatedCutout,
        });
      } catch (err) {
        if (!isDedicatedCutout) throw err;
        prepared = await loadGarmentImage(
          toLoadUrl(resolveAbsoluteShirtUrl(shirtImage)),
          { dedicatedCutout: false },
        );
      }
      objectUrlRef.current = prepared.objectUrl;
      garmentRef.current = prepared.canvas;

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera needs HTTPS or localhost.");
      }

      setStatus("Opening camera…");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 960 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      await new Promise((resolve) => {
        if (video.readyState >= 1) resolve();
        else video.onloadedmetadata = () => resolve();
      });
      await video.play();

      setStatus("Loading body tracker…");
      let landmarker;
      try {
        landmarker = await createPoseLandmarker("GPU");
      } catch {
        landmarker = await createPoseLandmarker("CPU");
      }
      poseRef.current = landmarker;

      runningRef.current = true;
      lastTsRef.current = 0;
      smoothRef.current = null;
      setStarted(true);
      setLoading(false);
      setStatus("");
      updateHint("Stand facing the camera — shoulders visible");
      rafRef.current = requestAnimationFrame(loop);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatus("");
      setError(err?.message || "Could not start try-on");
      stopEverything();
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {!started && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 px-6 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-wide text-white">
            Virtual Try-On
          </h2>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-white/75">
            Stand facing the camera. The shirt is placed on your chest and
            sleeves follow your arms.
          </p>
          {error && (
            <div className="mb-4 max-w-md rounded-lg bg-red-500/20 p-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {status && <p className="mb-3 text-sm text-white/80">{status}</p>}
          <button
            type="button"
            onClick={startCamera}
            disabled={loading}
            className="rounded-full bg-white px-7 py-3 font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Loading…" : "Start Try-On"}
          </button>
        </div>
      )}

      {started && hint && (
        <div className="absolute bottom-8 left-1/2 z-30 max-w-[92%] -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-center text-xs text-white/90">
          {hint}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          stopEverything();
          onClose?.();
        }}
        className="absolute right-5 top-5 z-30 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
      >
        Close
      </button>
    </div>
  );
}
