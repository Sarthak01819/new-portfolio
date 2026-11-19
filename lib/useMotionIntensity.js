"use client";

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

// Motion value that is 1 normally and 0 when the visitor prefers reduced motion.
// Multiply scroll-linked transforms by it so they flatten out for those users
// without causing a server/client hydration mismatch.
export function useMotionIntensity() {
  const intensity = useMotionValue(1);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => intensity.set(query.matches ? 0 : 1);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [intensity]);

  return intensity;
}

export const easeOutExpo = [0.22, 1, 0.36, 1];
