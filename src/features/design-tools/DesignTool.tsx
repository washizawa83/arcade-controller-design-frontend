"use client";

import { useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { SelectButtonList } from "./SelectButtonList";
import { NeonButton } from "@/app/components/ui/NeonButton";
import { ConfirmDialog } from "@/app/components/ui/ConfirmDialog";
import { generateData } from "@/app/service/api";

type ChangeListener = () => void;

export type ButtonSizeMm = 18 | 24 | 30;
export const BUTTON_SIZES_MM: ButtonSizeMm[] = [18, 24, 30];

// Map nominal sizes (label) to actual drawn/used diameters
export const NOMINAL_TO_ACTUAL: Record<ButtonSizeMm, number> = {
  18: 18,
  24: 20.7,
  30: 26.0,
};

export const nominalFromDiameter = (d: number): ButtonSizeMm => {
  // Choose the closest actual to the given diameter
  const pairs: Array<[ButtonSizeMm, number]> = [
    [18, NOMINAL_TO_ACTUAL[18]],
    [24, NOMINAL_TO_ACTUAL[24]],
    [30, NOMINAL_TO_ACTUAL[30]],
  ];
  let best: ButtonSizeMm = 24;
  let bestDiff = Infinity;
  for (const [label, actual] of pairs) {
    const diff = Math.abs(d - actual);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = label;
    }
  }
  return best;
};

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
    // Convert nominal to actual diameter
    this._d = NOMINAL_TO_ACTUAL[size];
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
      // If provided diameter matches a nominal label, convert to actual
      d:
        spec.d === 18 || spec.d === 24 || spec.d === 30
          ? NOMINAL_TO_ACTUAL[spec.d as ButtonSizeMm]
          : (spec.d ?? NOMINAL_TO_ACTUAL[24]),
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleGenerate = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const controllerButtons = storeRef.current.getAll();
      const switches = controllerButtons.map((b) => ({
        x_mm: b.x,
        y_mm: b.y,
        rotation_deg: 0,
        ref: b.id,
        // Send nominal size (18/24/30) to API
        size: nominalFromDiameter(b.d),
      }));
      const { filename, base64, contentType } = await generateData(switches);

      // Create Blob from base64 and trigger download
      const blob = await fetch(`data:${contentType};base64,${base64}`).then(
        (r) => r.blob()
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "design-data.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (err) {
      console.error(err);
      alert("生成に失敗しました。時間を置いて再度生成してください。");
    } finally {
      setIsSending(false);
    }
  };

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);
  const confirmAndGenerate = async () => {
    setConfirmOpen(false);
    await handleGenerate();
  };

  return (
    <div
      className="w-full flex flex-col md:flex-row gap-4"
      style={{ minHeight: "var(--spacing-content)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pb-2">
          <div className="w-full md:w-auto">
            <NeonButton
              className="w-full md:w-40"
              onClick={openConfirm}
              disabled={isSending}
              variant="primary"
              color="green"
            >
              {isSending ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-emerald-200 border-t-transparent" />
                  生成中...
                </span>
              ) : (
                "基板データを生成"
              )}
            </NeonButton>
          </div>
          <div className="flex w-full md:w-auto flex-col md:flex-row gap-2">
            <NeonButton
              className="w-full md:w-40"
              onClick={() => storeRef.current.reset(DEFAULT_BUTTONS)}
            >
              初期配置に戻す
            </NeonButton>
            <NeonButton
              className="w-full md:w-40"
              onClick={() => setShowMarkers((v) => !v)}
            >
              {showMarkers ? "目印を隠す" : "目印を表示"}
            </NeonButton>
            <NeonButton
              className="w-full md:w-40"
              onClick={() => setShowLabels((v) => !v)}
            >
              {showLabels ? "ボタン名を隠す" : "ボタン名を表示"}
            </NeonButton>
          </div>
        </div>
        <Canvas
          store={storeRef.current}
          showMarkers={showMarkers}
          showLabels={showLabels}
        />
      </div>
      <div className="w-full md:w-[270px] shrink-0">
        <SelectButtonList store={storeRef.current} />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="確認"
        message="この機能はデモ段階です。実機での動作検証は未完了ですが、基板データを生成しますか？"
        confirmLabel="生成する"
        cancelLabel="やめる"
        onConfirm={confirmAndGenerate}
        onCancel={closeConfirm}
        busy={isSending}
      />
    </div>
  );
};
