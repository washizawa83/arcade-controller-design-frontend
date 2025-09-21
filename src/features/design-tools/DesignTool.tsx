"use client";

"use client";

import { useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { SelectButtonList } from "./SelectButtonList";

type ChangeListener = () => void;

export type ButtonSizeMm = 18 | 24 | 30;
export const BUTTON_SIZES_MM: ButtonSizeMm[] = [18, 24, 30];

export type ButtonInit = {
  id: string;
  name: string;
  x: number;
  y: number;
  d?: number; // diameter in mm units of the logical space (300x200)
};

export class ControllerButton {
  uid: number;
  private _id: string;
  private _name: string;
  private _x: number;
  private _y: number;
  private _d: number; // diameter
  private listeners: Set<ChangeListener> = new Set();

  constructor(uid: number, spec: Required<ButtonInit>) {
    this.uid = uid;
    this._id = spec.id;
    this._name = spec.name;
    this._x = spec.x;
    this._y = spec.y;
    this._d = spec.d;
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
  get d(): number {
    return this._d;
  }

  setPositionX(x: number): void {
    this._x = x;
    this.emitChange();
  }
  setPositionY(y: number): void {
    this._y = y;
    this.emitChange();
  }

  setPosition(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this.emitChange();
  }
  setSizeMm(size: ButtonSizeMm): void {
    this._d = size;
    this.emitChange();
  }
  setDiameter(diameter: number): void {
    this._d = diameter;
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
  private selectedSet: Set<number> = new Set();
  // Board and clearance constants (mirror Canvas)
  private readonly BOARD_W = 300;
  private readonly BOARD_H = 200;
  private readonly CLEARANCE_MM = 1;
  private readonly RASPI = { x: 137.5, y: 0, w: 25, h: 53.5 } as const;
  private readonly HOLES: Array<{ x: number; y: number; r: number }> = [
    { x: 125, y: 10, r: 3.2 / 2 },
    { x: 10, y: 10, r: 3.2 / 2 },
    { x: 10, y: 100, r: 3.2 / 2 },
    { x: 10, y: 190, r: 3.2 / 2 },
    { x: 125, y: 190, r: 3.2 / 2 },
    { x: 175, y: 190, r: 3.2 / 2 },
    { x: 290, y: 190, r: 3.2 / 2 },
    { x: 290, y: 100, r: 3.2 / 2 },
    { x: 290, y: 10, r: 3.2 / 2 },
    { x: 175, y: 10, r: 3.2 / 2 },
  ];

  constructor(initial: ButtonInit[]) {
    this.reset(initial);
  }

  getAll(): ControllerButton[] {
    return this.buttons;
  }
  getSelectedUids(): number[] {
    return Array.from(this.selectedSet);
  }
  isSelected(uid: number): boolean {
    return this.selectedSet.has(uid);
  }
  setSelectedExclusive(uid: number | null): void {
    this.selectedSet.clear();
    if (uid != null) this.selectedSet.add(uid);
    this.emitChange();
  }
  toggleSelected(uid: number): void {
    if (this.selectedSet.has(uid)) this.selectedSet.delete(uid);
    else this.selectedSet.add(uid);
    this.emitChange();
  }
  clearSelection(): void {
    if (this.selectedSet.size === 0) return;
    this.selectedSet.clear();
    this.emitChange();
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
      d: spec.d ?? 24,
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
  /** Proposed move with constraints identical to Canvas drag constraints. */
  moveWithConstraint(uid: number, targetX: number, targetY: number): void {
    const btn = this.findByUid(uid);
    if (!btn) return;
    const radius = btn.d / 2;
    let nx = targetX;
    let ny = targetY;
    const eps = 1e-3;

    const inflate = radius + this.CLEARANCE_MM;
    const left = this.RASPI.x - inflate;
    const right = this.RASPI.x + this.RASPI.w + inflate;
    const top = this.RASPI.y - inflate;
    const bottom = this.RASPI.y + this.RASPI.h + inflate;

    // Build blockers (other buttons)
    const blockers = this.buttons
      .filter((b) => b.uid !== uid)
      .map((b) => ({ x: b.x, y: b.y, r: b.d / 2 }));

    for (let iter = 0; iter < 5; iter++) {
      let moved = false;
      // 1) board clamp
      const clampX = Math.max(radius, Math.min(this.BOARD_W - radius, nx));
      const clampY = Math.max(radius, Math.min(this.BOARD_H - radius, ny));
      if (Math.abs(clampX - nx) > eps || Math.abs(clampY - ny) > eps) {
        nx = clampX;
        ny = clampY;
        moved = true;
      }
      // 2) away from raspi inflated rect
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
      // 3) away from holes
      for (const h of this.HOLES) {
        const minDist = h.r + radius + this.CLEARANCE_MM;
        const dx = nx - h.x;
        const dy = ny - h.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist - eps) {
          if (dist === 0) {
            nx = h.x + minDist;
            ny = h.y;
          } else {
            const s = minDist / dist;
            nx = h.x + dx * s;
            ny = h.y + dy * s;
          }
          moved = true;
        }
      }
      // 3b) away from other buttons
      for (const c of blockers) {
        const minDist = c.r + radius + this.CLEARANCE_MM;
        const dx = nx - c.x;
        const dy = ny - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist - eps) {
          if (dist === 0) {
            nx = c.x + minDist;
            ny = c.y;
          } else {
            const s = minDist / dist;
            nx = c.x + dx * s;
            ny = c.y + dy * s;
          }
          moved = true;
        }
      }
      // 4) re-clamp
      const againX = Math.max(radius, Math.min(this.BOARD_W - radius, nx));
      const againY = Math.max(radius, Math.min(this.BOARD_H - radius, ny));
      if (Math.abs(againX - nx) > eps || Math.abs(againY - ny) > eps) {
        nx = againX;
        ny = againY;
        moved = true;
      }
      if (!moved) break;
    }
    // snap 0.1mm
    const snap = (v: number) => Math.round(v * 10) / 10;
    btn.setPosition(snap(nx), snap(ny));
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
      const radius = (b.d / 2) * 1.4;
      if (dist2 <= radius * radius) return b;
    }
    return null;
  }
}

// Default buttons
export const DEFAULT_BUTTONS: ButtonInit[] = [
  { id: "GPIO02", name: "UP", x: 150, y: 131, d: 30 },
  { id: "GPIO04", name: "RIGHT", x: 135.5, y: 81.4, d: 24 },
  { id: "GPIO03", name: "DOWN", x: 109.2, y: 68.5, d: 24 },
  { id: "GPIO05", name: "LEFT", x: 79.7, y: 68.6, d: 24 },
  { id: "GPIO10", name: "P1", x: 160.7, y: 69.48, d: 24 },
  { id: "GPIO11", name: "P2", x: 187.5, y: 57.7, d: 24 },
  { id: "GPIO12", name: "P3", x: 217.2, y: 57.7, d: 24 },
  { id: "GPIO13", name: "P4", x: 246.7, y: 61.5, d: 24 },
  { id: "GPIO06", name: "K1", x: 158, y: 98.8, d: 24 },
  { id: "GPIO07", name: "K2", x: 185.93, y: 87.78, d: 24 },
  { id: "GPIO08", name: "K3", x: 217, y: 87.6, d: 24 },
  { id: "GPIO09", name: "K4", x: 246.5, y: 92.6, d: 24 },
  { id: "GPIO18", name: "LS", x: 120, y: 124, d: 24 },
  { id: "GPIO19", name: "RS", x: 180, y: 124, d: 24 },
  { id: "GPIO21", name: "A2", x: 49.5, y: 75, d: 24 },
  { id: "GPIO20", name: "A1", x: 210, y: 20, d: 18 },
  { id: "GPIO17", name: "START", x: 236, y: 20, d: 18 },
  { id: "GPIO16", name: "SELECT", x: 262, y: 20, d: 18 },
];

export const DesignTool = () => {
  const storeRef = useRef<ButtonStore>(new ButtonStore(DEFAULT_BUTTONS));
  const [showMarkers, setShowMarkers] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const BACKEND_BASE =
    (typeof window !== "undefined" &&
      (window as any).NEXT_PUBLIC_BACKEND_BASE) ||
    process.env.NEXT_PUBLIC_BACKEND_BASE ||
    "http://localhost:8000";

  const handleGenerate = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const switches = storeRef.current.getAll().map((b) => ({
        x_mm: b.x,
        y_mm: b.y,
        rotation_deg: 0,
        ref: b.id,
        size: b.d,
      }));
      const payload = { switches, units: "mm" };
      const res = await fetch(
        `${BACKEND_BASE}/api/v1/pcb/generate-design-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/zip,application/octet-stream",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Request failed: ${res.status} ${text}`);
      }
      // Download returned KiCad project (zip or binary)
      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") || "";
      const match = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
      const filename =
        (match && (decodeURIComponent(match[1] || match[2]) || "")) ||
        "design-data.zip";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (err) {
      console.error(err);
      alert("送信に失敗しました。バックエンドが起動しているかご確認ください。");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div
      className="w-full flex gap-4"
      style={{ minHeight: "var(--spacing-content)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between pb-2">
          <div>
            <button
              className="ml-2 rounded-md border border-slate-400/60 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 shadow-sm transition-colors hover:border-sky-400 hover:text-slate-900 disabled:opacity-50"
              onClick={handleGenerate}
              disabled={isSending}
            >
              {isSending ? "送信中..." : "基盤データを生成"}
            </button>
          </div>
          <div>
            <button
              className="rounded-md border border-slate-400/60 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 shadow-sm transition-colors hover:border-sky-400 hover:text-slate-900"
              onClick={() => storeRef.current.reset(DEFAULT_BUTTONS)}
              type="button"
            >
              初期配置に戻す
            </button>
            <button
              className="ml-2 rounded-md border border-slate-400/60 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 shadow-sm transition-colors hover:border-sky-400 hover:text-slate-900"
              onClick={() => setShowMarkers((v) => !v)}
              type="button"
            >
              {showMarkers ? "目印を隠す" : "目印を表示"}
            </button>
            <button
              className="ml-2 rounded-md border border-slate-400/60 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 shadow-sm transition-colors hover:border-sky-400 hover:text-slate-900"
              onClick={() => setShowLabels((v) => !v)}
              type="button"
            >
              {showLabels ? "ボタン名を隠す" : "ボタン名を表示"}
            </button>
          </div>
        </div>
        <Canvas
          store={storeRef.current}
          showMarkers={showMarkers}
          showLabels={showLabels}
        />
      </div>
      <div className="w-[270px] shrink-0">
        <SelectButtonList store={storeRef.current} />
      </div>
    </div>
  );
};
