"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Montserrat } from "next/font/google";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "400", "400"],
});
const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const BANNER = `https://images.dhirago.com/ecommerce/banner/dsc06480.webp?${process.env.NEXT_PUBLIC_IMAGE_VERSION || ""}`;
// const ACCENT = "#e8aeb6";
const ACCENT = "#ad7e84";

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function useCountdown(targetMs) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, targetMs - now);
    const totalSec = Math.floor(diff / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return {
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  }, [now, targetMs]);
}

function TimeBox({ value, label }) {
  return (
    <div className="flex w-[72px] flex-col items-center sm:w-[78px]">
      <div className="flex h-[52px] w-full items-center justify-center rounded-[4px] bg-[#2a2a2a] text-[20px] font-semibold tracking-wide text-white sm:h-[56px] sm:text-[22px]">
        {value}
      </div>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#9a9a9a]">
        {label}
      </span>
    </div>
  );
}

export default function OfferPopup({ isOpen, onClose }) {
  const [entered, setEntered] = useState(false);
  const target = useMemo(() => endOfToday(), []);
  const time = useCountdown(target);

  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      return undefined;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setEntered(true));

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${sans.className} fixed inset-0 z-[85] flex items-end justify-center p-4 sm:items-center sm:p-8`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
    >
      <button
        type="button"
        aria-label="Dismiss offer"
        className={`absolute inset-0 bg-black/55 transition-opacity duration-500 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-[360px] overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[400px] ${
          entered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-[0.98] opacity-0"
        }`}
      >
        {/* Image hero */}
        <div className="relative h-[280px] w-full sm:h-[320px]">
          <Image
            src={BANNER}
            alt="Dhirago festive offer"
            fill
            sizes="400px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/15" />

          <p className="absolute inset-x-0 top-[72%] text-center text-[22px] font-semibold uppercase tracking-[0.22em] text-white sm:text-[24px]">
            Dhirago
          </p>

          {/* Discount badge — clipped by card overflow like the reference */}
       

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-white/90 transition hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Offer body */}
        <div className="px-6 pb-6 pt-5 text-center sm:px-7 sm:pb-7">
          {/* <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            Only today
          </p> */}

          <h2
            id="offer-popup-title"
            className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
          >
            Flat 15% off*
          </h2>
          <p className={`${josefin.className} mt-1.5 text-[13px] font-medium text-[#b3b3b3]`}>
           & Get some Extra off on Your first order
          </p>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            <TimeBox value={time.hours} label="Hours" />
            <TimeBox value={time.minutes} label="Minutes" />
            <TimeBox value={time.seconds} label="Seconds" />
          </div>

          <Link
            href="/collections/shirts"
            onClick={onClose}
            className="mt-6 flex w-full items-center justify-center rounded-[4px] px-5 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#1a1a1a] transition hover:brightness-95"
            style={{ backgroundColor: ACCENT }}
          >
            Shop here
          </Link>
        </div>
      </div>
    </div>
  );
}
