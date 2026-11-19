"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/useMotionIntensity";

const offsets = {
  up: { y: 40 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.94 },
};

export default function Reveal({ as = "div", children, className = "", delay = 0, from = "up" }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </Component>
  );
}
