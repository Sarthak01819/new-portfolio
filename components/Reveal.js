"use client";

import { motion } from "framer-motion";

export default function Reveal({ as = "div", children, className = "", delay = 0 }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
