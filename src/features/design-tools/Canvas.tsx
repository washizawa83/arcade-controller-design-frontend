"use client";

import { useEffect, useRef } from "react";
import { ButtonStore, ControllerButton, DEFAULT_BUTTONS } from "./DesignTool";

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
  showMarkers?: boolean;
};

export const Canvas = ({ store, showMarkers = true }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store of buttons with change subscription
  const storeRef = useRef(store);
  const scaleRef = useRef<number>(1);
  const dprRef = useRef<number>(1);
  const draggingIdRef = useRef<number | null>(null);
  const isDraggingGroupRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragSnapshotRef = useRef<
    Array<{ uid: number; x: number; y: number; radius: number }>
  >([]);
  const blockerCirclesRef = useRef<Array<{ x: number; y: number; r: number }>>(
    []
  );
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

      // Mounting holes (filled circles)
      for (const hole of MOUNTING_HOLES) {
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
        ctx.fillStyle = "#94a3b8"; // slate-400
        ctx.fill();
        ctx.strokeStyle = "#334155"; // slate-700 border
        ctx.lineWidth = 1 / scale;
        ctx.stroke();
      }

      // Default position markers (solid circles or squares for 18mm)
      if (showMarkers) {
        ctx.save();
        ctx.setLineDash([]);
        ctx.strokeStyle = "#38bdf8"; // sky-400
        ctx.lineWidth = 1 / scale;
        for (const def of DEFAULT_BUTTONS) {
          const radius = (def.d ?? 24) / 2;
          ctx.beginPath();
          if (radius === 9) {
            const size = radius * 2;
            ctx.rect(def.x - radius, def.y - radius, size, size);
          } else {
            ctx.arc(def.x, def.y, radius, 0, Math.PI * 2);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // Keep selected uid from store
      const selected = storeRef.current.getSelectedUids();
      selectedIdRef.current = selected.length === 1 ? selected[0] : null;

      // Buttons
      for (const btn of storeRef.current.getAll()) {
        const radius = btn.d / 2;
        const isSquare = radius === 9; // 18mm 指定は四角で描画
        const isSelected = storeRef.current.isSelected(btn.uid);
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
        // If already selected (among possibly many), begin dragging as a group; else select
        if (storeRef.current.isSelected(hit.uid)) {
          draggingIdRef.current = hit.uid;
          isDraggingGroupRef.current = true;
          dragStartRef.current = { x, y };
          // snapshot selected buttons' start positions and radii
          dragSnapshotRef.current = storeRef.current
            .getSelectedUids()
            .map((uid) => {
              const b = storeRef.current.findByUid(uid)!;
              return { uid, x: b.x, y: b.y, radius: b.d / 2 };
            });
          // prepare blockers (non-selected buttons)
          const selectedSet = new Set(storeRef.current.getSelectedUids());
          blockerCirclesRef.current = storeRef.current
            .getAll()
            .filter((b) => !selectedSet.has(b.uid))
            .map((b) => ({ x: b.x, y: b.y, r: b.d / 2 }));
          (e.target as Element).setPointerCapture(e.pointerId);
        } else {
          if (e.shiftKey) storeRef.current.toggleSelected(hit.uid);
          else storeRef.current.setSelectedExclusive(hit.uid);
        }
      } else {
        // Clicked empty area: clear selection
        storeRef.current.clearSelection();
      }
    };

    const CLEARANCE_MM = 1;

    const constrainPosition = (
      x: number,
      y: number,
      radius: number,
      blockers: Array<{ x: number; y: number; r: number }>
    ): { x: number; y: number } => {
      let nx = x;
      let ny = y;
      const eps = 1e-3;

      // Precompute inflated RPi rect
      const inflate = radius + CLEARANCE_MM;
      const left = RASPI.x - inflate;
      const right = RASPI.x + RASPI.w + inflate;
      const top = RASPI.y - inflate;
      const bottom = RASPI.y + RASPI.h + inflate;

      // Iterate a few times to resolve interactions between constraints
      for (let iter = 0; iter < 5; iter++) {
        let moved = false;

        // 1) Clamp to board edges first
        const clampedX = Math.max(radius, Math.min(LOGICAL_WIDTH - radius, nx));
        const clampedY = Math.max(
          radius,
          Math.min(LOGICAL_HEIGHT - radius, ny)
        );
        if (Math.abs(clampedX - nx) > eps || Math.abs(clampedY - ny) > eps) {
          nx = clampedX;
          ny = clampedY;
          moved = true;
        }

        // 2) Keep away from Raspberry Pi inflated rectangle
        if (nx > left && nx < right && ny > top && ny < bottom) {
          const dl = Math.abs(nx - left);
          const dr = Math.abs(right - nx);
          const dt = Math.abs(ny - top);
          const db = Math.abs(bottom - ny);
          const min = Math.min(dl, dr, dt, db);
          if (min === dl) nx = left;
          else if (min === dr) nx = right;
          else if (min === dt) ny = top;
          else ny = bottom;
          moved = true;
        }

        // 3) Keep away from mounting holes (circle-circle separation)
        for (const hole of MOUNTING_HOLES) {
          const minDist = hole.r + radius + CLEARANCE_MM;
          const dx = nx - hole.x;
          const dy = ny - hole.y;
          const dist = Math.hypot(dx, dy);
          if (dist < minDist - eps) {
            if (dist === 0) {
              nx = hole.x + minDist;
              ny = hole.y;
            } else {
              const scale = minDist / dist;
              nx = hole.x + dx * scale;
              ny = hole.y + dy * scale;
            }
            moved = true;
          }
        }

        // 3b) Keep away from other buttons treated as circles
        for (const c of blockers) {
          const minDist = c.r + radius + CLEARANCE_MM;
          const dx = nx - c.x;
          const dy = ny - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist < minDist - eps) {
            if (dist === 0) {
              nx = c.x + minDist;
              ny = c.y;
            } else {
              const scale = minDist / dist;
              nx = c.x + dx * scale;
              ny = c.y + dy * scale;
            }
            moved = true;
          }
        }

        // 4) Re-clamp to edges after hole push
        const againX = Math.max(radius, Math.min(LOGICAL_WIDTH - radius, nx));
        const againY = Math.max(radius, Math.min(LOGICAL_HEIGHT - radius, ny));
        if (Math.abs(againX - nx) > eps || Math.abs(againY - ny) > eps) {
          nx = againX;
          ny = againY;
          moved = true;
        }

        if (!moved) break;
      }

      return { x: nx, y: ny };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingGroupRef.current || draggingIdRef.current == null) return;
      const { x, y } = toLogical(e.clientX, e.clientY);
      if (!dragStartRef.current) return;
      const dx = x - dragStartRef.current.x;
      const dy = y - dragStartRef.current.y;
      const snap = (v: number) => Math.round(v * 10) / 10;
      for (const item of dragSnapshotRef.current) {
        const b = storeRef.current.findByUid(item.uid);
        if (!b) continue;
        const nx = item.x + dx;
        const ny = item.y + dy;
        const constrained = constrainPosition(
          nx,
          ny,
          item.radius,
          blockerCirclesRef.current
        );
        b.setPosition(snap(constrained.x), snap(constrained.y));
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      draggingIdRef.current = null;
      isDraggingGroupRef.current = false;
      dragStartRef.current = null;
      dragSnapshotRef.current = [];
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
  }, [showMarkers]);

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
