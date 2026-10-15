"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function MicrosoftClarity() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    const liveUrl = "www.dhirago.com";

    if (
      process.env.NODE_ENV !== "production" ||
      window.location.hostname !== liveUrl ||
      !projectId
    ) {
      return;
    }

    Clarity.init(projectId);
  }, []);

  return null;
}