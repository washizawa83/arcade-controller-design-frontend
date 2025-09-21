"use client";

import { useEffect, useRef } from "react";

type ButtonSpec = {
  id: number;
  x: number; // logical x (0..300)
  y: number; // logical y (0..200)
  r: number; // logical radius
};

const LOGICAL_WIDTH = 300;
const LOGICAL_HEIGHT = 200;

// Raspberry Pi (top-left origin, logical units same as board mm)
const RASPI = { x: 137.5, y: 0, w: 25, h: 53.5 } as const;

// Mounting holes (centers), diameter 3.2 => radius 1.6
const HOLE_RADIUS = 3.2 / 2;
const MOUNTING_HOLES: Array<{ x: number; y: number; r: number }> = [
  { x: 125, y: 10, r: HOLE_RADIUS },
  { x: 10, y: 10, r: HOLE_RADIUS },
  { x: 10, y: 100, r: HOLE_RADIUS },
  { x: 10, y: 190, r: HOLE_RADIUS },
  { x: 125, y: 190, r: HOLE_RADIUS },
  { x: 175, y: 190, r: HOLE_RADIUS },
  { x: 290, y: 190, r: HOLE_RADIUS },
  { x: 290, y: 100, r: HOLE_RADIUS },
  { x: 290, y: 10, r: HOLE_RADIUS },
  { x: 175, y: 10, r: HOLE_RADIUS },
];

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable refs to avoid frequent React re-renders for canvas interaction
  const buttonsRef = useRef<ButtonSpec[]>([
    { id: 1, x: 90, y: 80, r: 8 },
    { id: 2, x: 120, y: 60, r: 8 },
  ]);
  const scaleRef = useRef<number>(1);
  const dprRef = useRef<number>(1);
  const draggingIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      const scale = scaleRef.current;
      const dpr = dprRef.current;
      // Reset transform and clear
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Apply logical scale
      ctx.scale(scale, scale);

      // Controller board background (logical 300x200)
      ctx.fillStyle = "#0f172a"; // slate-900
      ctx.strokeStyle = "#334155"; // slate-700
      ctx.lineWidth = 2 / scale; // keep visible independent of scale
      const radius = 8;
      const w = LOGICAL_WIDTH;
      const h = LOGICAL_HEIGHT;
      // rounded rect
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(w - radius, 0);
      ctx.quadraticCurveTo(w, 0, w, radius);
      ctx.lineTo(w, h - radius);
      ctx.quadraticCurveTo(w, h, w - radius, h);
      ctx.lineTo(radius, h);
      ctx.quadraticCurveTo(0, h, 0, h - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Raspberry Pi outline
      ctx.save();
      ctx.fillStyle = "rgba(34,197,94,0.15)"; // green-500 @ 15%
      ctx.strokeStyle = "#16a34a"; // green-600
      ctx.lineWidth = 2 / scale;
      ctx.beginPath();
      ctx.rect(RASPI.x, RASPI.y, RASPI.w, RASPI.h);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Mounting holes
      for (const hole of MOUNTING_HOLES) {
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
        // simulate cut-out with panel color, outline with lighter stroke
        ctx.fillStyle = "#0f172a"; // same as panel fill
        ctx.fill();
        ctx.strokeStyle = "#94a3b8"; // slate-400
        ctx.lineWidth = 1.5 / scale;
        ctx.stroke();
      }

      // Buttons
      for (const btn of buttonsRef.current) {
        ctx.beginPath();
        ctx.fillStyle = "#f87171"; // red-400
        ctx.arc(btn.x, btn.y, btn.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ef4444";
        ctx.stroke();
      }
    };

    const resize = () => {
      const parentRect = parent.getBoundingClientRect();
      const availableW = Math.max(1, Math.floor(parentRect.width));
      const availableH = Math.max(1, Math.floor(parentRect.height));
      const scaleToFit = Math.min(
        availableW / LOGICAL_WIDTH,
        availableH / LOGICAL_HEIGHT
      );

      // Display size in CSS pixels, preserved aspect ratio
      const displayW = Math.floor(LOGICAL_WIDTH * scaleToFit);
      const displayH = Math.floor(LOGICAL_HEIGHT * scaleToFit);

      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      scaleRef.current = scaleToFit;

      // Set CSS size (letterboxed if parent is larger)
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
      canvas.style.display = "block";
      canvas.style.margin = "0 auto"; // center horizontally

      // Set drawing buffer size
      canvas.width = Math.max(1, Math.floor(displayW * dpr));
      canvas.height = Math.max(1, Math.floor(displayH * dpr));

      draw();
    };

    const toLogical = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const pxX = clientX - rect.left;
      const pxY = clientY - rect.top;
      const logicalX = pxX / scaleRef.current;
      const logicalY = pxY / scaleRef.current;
      return { x: logicalX, y: logicalY };
    };

    const hitTest = (lx: number, ly: number): ButtonSpec | null => {
      for (let i = buttonsRef.current.length - 1; i >= 0; i -= 1) {
        const b = buttonsRef.current[i];
        const dx = lx - b.x;
        const dy = ly - b.y;
        const dist2 = dx * dx + dy * dy;
        const r = b.r * 1.4; // hit slop
        if (dist2 <= r * r) return b;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toLogical(e.clientX, e.clientY);
      const hit = hitTest(x, y);
      if (hit) {
        draggingIdRef.current = hit.id;
        (e.target as Element).setPointerCapture(e.pointerId);
      } else {
        // Add new button on empty area
        const id = (buttonsRef.current.at(-1)?.id ?? 0) + 1;
        buttonsRef.current.push({ id, x, y, r: 8 });
        draw();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (draggingIdRef.current == null) return;
      const { x, y } = toLogical(e.clientX, e.clientY);
      const btn = buttonsRef.current.find(
        (b) => b.id === draggingIdRef.current
      );
      if (!btn) return;
      // Clamp within logical bounds
      btn.x = Math.max(btn.r, Math.min(LOGICAL_WIDTH - btn.r, x));
      btn.y = Math.max(btn.r, Math.min(LOGICAL_HEIGHT - btn.r, y));
      draw();
    };

    const onPointerUp = (e: PointerEvent) => {
      draggingIdRef.current = null;
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />
  );
};
