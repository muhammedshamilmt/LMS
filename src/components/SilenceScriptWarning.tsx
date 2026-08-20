"use client";

import { useEffect } from "react";

export function SilenceScriptWarning() {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      
      // Filter out the React 19 script tag warning caused by next-themes
      if (
        msg.includes("Encountered a script tag while rendering React component") ||
        msg.includes("Scripts inside React components are never executed")
      ) {
        return;
      }

      originalConsoleError.apply(console, args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
