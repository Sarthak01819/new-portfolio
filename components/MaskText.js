"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/useMotionIntensity";

// Slides text up from behind a clipping mask when it enters the viewport.
// The in-view trigger lives on the visible mask: the inner text starts fully
// clipped, so an observer on it would never report an intersection.
export default function MaskText({ children, delay = 0.1 }) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.08em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "105%" },
          show: { y: "0%", transition: { duration: 1.05, delay, ease: easeOutExpo } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
