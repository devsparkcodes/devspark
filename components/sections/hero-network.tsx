"use client";

import { useEffect, useRef } from "react";

type Particle = {
  /** Base position, normalized to the box: x/y in [-1, 1], z in [-1, 1]. */
  x: number;
  y: number;
  z: number;
  /** Sinusoidal drift: frequency and phase (motion without integration). */
  fx: number;
  fy: number;
  ph: number;
  accent: boolean;
  r: number;
  /** Written every frame by `draw`. */
  sx: number;
  sy: number;
  s: number;
  a: number;
};

const DEPTH_HALF = 180; // world units (px) — half the field depth
const FOV = 540;
const ROT_SPEED = 0.000045; // rad/ms → one slow lap ≈ 140 s
const AMP = 0.045; // wobble amplitude in normalized units
const LINE_LEVELS = [0.05, 0.1, 0.17, 0.24]; // quantized line alphas

/**
 * Ambient node-and-edge network behind the hero.
 *
 * Design constraints (docs/02 + docs/06):
 *  - decorative: `aria-hidden`, `pointer-events: none`, never intercepts input
 *  - one restrained scene (hero only), palette: ink / accent / neutral
 *  - subtle pointer parallax on fine-pointer desktop pointers
 *  - reduced motion → one static frame; no JS → nothing renders (the
 *    existing `.grid-fade` static grid is the fallback)
 *  - pauses when the tab is hidden or the hero is off-screen
 *  - imperative draw loop: zero React state, zero re-renders, no
 *    pre-hydration DOM writes (React 19 diffs all attributes)
 */
export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let width = 1;
    let height = 1;
    let particles: Particle[] = [];
    let rot = 0;
    let time = 0;
    let rafId = 0;
    let running = false;
    let inView = true;
    let lastT = 0;
    let lastDraw = 0;
    let px = 0;
    let py = 0;
    let targetPX = 0;
    let targetPY = 0;
    let rect = canvas.getBoundingClientRect();

    function targetCount() {
      let n = Math.round((width * height) / 17000);
      n = Math.max(34, Math.min(84, n));
      if (width < 640) n = Math.max(40, Math.round(n * 0.9));
      if ((navigator.hardwareConcurrency ?? 8) <= 2) n = Math.round(n * 0.6);
      return n;
    }

    function seed(count: number) {
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        fx: 0.00012 + Math.random() * 0.00016,
        fy: 0.00012 + Math.random() * 0.00016,
        ph: Math.random() * Math.PI * 2,
        accent: i % 6 === 0,
        r: 1.5 + Math.random() * 0.6,
        sx: 0,
        sy: 0,
        s: 1,
        a: 1,
      }));
    }

    function resize() {
      if (!canvas || !ctx) return;
      rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = targetCount();
      if (particles.length === 0 || Math.abs(count - particles.length) > 8) {
        seed(count);
      }
      if (reduceQuery.matches) draw();
    }

    function draw() {
      const c = ctx;
      if (!c) return;
      c.clearRect(0, 0, width, height);

      const cx = width * 0.55 + px;
      const cy = height * 0.45 + py;
      const xHalf = width * 0.62;
      const yHalf = height * 0.62;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const th = width < 640 ? 110 : Math.max(90, Math.min(150, width * 0.14));

      // Project every particle (position → screen, depth → scale/alpha).
      for (const p of particles) {
        const wx = p.x + Math.sin(time * p.fx + p.ph) * AMP;
        const wy = p.y + Math.cos(time * p.fy + p.ph) * AMP * 0.7;
        const rx = wx * cosR - p.z * sinR;
        const rz = wx * sinR + p.z * cosR;
        const denom = FOV + rz * DEPTH_HALF + DEPTH_HALF;
        const s = FOV / Math.max(denom, 120);
        p.s = s;
        p.sx = cx + rx * xHalf * s;
        p.sy = cy + wy * yHalf * s;
        const far = (rz + 1.42) / 2.84; // 0 = near, 1 = far
        p.a = 1 - 0.62 * far;
      }

      // Edges: quantized alpha buckets so all lines stroke in 4 batches.
      const buckets: number[][] = [[], [], [], []];
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = b.sx - a.sx;
          const dy = b.sy - a.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 >= th * th) continue;
          const closeness = 1 - Math.sqrt(d2) / th;
          const alpha = closeness * Math.min(a.a, b.a) * 0.24;
          let best = 0;
          let bestDiff = Infinity;
          for (let k = 0; k < LINE_LEVELS.length; k++) {
            const diff = Math.abs(LINE_LEVELS[k] - alpha);
            if (diff < bestDiff) {
              bestDiff = diff;
              best = k;
            }
          }
          const bucket = buckets[best];
          bucket.push(a.sx, a.sy, b.sx, b.sy);
        }
      }
      for (let k = 0; k < buckets.length; k++) {
        const bucket = buckets[k];
        if (bucket.length === 0) continue;
        c.strokeStyle = `rgba(17, 17, 17, ${LINE_LEVELS[k]})`;
        c.lineWidth = 1;
        c.beginPath();
        for (let m = 0; m < bucket.length; m += 4) {
          c.moveTo(bucket[m], bucket[m + 1]);
          c.lineTo(bucket[m + 2], bucket[m + 3]);
        }
        c.stroke();
      }

      // Nodes.
      for (const p of particles) {
        const r = Math.max(p.accent ? 1.4 : 1, p.r * p.s);
        c.fillStyle = p.accent
          ? `rgba(255, 101, 0, ${0.5 * p.a})`
          : `rgba(17, 17, 17, ${0.32 * p.a})`;
        c.beginPath();
        c.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        c.fill();
      }
    }

    function loop(t: number) {
      rafId = requestAnimationFrame(loop);
      // ~30 fps on small screens.
      if (width < 640 && t - lastDraw < 32) return;
      const dt = Math.min(t - (lastT || t), 60);
      lastT = t;
      lastDraw = t;
      time += dt;
      rot += dt * ROT_SPEED;
      px += (targetPX - px) * 0.05;
      py += (targetPY - py) * 0.05;
      draw();
    }

    function shouldRun() {
      return !reduceQuery.matches && inView && !document.hidden;
    }

    function start() {
      if (running || !shouldRun()) return;
      running = true;
      lastT = 0;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onPointerMove(event: PointerEvent) {
      if (reduceQuery.matches || !finePointer.matches || width < 768) return;
      targetPX =
        ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 32;
      targetPY =
        ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 24;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onMotionChange() {
      if (reduceQuery.matches) {
        stop();
        targetPX = 0;
        targetPY = 0;
        draw();
      } else {
        start();
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const intersection = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    intersection.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reduceQuery.addEventListener("change", onMotionChange);
    start();

    return () => {
      stop();
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      reduceQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 net-fade"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
