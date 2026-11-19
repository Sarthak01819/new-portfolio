"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Rocket, Server } from "lucide-react";
import { easeOutExpo } from "@/lib/useMotionIntensity";

const iconMap = {
  code: Code2,
  database: Database,
  globe: Globe,
  rocket: Rocket,
  server: Server,
};

export default function FeatureCard({ icon, title, description, index = 0 }) {
  const Icon = iconMap[icon] || Code2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 56, rotateX: -16 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: easeOutExpo }}
      style={{ transformPerspective: 900, transformOrigin: "50% 100%" }}
      className="h-full"
    >
      <div className="feature-card flex h-full min-h-64 flex-col justify-between p-6">
        <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: "var(--line)" }}>
          <Icon size={24} aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase">{title}</h3>
          <p className="mt-4 text-sm leading-6 muted-copy">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
