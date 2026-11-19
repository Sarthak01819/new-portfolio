"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis";

const COVER_SECONDS = 0.75;
const REVEAL_SECONDS = 0.85;
const NAV_TIMEOUT_MS = 5000; // reveal anyway if the next page never arrives

// Smoky ink page transition.
// Cover: an ink blob with a turbulent, feathered edge blooms out from where you tapped/clicked
// until it fills the screen. The route changes underneath, then the ink tears open from the
// centre to reveal the new page. The edge is an SVG turbulence + displacement filter, so it
// stays sharp at any screen size, on desktop and mobile alike.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef(null);
  const state = useRef({ phase: "idle", timeout: 0 });
  const revealRef = useRef(() => {});

  useEffect(() => {
    const root = rootRef.current;
    const svg = root.querySelector("svg");
    const turbulence = svg.querySelectorAll("feTurbulence");
    const displacement = svg.querySelectorAll("feDisplacementMap");
    const coverInk = svg.querySelectorAll(".ink-cover circle");
    const holeInk = svg.querySelectorAll(".ink-hole-shape");
    const coverGroup = svg.querySelector(".ink-cover");
    const veil = svg.querySelector(".ink-veil");
    const ink = { r: 0, warp: 0, freq: 0.011, x: 0, y: 0 };
    const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      return { w, h };
    };

    // Radius that reaches the farthest corner from (x, y), plus room for the ragged edge.
    const fullRadius = (x, y, w, h) => Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 1.18 + 120;

    const render = (shapes) => {
      shapes.forEach((shape) => {
        const halo = shape.dataset.halo === "true";
        shape.setAttribute("cx", ink.x);
        shape.setAttribute("cy", ink.y);
        shape.setAttribute("r", Math.max(0, ink.r * (halo ? 1.08 : 1)));
      });
      turbulence.forEach((node) => node.setAttribute("baseFrequency", `${ink.freq} ${ink.freq * 1.6}`));
      displacement.forEach((node) => node.setAttribute("scale", ink.warp));
    };

    const finish = () => {
      getLenis()?.start();
      root.dataset.active = "false";
      coverGroup.style.display = "none";
      veil.style.display = "none";
      state.current.phase = "idle";
    };

    const cover = (x, y, navigate) => {
      const { w, h } = size();
      state.current.phase = "covering";
      getLenis()?.stop();
      root.dataset.active = "true";
      veil.style.display = "none";
      coverGroup.style.display = "";
      Object.assign(ink, { x, y, r: 0, warp: Math.min(w, h) * 0.05, freq: 0.016 });
      render(coverInk);

      gsap.to(ink, {
        r: fullRadius(x, y, w, h),
        warp: Math.min(w, h) * 0.16,
        freq: 0.009,
        duration: COVER_SECONDS,
        ease: "power3.in",
        onUpdate: () => render(coverInk),
        onComplete: () => {
          state.current.phase = "covered";
          navigate();
          state.current.timeout = window.setTimeout(() => revealRef.current(), NAV_TIMEOUT_MS);
        },
      });
    };

    const reveal = () => {
      if (state.current.phase !== "covered") return;
      window.clearTimeout(state.current.timeout);
      const { w, h } = size();
      state.current.phase = "revealing";
      coverGroup.style.display = "none";
      veil.style.display = "";
      Object.assign(ink, { x: w / 2, y: h / 2, r: 0, warp: Math.min(w, h) * 0.18, freq: 0.008 });
      render(holeInk);

      gsap.to(ink, {
        r: fullRadius(w / 2, h / 2, w, h),
        warp: Math.min(w, h) * 0.06,
        freq: 0.014,
        duration: REVEAL_SECONDS,
        delay: 0.08,
        ease: "power2.inOut",
        onUpdate: () => render(holeInk),
        onComplete: finish,
      });
    };
    revealRef.current = reveal;

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest?.("a[href]");
      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash links behave normally
      if (reduceMotion()) return;

      // Hold the navigation (Next's <Link> skips prevented clicks) until the ink covers the screen.
      event.preventDefault();
      if (state.current.phase !== "idle") return;

      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      const fromKeyboard = event.clientX === 0 && event.clientY === 0;
      const x = fromKeyboard ? window.innerWidth / 2 : event.clientX;
      const y = fromKeyboard ? window.innerHeight / 2 : event.clientY;
      cover(x, y, () => router.push(href));
    };

    const transition = state.current;
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(transition.timeout);
      gsap.killTweensOf(ink);
    };
  }, [router]);

  // New route rendered under the ink: tear it open.
  useEffect(() => {
    revealRef.current();
  }, [pathname]);

  return (
    <div ref={rootRef} className="page-transition" data-active="false" aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <filter id="ink-edge" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feGaussianBlur in="warped" stdDeviation="2.5" />
          </filter>
          <filter id="ink-smoke" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="21" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="G" yChannelSelector="B" result="warped" />
            <feGaussianBlur in="warped" stdDeviation="16" />
          </filter>
          <mask id="ink-hole" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <circle className="ink-hole-shape" data-halo="true" fill="#000" fillOpacity="0.45" filter="url(#ink-smoke)" />
            <circle className="ink-hole-shape" fill="#000" filter="url(#ink-edge)" />
          </mask>
        </defs>

        <g className="ink-cover" style={{ display: "none" }}>
          <circle data-halo="true" className="ink-fill" opacity="0.45" filter="url(#ink-smoke)" />
          <circle className="ink-fill" filter="url(#ink-edge)" />
        </g>

        <rect className="ink-veil ink-fill" width="100%" height="100%" mask="url(#ink-hole)" style={{ display: "none" }} />
      </svg>
    </div>
  );
}
