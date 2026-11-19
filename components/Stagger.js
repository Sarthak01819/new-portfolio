"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/useMotionIntensity";

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOutExpo } },
};

export function Stagger({ as = "div", children, className = "", stagger = 0.06, delay = 0 }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", children, className = "", style, ...rest }) {
  const Component = motion[as] || motion.div;

  return (
    <Component className={className} style={style} variants={itemVariants} {...rest}>
      {children}
    </Component>
  );
}
