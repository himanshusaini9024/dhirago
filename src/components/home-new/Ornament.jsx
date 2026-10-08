import { serif } from "./theme";

export function OrnamentDivider({ className = "" }) {
  return (
    <svg viewBox="0 0 160 12" className={`h-3 w-32 text-[#6b5d4a] ${className}`} fill="none" aria-hidden>
      <path d="M2 6 H64 M96 6 H158" stroke="currentColor" strokeWidth="0.8" />
      <path d="M80 1 L85 6 L80 11 L75 6 Z" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="80" cy="6" r="1.2" fill="currentColor" />
      <circle cx="69" cy="6" r="1" fill="currentColor" />
      <circle cx="91" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

export function OrnamentHeading({ children, className = "", light = false }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <h2
        className={`${serif.className} text-center text-[18px] font-medium uppercase tracking-[0.18em] md:text-[22px] ${
          light ? "text-white" : "text-[#3d342a]"
        }`}
      >
        {children}
      </h2>
      <OrnamentDivider className={light ? "text-white/80" : ""} />
    </div>
  );
}
