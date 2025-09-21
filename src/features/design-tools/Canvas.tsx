"use client";

import { useEffect, useRef } from "react";

type ChangeListener = () => void;

export type ButtonInit = {
  id: string; // e.g., GPIO02
  name: string; // e.g., UP
  x: number;
  y: number;
  r?: number;
};

export type ButtonSizeMm = 18 | 24 | 30;
export const BUTTON_SIZES_MM: ButtonSizeMm[] = [18, 24, 30];

export class ControllerButton {
  // internal numeric id for interaction
  uid: number;
  private _id: string;
  private _name: string;
  private _x: number;
  private _y: number;
  private _r: number;
  private listeners: Set<ChangeListener> = new Set();

  constructor(uid: number, spec: Required<ButtonInit>) {
    this.uid = uid;
    this._id = spec.id;
    this._name = spec.name;
    this._x = spec.x;
    this._y = spec.y;
    this._r = spec.r;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get r(): number {
    return this._r;
  }

  setPosition(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this.emitChange();
  }

  setRadius(r: number): void {
    this._r = r;
    this.emitChange();
  }

  setSizeMm(size: ButtonSizeMm): void {
    this._r = size / 2;
    this.emitChange();
  }

  setIdAndName(id: string, name: string): void {
    this._id = id;
    this._name = name;
    this.emitChange();
  }

  subscribe(listener: ChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emitChange(): void {
    for (const l of this.listeners) l();
  }
}

export class ButtonStore {
  private buttons: ControllerButton[] = [];
  private listeners: Set<ChangeListener> = new Set();
  private nextUid = 1;

  constructor(initial: ButtonInit[]) {
    this.reset(initial);
  }

  getAll(): ControllerButton[] {
    return this.buttons;
  }

  findByUid(uid: number | null | undefined): ControllerButton | undefined {
    if (uid == null) return undefined;
    return this.buttons.find((b) => b.uid === uid);
  }

  addButton(spec: ButtonInit): ControllerButton {
    const btn = new ControllerButton(this.nextUid++, {
      id: spec.id,
      name: spec.name,
      x: spec.x,
      y: spec.y,
      r: spec.r ?? 12,
    });
    btn.subscribe(() => this.emitChange());
    this.buttons.push(btn);
    this.emitChange();
    return btn;
  }

  reset(initial: ButtonInit[]): void {
    this.buttons = [];
    this.nextUid = 1;
    for (const it of initial) this.addButton(it);
    this.emitChange();
  }

  setButtonSize(uid: number, size: ButtonSizeMm): void {
    const btn = this.findByUid(uid);
    if (!btn) return;
    btn.setSizeMm(size);
  }

  setAllButtonSize(size: ButtonSizeMm): void {
    for (const b of this.buttons) b.setSizeMm(size);
    this.emitChange();
  }

  subscribe(listener: ChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emitChange(): void {
    for (const l of this.listeners) l();
  }

  hitTest(lx: number, ly: number): ControllerButton | null {
    for (let i = this.buttons.length - 1; i >= 0; i -= 1) {
      const b = this.buttons[i];
      const dx = lx - b.x;
      const dy = ly - b.y;
      const dist2 = dx * dx + dy * dy;
      const r = b.r * 1.4; // hit slop
      if (dist2 <= r * r) return b;
    }
    return null;
  }
}

const LOGICAL_WIDTH = 300;
const LOGICAL_HEIGHT = 200;

// Default buttons (for reset) — logical coordinates
export const DEFAULT_BUTTONS: ButtonInit[] = [
  { id: "GPIO02", name: "UP", x: 150, y: 130, r: 15 },
  { id: "GPIO04", name: "RIGHT", x: 135.5, y: 80.4, r: 12 },
  { id: "GPIO03", name: "DOWN", x: 109.2, y: 67.5, r: 12 },
  { id: "GPIO05", name: "LEFT", x: 79.7, y: 67.6, r: 12 },
  { id: "GPIO10", name: "P1", x: 160.7, y: 68.48, r: 12 },
  { id: "GPIO11", name: "P2", x: 187.5, y: 56.7, r: 12 },
  { id: "GPIO12", name: "P3", x: 217.2, y: 56.7, r: 12 },
  { id: "GPIO13", name: "P4", x: 246.7, y: 60.5, r: 12 },
  { id: "GPIO06", name: "K1", x: 158, y: 97.8, r: 12 },
  { id: "GPIO07", name: "K2", x: 185.93, y: 86.78, r: 12 },
  { id: "GPIO08", name: "K3", x: 217, y: 86.6, r: 12 },
  { id: "GPIO09", name: "K4", x: 246.5, y: 91.6, r: 12 },
  { id: "GPIO18", name: "LS", x: 120, y: 123, r: 12 },
  { id: "GPIO19", name: "RS", x: 180, y: 123, r: 12 },
  { id: "GPIO21", name: "A2", x: 49.5, y: 74, r: 12 },
  { id: "GPIO20", name: "A1", x: 210, y: 20, r: 9 },
  { id: "GPIO17", name: "START", x: 236, y: 20, r: 9 },
  { id: "GPIO16", name: "SELECT", x: 262, y: 20, r: 9 },
];

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

type CanvasProps = {
  store?: ButtonStore;
};

export const Canvas = ({ store }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store of buttons with change subscription
  const storeRef = useRef<ButtonStore>(
    store ?? new ButtonStore(DEFAULT_BUTTONS)
  );
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
      for (const btn of storeRef.current.getAll()) {
        const isSquare = btn.r === 9; // 18mm 指定は四角で描画
        ctx.beginPath();
        ctx.fillStyle = "#f87171"; // red-400
        if (isSquare) {
          const size = btn.r * 2; // 直径と同じ一辺
          ctx.rect(btn.x - btn.r, btn.y - btn.r, size, size);
        } else {
          ctx.arc(btn.x, btn.y, btn.r, 0, Math.PI * 2);
        }
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

    const hitTest = (lx: number, ly: number): ControllerButton | null => {
      return storeRef.current.hitTest(lx, ly);
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toLogical(e.clientX, e.clientY);
      const hit = hitTest(x, y);
      if (hit) {
        draggingIdRef.current = hit.uid;
        (e.target as Element).setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (draggingIdRef.current == null) return;
      const { x, y } = toLogical(e.clientX, e.clientY);
      const btn = storeRef.current.findByUid(draggingIdRef.current);
      if (!btn) return;
      // Clamp within logical bounds
      const clampedX = Math.max(btn.r, Math.min(LOGICAL_WIDTH - btn.r, x));
      const clampedY = Math.max(btn.r, Math.min(LOGICAL_HEIGHT - btn.r, y));
      btn.setPosition(clampedX, clampedY);
    };

    const onPointerUp = (e: PointerEvent) => {
      draggingIdRef.current = null;
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
    };

    // Subscribe redraw to any store/button changes (also handles future form edits)
    const unsubscribe = storeRef.current.subscribe(draw);

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
