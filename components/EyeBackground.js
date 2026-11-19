"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { EYE_CENTER, EYE_FRAMES, EYE_SEQUENCE, pickEyeFrame } from "@/lib/eyeFrames";

const MIN_HOLD_MS = 70; // shortest time a drawing stays up, keeps the hand-drawn cadence
const IDLE_AFTER_MS = 3000; // no pointer input for this long -> play the original clip as a loop
const CLIP_SECONDS = EYE_SEQUENCE.length / 30;

// Fixed, site-wide background: hand-drawn eyes that look toward the cursor.
// Every drawing is stacked in the DOM and only the active one is visible, so switching never flickers.
export default function EyeBackground() {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Full strength inside the home hero; dimmed behind text everywhere else so copy stays readable.
  useEffect(() => {
    const layer = layerRef.current;
    const update = () => {
      layer.dataset.dim = String(!isHome || window.scrollY > window.innerHeight * 0.55);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  useEffect(() => {
    const stage = stageRef.current;
    const images = Array.from(stage.querySelectorAll("img"));
    let current = EYE_CENTER;

    const show = (index) => {
      if (index === current) return;
      images[current].style.visibility = "hidden";
      images[index].style.visibility = "visible";
      current = index;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    // Smoothed look direction; GSAP eases it toward the pointer so the gaze glides between drawings.
    const look = { x: 0, y: 0 };
    const lookX = gsap.quickTo(look, "x", { duration: 0.35, ease: "power3.out" });
    const lookY = gsap.quickTo(look, "y", { duration: 0.35, ease: "power3.out" });
    // The whole pair also drifts a few pixels toward the cursor for a bit of depth.
    const driftX = gsap.quickTo(stage, "x", { duration: 1.2, ease: "power3.out" });
    const driftY = gsap.quickTo(stage, "y", { duration: 1.2, ease: "power3.out" });

    let lastSwitch = 0;
    let lastInput = 0;
    let idle = null;

    const startIdle = () => {
      if (idle) return;
      const playhead = { frame: 0 };
      idle = gsap
        .timeline({ repeat: -1, repeatDelay: 1.6 })
        .to(playhead, {
          frame: EYE_SEQUENCE.length - 1,
          duration: CLIP_SECONDS,
          ease: "none",
          onUpdate: () => show(EYE_SEQUENCE[Math.round(playhead.frame)]),
        })
        .call(() => show(EYE_CENTER));
      driftX(0);
      driftY(0);
    };

    const stopIdle = () => {
      idle?.kill();
      idle = null;
    };

    const aimAt = (clientX, clientY) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - (gsap.getProperty(stage, "x") || 0);
      const cy = rect.top + rect.height / 2 - (gsap.getProperty(stage, "y") || 0);
      const x = gsap.utils.clamp(-1.4, 1.4, (clientX - cx) / (window.innerWidth / 2));
      const y = gsap.utils.clamp(-1.4, 1.4, (clientY - cy) / (window.innerHeight / 2));

      lastInput = performance.now();
      stopIdle();
      lookX(x);
      lookY(y);
      driftX(x * 14);
      driftY(y * 10);
    };

    const onPointerMove = (event) => aimAt(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) aimAt(touch.clientX, touch.clientY);
    };

    const tick = () => {
      const now = performance.now();
      if (idle) return;
      if (now - lastInput > IDLE_AFTER_MS) {
        startIdle();
        return;
      }
      const next = pickEyeFrame(look.x, look.y, current);
      if (next !== current && now - lastSwitch > MIN_HOLD_MS) {
        show(next);
        lastSwitch = now;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    gsap.ticker.add(tick);
    startIdle();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      gsap.ticker.remove(tick);
      stopIdle();
      gsap.killTweensOf([look, stage]);
    };
  }, []);

  return (
    <div ref={layerRef} className="eye-layer" data-dim={String(!isHome)} aria-hidden="true">
      <div ref={stageRef} className="eye-stage">
        {EYE_FRAMES.map((frame, index) => (
          // Plain <img>: all drawings must be decoded up front and swapped instantly.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={frame.src}
            src={frame.src}
            alt=""
            draggable="false"
            decoding="async"
            style={{ visibility: index === EYE_CENTER ? "visible" : "hidden" }}
          />
        ))}
      </div>
    </div>
  );
}
