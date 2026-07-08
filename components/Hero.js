"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false, loading: () => null });

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        return;
      }

      const q = gsap.utils.selector(heroRef);
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .fromTo(q(".hero-kicker"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, immediateRender: false })
        .fromTo(
          q(".hero-title-line"),
          { yPercent: 110, opacity: 0, rotate: 2 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.12,
            immediateRender: false,
            clearProps: "transform,opacity",
          },
          "-=0.25"
        )
        .fromTo(
          q(".hero-copy > *"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, immediateRender: false, clearProps: "transform,opacity" },
          "-=0.45"
        );
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="page-shell page-grid relative flex min-h-[92svh] items-end overflow-hidden pt-32">
      <HeroScene />
      <div className="section-band relative z-10 pb-10 sm:pb-14">
        <div className="section-inner flex min-h-[calc(92svh-8rem)] flex-col justify-between gap-12">
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

          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
            <h1 className="hero-title min-w-0">
              <span className="hero-title-mask">
                <span className="hero-title-line">Sarthak</span>
              </span>
              <span className="hero-title-mask">
                <span className="hero-title-line">Singh</span>
              </span>
            </h1>

            <div className="hero-copy min-w-0 max-w-full lg:max-w-xl lg:pb-5">
              <p className="eyebrow">Full-stack developer</p>
              <p className="mt-4 text-lg leading-8 muted-copy">
                I build fast, expressive web products with Next.js, React, Node.js, and thoughtful motion that makes the experience feel alive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/projects" className="primary-action">
                  View work <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="secondary-action">
                  Hire me <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
