"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Rocket, Server } from "lucide-react";

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
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="feature-card flex min-h-64 flex-col justify-between p-6"
    >
      <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: "var(--line)" }}>
        <Icon size={24} aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase">{title}</h3>
        <p className="mt-4 text-sm leading-6 muted-copy">{description}</p>
      </div>
    </motion.article>
  );
}
