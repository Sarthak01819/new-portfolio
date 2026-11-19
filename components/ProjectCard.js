"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { easeOutExpo, useMotionIntensity } from "@/lib/useMotionIntensity";

export default function ProjectCard({ project, index = 0 }) {
  const mediaRef = useRef(null);
  const intensity = useMotionIntensity();

  // Screenshot drifts inside its frame as the card scrolls past (window parallax).
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform([scrollYProgress, intensity], ([p, k]) => `${(p - 0.5) * -14 * k}%`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.09, ease: easeOutExpo }}
      className="h-full"
    >
      <div className="project-card group h-full">
        <Link
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
          className="flex h-full flex-col"
        >
          <div ref={mediaRef} className="project-media relative">
            <motion.div className="h-full w-full" style={{ y: imageY, scale: 1.16 }}>
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                width={1400}
                height={875}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-8 p-5 sm:p-6">
            <div>
              <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase muted-copy">
                <span>{project.category}</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl uppercase sm:text-3xl">{project.title}</h2>
              <p className="mt-4 text-sm leading-6 muted-copy">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border px-3 py-1 text-xs uppercase muted-copy"
                  style={{ borderColor: "var(--line)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
}
