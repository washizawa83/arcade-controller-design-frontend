"use client";

import { useEffect, useRef } from "react";
import { ButtonStore, ControllerButton } from "./DesignTool";

const LOGICAL_WIDTH = 300;
const LOGICAL_HEIGHT = 200;

// Default buttons (kept in DesignTool now)

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

type Props = {
  store: ButtonStore;
};

export const Canvas = ({ store }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store of buttons with change subscription
  const storeRef = useRef(store);
  const scaleRef = useRef<number>(1);
  const dprRef = useRef<number>(1);
  const draggingIdRef = useRef<number | null>(null);
  const selectedIdRef = useRef<number | null>(null);

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
      for (const btn of storeRef.current.getAll()) {
        const radius = btn.d / 2;
        const isSquare = radius === 9; // 18mm 指定は四角で描画
        const isSelected = selectedIdRef.current === btn.uid;
        ctx.beginPath();
        ctx.fillStyle = "#f87171"; // red-400
        if (isSquare) {
          const size = btn.d; // 直径と同じ一辺
          ctx.rect(btn.x - radius, btn.y - radius, size, size);
        } else {
          ctx.arc(btn.x, btn.y, radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.strokeStyle = isSelected ? "#ffb1b1" : "#ef4444"; // selected: amber-500
        ctx.lineWidth = isSelected ? 3 / scale : 1.5 / scale;
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

    const hitTest = (lx: number, ly: number): ControllerButton | null => {
      return storeRef.current.hitTest(lx, ly);
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toLogical(e.clientX, e.clientY);
      const hit = hitTest(x, y);
      if (hit) {
        // If already selected, begin dragging; else just select
        if (selectedIdRef.current === hit.uid) {
          draggingIdRef.current = hit.uid;
          (e.target as Element).setPointerCapture(e.pointerId);
        } else {
          selectedIdRef.current = hit.uid;
          draw();
        }
      } else {
        // Clicked empty area: clear selection
        if (selectedIdRef.current !== null) {
          selectedIdRef.current = null;
          draw();
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (draggingIdRef.current == null) return;
      const { x, y } = toLogical(e.clientX, e.clientY);
      const btn = storeRef.current.findByUid(draggingIdRef.current);
      if (!btn) return;
      // Clamp within logical bounds
      const radius = btn.d / 2;
      const clampedX = Math.max(radius, Math.min(LOGICAL_WIDTH - radius, x));
      const clampedY = Math.max(radius, Math.min(LOGICAL_HEIGHT - radius, y));
      btn.setPosition(clampedX, clampedY);
    };

    const onPointerUp = (e: PointerEvent) => {
      draggingIdRef.current = null;
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
    };

    // Clicking outside the canvas clears selection
    const onWindowPointerDown = (e: PointerEvent) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      if (!canvasEl.contains(e.target as Node)) {
        if (selectedIdRef.current !== null) {
          selectedIdRef.current = null;
          draw();
        }
      }
    };

    // Subscribe redraw to any store/button changes (also handles future form edits)
    const unsubscribe = storeRef.current.subscribe(draw);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointerdown", onWindowPointerDown, {
      capture: true,
    });

    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerdown", onWindowPointerDown, {
        capture: true,
      } as any);
      unsubscribe();
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
