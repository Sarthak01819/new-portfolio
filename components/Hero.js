"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionIntensity } from "@/lib/useMotionIntensity";

const NAME = ["Sarthak", "Singh"];

// The light that travels around inside the rim: three stacked dashes of one ellipse
// (core, glow, faint tail) whose leading edges stay aligned so they read as one comet.
const SWEEP = [
  { className: "rim-sweep-tail", length: 260 },
  { className: "rim-sweep-glow", length: 120 },
  { className: "rim-sweep-core", length: 55 },
];
// Tilted ring hugging the inside of the lower rim (viewBox is the planet's bounding square).
const SWEEP_PATH = "M 205 875 A 295 95 0 1 0 795 875 A 295 95 0 1 0 205 875";

export default function Hero() {
  const heroRef = useRef(null);
  const intensity = useMotionIntensity();

  // Scroll-out parallax: the planet sinks and shrinks while the name drifts up and fades.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const sceneY = useTransform([scrollYProgress, intensity], ([p, k]) => p * 160 * k);
  const sceneScale = useTransform([scrollYProgress, intensity], ([p, k]) => 1 - p * 0.18 * k);
  const sceneOpacity = useTransform([scrollYProgress, intensity], ([p, k]) => 1 - Math.min(p * 1.1, 0.8) * k);
  const titleY = useTransform([scrollYProgress, intensity], ([p, k]) => p * -140 * k);
  const copyY = useTransform([scrollYProgress, intensity], ([p, k]) => p * -70 * k);
  const fadeOut = useTransform([scrollYProgress, intensity], ([p, k]) => 1 - Math.min(p * 1.6, 1) * k);

  useGSAP(
    () => {
      const q = gsap.utils.selector(heroRef);
      const root = document.documentElement;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sweepPaths = q(".rim-sweep path");
      // Position every dash so its leading edge sits at `head` (0..1000 along the ellipse).
      // A dash of length L with offset d covers [-d, -d + L], so the head is at L - d.
      const placeSweep = (head) => {
        sweepPaths.forEach((path, index) => {
          path.style.strokeDashoffset = String(SWEEP[index].length - head);
        });
      };
      const sweep = { head: 180 };
      placeSweep(sweep.head);

      if (reduceMotion) {
        root.classList.remove("intro-pending");
        return;
      }

      const startSweep = () =>
        gsap.to(sweep, {
          head: sweep.head + 1000,
          duration: 4.6,
          ease: "none",
          repeat: -1,
          onUpdate: () => placeSweep(sweep.head % 1000),
        });

      const letters = q(".hero-letter");
      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      timeline
        // 1. A thin arc appears, then grows into the full planet rim (bottom edge stays put).
        .fromTo(q(".rim-planet"), { scale: 0.16, "--reveal": "0%" }, { scale: 1, "--reveal": "135%", duration: 1.5 }, 0)
        .fromTo(q(".rim-haze"), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.8)
        // 2. Letters condense out of a smoky blur in random order; the outer letters slide in from the edges.
        .fromTo(
          letters,
          {
            opacity: 0,
            filter: "blur(20px)",
            scale: 2.3,
            xPercent: (index) => (index === 0 ? -420 : index === letters.length - 1 ? 420 : gsap.utils.random(-60, 60)),
            yPercent: () => gsap.utils.random(-90, 70),
            rotate: () => gsap.utils.random(-28, 28),
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            duration: 1.15,
            ease: "power3.out",
            stagger: { each: 0.055, from: "random" },
            clearProps: "filter,transform",
          },
          0.6
        )
        // 3. Supporting copy fades up once the name has landed.
        .fromTo(q(".hero-kicker"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.3)
        .fromTo(
          q(".hero-copy > *"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "transform" },
          1.4
        )
        // 4. The light starts its endless sweep around the inside of the rim.
        .fromTo(q(".rim-sweep"), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 1.7)
        .add(startSweep, 1.7);

      // From-states are applied now, so the pre-hydration hide class can go.
      root.classList.remove("intro-pending");
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="page-shell relative flex min-h-[100svh] overflow-hidden pt-28">
      <motion.div className="hero-planet-layer" style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }} aria-hidden="true">
        <div className="rim-planet">
          <div className="rim-haze" />
          <div className="rim-glow" />
          <svg className="rim-sweep" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {SWEEP.map((dash) => (
              <path
                key={dash.className}
                className={dash.className}
                d={SWEEP_PATH}
                pathLength="1000"
                strokeDasharray={`${dash.length} ${1000 - dash.length}`}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      <div className="section-band relative z-10 flex w-full pb-12 sm:pb-16">
        <div className="section-inner flex w-full flex-col">
          <div className="hero-kicker flex flex-wrap items-center justify-between gap-4 text-sm uppercase muted-copy">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent-strong)" }} />
              Open to work
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              India
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-end">
            <motion.h1 className="hero-name" aria-label="Sarthak Singh" style={{ y: titleY, opacity: fadeOut }}>
              {NAME.map((word) => (
                <span key={word} className="hero-name-word" style={{ flexGrow: word.length }} aria-hidden="true">
                  {[...word].map((letter, index) => (
                    <span key={`${word}-${index}`} className="hero-letter">
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.div className="hero-copy mx-auto mt-12 flex max-w-xl flex-col items-center text-center sm:mt-16" style={{ y: copyY, opacity: fadeOut }}>
              <p className="eyebrow">Full-stack developer</p>
              <p className="mt-4 text-base leading-7 muted-copy sm:text-lg sm:leading-8">
                I build fast, expressive web products with Next.js, React, Node.js, and AI integrations, with thoughtful motion that makes the experience feel alive.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/projects" className="primary-action">
                  View work <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="secondary-action">
                  Hire me <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <a href="/Sarthak_Singh_Resume.pdf" download="Sarthak_Singh_Resume.pdf" className="secondary-action">
                  Resume <Download size={18} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
