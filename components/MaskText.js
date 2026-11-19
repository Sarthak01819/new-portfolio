"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/useMotionIntensity";

// Slides text up from behind a clipping mask when it enters the viewport.
export default function MaskText({ children, delay = 0.1 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.05, delay, ease: easeOutExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}
