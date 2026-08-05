"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LoginPopup from "../../loginpopup";

export default function LoginDrawer({ open, setOpen }) {
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return <LoginPopup isOpen={open} onClose={() => setOpen(false)} />;
}
