// The 16 distinct drawings from the eye clip (public/eyes/eye-XX.webp), each tagged with
// where its pupils point on screen: x -1 (left) .. 1 (right), y -1 (up) .. 1 (down).
// The clip has no true "down" drawing, so the squinting frames (lids lowered) stand in for it.
export const EYE_FRAMES = [
  { src: "/eyes/eye-00.webp", gaze: [-1, 0.05] },
  { src: "/eyes/eye-01.webp", gaze: [-0.7, -0.55] },
  { src: "/eyes/eye-02.webp", gaze: [-0.35, -0.9] },
  { src: "/eyes/eye-03.webp", gaze: [0.05, -1] },
  { src: "/eyes/eye-04.webp", gaze: [0.45, 0.1] },
  { src: "/eyes/eye-05.webp", gaze: [0.3, 0.6] },
  { src: "/eyes/eye-06.webp", gaze: [0, 0.95] },
  { src: "/eyes/eye-07.webp", gaze: [0.6, 0.75] },
  { src: "/eyes/eye-08.webp", gaze: [0.8, 0.35] },
  { src: "/eyes/eye-09.webp", gaze: [1, 0.05] },
  { src: "/eyes/eye-10.webp", gaze: [0.85, -0.05] },
  { src: "/eyes/eye-11.webp", gaze: [0, 0] },
  { src: "/eyes/eye-12.webp", gaze: [-0.6, 0.05] },
  { src: "/eyes/eye-13.webp", gaze: [-0.8, 0.1] },
  { src: "/eyes/eye-14.webp", gaze: [-0.9, -0.05] },
  { src: "/eyes/eye-15.webp", gaze: [-1, 0] },
];

// Drawing to show when looking straight at the viewer.
export const EYE_CENTER = 11;

const DEAD_ZONE = 0.16; // look vector this short = look straight ahead
const HYSTERESIS = 0.1; // a new drawing must be this much closer before switching (stops flicker)

const distanceTo = (index, x, y) => Math.hypot(EYE_FRAMES[index].gaze[0] - x, EYE_FRAMES[index].gaze[1] - y);

// Pick the drawing whose gaze best matches a look vector (x, y roughly -1..1, screen axes).
export function pickEyeFrame(lookX, lookY, current = EYE_CENTER) {
  const magnitude = Math.hypot(lookX, lookY);
  if (magnitude < DEAD_ZONE) return EYE_CENTER;

  // Compare on a unit scale so a far-away cursor selects the extreme drawings.
  const scale = Math.min(1, magnitude * 1.25) / magnitude;
  const x = lookX * scale;
  const y = lookY * scale;

  let best = current;
  let bestDistance = Infinity;
  EYE_FRAMES.forEach((_, index) => {
    const d = distanceTo(index, x, y);
    if (d < bestDistance) {
      best = index;
      bestDistance = d;
    }
  });

  return distanceTo(current, x, y) - bestDistance < HYSTERESIS ? current : best;
}

// The original 42-frame clip (30 fps) expressed as drawing indices, used for the idle loop.
export const EYE_SEQUENCE = [
  0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11, 11, 11, 12, 12, 13, 13,
  14, 14, 14, 15, 15, 15,
];
