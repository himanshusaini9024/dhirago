import { AlertTriangle } from "lucide-react";
import {
  EXCEPTION_TONE_CLASSES,
  getOrderException,
} from "../../lib/orderStatus";

export default function OrderExceptionBanner({ order, className = "" }) {
  const exception = getOrderException(order);
  if (!exception) return null;

  return (
    <div
      className={`flex gap-3 rounded-xl border px-4 py-3 ${EXCEPTION_TONE_CLASSES[exception.tone]} ${className}`}
    >
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed">
        <p className="font-semibold uppercase tracking-wide">
          {exception.title}
        </p>
        <p className="mt-1">{exception.message}</p>
        {exception.remark && (
          <p className="mt-1 opacity-80">Courier note: {exception.remark}</p>
        )}
      </div>
    </div>
  );
}
