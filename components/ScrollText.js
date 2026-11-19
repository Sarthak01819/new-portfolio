"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionIntensity } from "@/lib/useMotionIntensity";

// Paragraph whose words brighten one by one as it scrolls through the viewport.
export default function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const intensity = useMotionIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          intensity={intensity}
          range={[index / words.length, (index + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, intensity, range }) {
  const opacity = useTransform([progress, intensity], ([value, k]) => {
    const local = Math.min(Math.max((value - range[0]) / (range[1] - range[0]), 0), 1);
    return 1 - (1 - local) * 0.8 * k;
  });

  return (
    <motion.span style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
}
