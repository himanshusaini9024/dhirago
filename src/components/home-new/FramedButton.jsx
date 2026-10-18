import Link from "next/link";
import { serif } from "./theme";

const Corner = ({ className }) => (
  <svg viewBox="0 0 10 10" className={`absolute h-2.5 w-2.5 ${className}`} fill="none" aria-hidden>
    <path d="M0 5 Q5 5 5 0 M5 10 Q5 5 10 5" stroke="currentColor" strokeWidth="0.9" />
  </svg>
);

export default function FramedButton({ href, children, light = false }) {
  const tone = light
    ? "text-white border-white/80 hover:bg-white hover:text-[#2b241c]"
    : "text-[#2b241c] border-[#2b241c] hover:bg-[#2b241c] hover:text-[#f6f1e7]";

  return (
    <Link
      href={href}
      className={`${serif.className} group relative inline-flex items-center justify-center border px-9 py-3 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${tone}`}
    >
      <span className="pointer-events-none absolute inset-[3px] border border-current opacity-60" />
      <Corner className="-left-[5px] -top-[5px]" />
      <Corner className="-right-[5px] -top-[5px] rotate-90" />
      <Corner className="-bottom-[5px] -right-[5px] rotate-180" />
      <Corner className="-bottom-[5px] -left-[5px] -rotate-90" />
      <span className="relative">{children}</span>
    </Link>
  );
}
