"use client";

import { useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

// ── Icons ──────────────────────────────────────────────────────────────────
const WashIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355]">
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 24c0-2 2-4 5-4s5 4 5 4 2-4 5-4 5 4 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DryIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355]">
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="16" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IronIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355]">
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 29h18l4-8H16l-4 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="20" y1="25" x2="20" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="27" x2="24" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="25" x2="28" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BleachIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355]">
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 18h16l-3 14H19L16 18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="13" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-4 text-[#8b7355] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
const fabricData = [
  {
    name: "COTTON / LINEN",
    nameVertical: "COTTON\n/ LINEN",
    washing: ["Cold wash", "Separate colours", "Machine wash on normal cycle", "Or hand wash"],
    drying: ["Hang dry"],
    ironing: ["Linen: Iron when damp", "Cotton: Iron on hot or steam"],
    avoid: ["Use chemical free bleach if possible"],
  },
  {
    name: "SILK",
    nameVertical: "SILK",
    washing: ["Cold wash", "Separate colours", "Gentle hand wash"],
    drying: ["Do not wring", "Reshape and hang dry"],
    ironing: ["Iron on low", "Iron inside-out"],
    avoid: ["Don't use dryer", "Don't use bleach"],
  },
  {
    name: "MODAL",
    nameVertical: "MODAL",
    washing: ["Cold wash", "Separate colours", "Machine wash on delicate cycle", "Or gentle hand wash"],
    drying: ["Hang dry"],
    ironing: ["Steam iron", "Iron on medium"],
    avoid: ["Don't use bleach", "Don't use dryer"],
  },
  {
    name: "LYCRA",
    nameVertical: "LYCRA",
    washing: ["Cold wash", "Machine wash in a mesh bag on delicate cycle", "Or hand wash"],
    drying: ["Hang dry"],
    ironing: ["Do not iron"],
    avoid: ["Don't use bleach", "Don't use fabric conditioner"],
  },
  {
    name: "TENCEL",
    nameVertical: "TENCEL",
    washing: ["Cold wash", "Machine wash in a mesh bag on delicate cycle", "Or gentle hand wash"],
    drying: ["Hang dry"],
    ironing: ["Steam iron"],
    avoid: ["Don't use dryer", "Don't use bleach", "Avoid friction"],
  },
  {
    name: "KHADI",
    nameVertical: "KHADI",
    washing: ["Cold wash", "Separate colours", "Machine wash in a mesh bag on delicate cycle", "Or gentle hand wash"],
    drying: ["Do not wring", "Hang dry"],
    ironing: ["Steam iron", "Choose iron temperature according to the fiber"],
    avoid: ["Don't use bleach"],
  },
];

const columnHeaders = [
  { label: "WASHING",       icon: <WashIcon /> },
  { label: "DRYING",        icon: <DryIcon /> },
  { label: "IRONING",       icon: <IronIcon /> },
  { label: "AVOID / BLEACH", icon: <BleachIcon /> },
];

const generalCautions = [
  "Never wash whites with coloured clothes",
  "Don't hang coloured clothes under direct sun",
  "Use mild liquid detergents",
  "Avoid dry-clean as much as possible",
];

// ── Bullet list ─────────────────────────────────────────────────────────────
function CareList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 leading-relaxed text-[#3a3028]">
          <span className="text-[#a89070] shrink-0 mt-0.5">•</span>
          <span className={`${josefin.className} text-sm md:text-base`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Mobile accordion card ────────────────────────────────────────────────────
function MobileFabricCard({ fabric, isOpen, onToggle }) {
  return (
    <div className="border border-[#d6cfc3] overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 transition-colors duration-200 ${
          isOpen ? "bg-[#ece7dc]" : "bg-[rgba(255,255,255,1.0)] hover:bg-[#f0ece4]"
        }`}
      >
        <span className={`${josefin.className} text-xs font-semibold tracking-[0.15em] text-[#6b5d4a] uppercase`}>
          {fabric.name}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="bg-white divide-y divide-[#d6cfc3]">
          {/* Washing */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <WashIcon />
              <span className={`${josefin.className} text-xs tracking-widest text-[#6b5d4a] uppercase font-medium`}>
                Washing
              </span>
            </div>
            <CareList items={fabric.washing} />
          </div>

          {/* Drying */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <DryIcon />
              <span className={`${josefin.className} text-xs tracking-widest text-[#6b5d4a] uppercase font-medium`}>
                Drying
              </span>
            </div>
            <CareList items={fabric.drying} />
          </div>

          {/* Ironing */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <IronIcon />
              <span className={`${josefin.className} text-xs tracking-widest text-[#6b5d4a] uppercase font-medium`}>
                Ironing
              </span>
            </div>
            <CareList items={fabric.ironing} />
          </div>

          {/* Avoid */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <BleachIcon />
              <span className={`${josefin.className} text-xs tracking-widest text-[#6b5d4a] uppercase font-medium`}>
                Avoid / Bleach
              </span>
            </div>
            <CareList items={fabric.avoid} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ProductCarePage() {
  const [activeRow, setActiveRow] = useState(null);

  const toggleRow = (idx) => setActiveRow(activeRow === idx ? null : idx);

  return (
    <div className={`${josefin.className} min-h-screen bg-white`}>

    

    

      {/* ── MOBILE: Accordion Layout (hidden on md+) ── */}
      <div className="md:hidden px-4 pb-10 pt-12 space-y-2">
        {fabricData.map((fabric, idx) => (
          <MobileFabricCard
            key={fabric.name}
            fabric={fabric}
            isOpen={activeRow === idx}
            onToggle={() => toggleRow(idx)}
          />
        ))}
      </div>

      {/* ── DESKTOP: Table Layout (hidden on mobile) ── */}
      <div className="hidden md:block max-w-6xl mx-auto px-4 pb-12">

        {/* Column header row */}
        <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr] border border-[#d6cfc3]">
          <div className="bg-[#f5f1eb] border-r border-[#d6cfc3]" />
          {columnHeaders.map((col, i) => (
            <div
              key={col.label}
              className={`bg-[#f5f1eb] flex flex-col items-center justify-center py-6 gap-3 ${
                i < columnHeaders.length - 1 ? "border-r border-[#d6cfc3]" : ""
              }`}
            >
              {col.icon}
              <span className={`${josefin.className} text-xs tracking-widest text-[#6b5d4a] uppercase font-medium`}>
                {col.label}
              </span>
            </div>
          ))}
        </div>

        {/* Fabric rows */}
        {fabricData.map((fabric, idx) => (
          <div
            key={fabric.name}
            onClick={() => toggleRow(idx)}
            className={`grid grid-cols-[80px_1fr_1fr_1fr_1fr] border-x border-b border-[#d6cfc3] cursor-pointer transition-colors duration-200 ${
              activeRow === idx ? "bg-[#ece7dc]" : "hover:bg-[#f0ece4]"
            }`}
          >
            {/* Fabric label — vertical */}
            <div className="bg-[#f5f1eb] border-r border-[#d6cfc3] flex items-center justify-center py-6 min-h-[130px]">
              <span
                className={`${josefin.className} text-[11px] font-semibold tracking-[0.15em] text-[#6b5d4a] uppercase`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "pre" }}
              >
                {fabric.nameVertical}
              </span>
            </div>

            {/* Washing */}
            <div className="border-r border-[#d6cfc3] p-5">
              <CareList items={fabric.washing} />
            </div>

            {/* Drying */}
            <div className="border-r border-[#d6cfc3] p-5">
              <CareList items={fabric.drying} />
            </div>

            {/* Ironing */}
            <div className="border-r border-[#d6cfc3] p-5">
              <CareList items={fabric.ironing} />
            </div>

            {/* Avoid */}
            <div className="p-5">
              <CareList items={fabric.avoid} />
            </div>
          </div>
        ))}
      </div>

      {/* ── General Caution ── */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="border border-[#d6cfc3] bg-[rgba(255,255,255,1.0)] px-5 md:px-8 py-5">
          <p className={`${josefin.className} text-xs tracking-[0.25em] text-[#111111] uppercase mb-4 font-medium`}>
            General Caution
          </p>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-y-3 md:gap-x-10 md:gap-y-3">
            {generalCautions.map((caution) => (
              <span key={caution} className={`${josefin.className} flex items-center gap-2 text-sm text-[#3a3028]`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#777777] shrink-0" />
                {caution}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Download Button ── */}
      <div className="text-center pb-8 px-4">
        <button
          className={`${josefin.className} w-full md:w-auto bg-[#2c2417] text-white text-xs tracking-[0.25em] uppercase px-12 py-4 transition-all duration-200 hover:bg-[#8b7355] active:scale-95`}
        >
          Download Your Guide
        </button>
      </div>

      {/* ── Footer ── */}
      <div className="bg-[#111111] text-center py-5 px-6">
        <p className={`${josefin.className} text-sm text-white leading-relaxed max-w-xl mx-auto italic`}>
          This is a general guide. Always look at care instructions on your clothing tag.{" "}
          If you are still unsure about what to do, ask your mom.
        </p>
      </div>
    </div>
  );
}