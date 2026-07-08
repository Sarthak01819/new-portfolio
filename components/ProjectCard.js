"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="project-card group h-full"
    >
      <Link
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
        className="flex h-full flex-col"
      >
        <div className="project-media relative">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            width={1400}
            height={875}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
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
    </motion.article>
  );
}
