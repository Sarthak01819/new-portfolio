"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { easeOutExpo, useMotionIntensity } from "@/lib/useMotionIntensity";

// Vertical timeline whose rail fills in as you scroll; each entry slides in beside it.
export default function ExperienceTimeline({ items }) {
  const ref = useRef(null);
  const intensity = useMotionIntensity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const scaleY = useTransform([progress, intensity], ([p, k]) => (k === 0 ? 1 : p));

  return (
    <ol ref={ref} className="timeline grid gap-14 sm:gap-20">
      <span aria-hidden="true" className="timeline-track" />
      <motion.span aria-hidden="true" className="timeline-fill" style={{ scaleY }} />

      {items.map((item, index) => (
        <motion.li
          key={`${item.company}-${item.role}`}
          className="timeline-item"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {/* Triggered by the parent li: a scale(0) element has no area for the in-view check. */}
          <motion.span
            aria-hidden="true"
            className="timeline-dot"
            data-current={item.current ? "true" : undefined}
            variants={{
              hidden: { scale: 0 },
              show: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } },
            }}
          />

          <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p className="eyebrow">{item.kind}</p>
              <p className="mt-2 font-display text-xl uppercase">{item.period}</p>
              {item.current && (
                <span
                  className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase"
                  style={{ borderColor: "var(--line)", background: "var(--surface)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-strong)" }} />
                  Current
                </span>
              )}
            </motion.div>

            <motion.article
              initial={{ opacity: 0, x: 56 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.95, delay: 0.08 + index * 0.02, ease: easeOutExpo }}
              className="contact-card p-6 sm:p-8"
            >
              <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl">{item.role}</h2>
              <p className="mt-2 font-display text-sm uppercase" style={{ color: "var(--accent)" }}>
                {item.company}
              </p>
              <p className="mt-5 text-base leading-7 muted-copy">{item.summary}</p>

              <ul className="mt-6 grid gap-3">
                {item.points.map((point, pointIndex) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.25 + pointIndex * 0.08, ease: easeOutExpo }}
                    className="flex gap-3 text-sm leading-6 muted-copy sm:text-base sm:leading-7"
                  >
                    <span aria-hidden="true" className="mt-[0.7em] h-1 w-3 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {item.stack?.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border px-3 py-1 text-xs uppercase muted-copy"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
