"use client";

"use client";

import { useRef } from "react";
import { Canvas } from "./Canvas";
import { ButtonList } from "./ButtonList";

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
  { id: "GPIO02", name: "UP", x: 150, y: 130, d: 30 },
  { id: "GPIO04", name: "RIGHT", x: 135.5, y: 80.4, d: 24 },
  { id: "GPIO03", name: "DOWN", x: 109.2, y: 67.5, d: 24 },
  { id: "GPIO05", name: "LEFT", x: 79.7, y: 67.6, d: 24 },
  { id: "GPIO10", name: "P1", x: 160.7, y: 68.48, d: 24 },
  { id: "GPIO11", name: "P2", x: 187.5, y: 56.7, d: 24 },
  { id: "GPIO12", name: "P3", x: 217.2, y: 56.7, d: 24 },
  { id: "GPIO13", name: "P4", x: 246.7, y: 60.5, d: 24 },
  { id: "GPIO06", name: "K1", x: 158, y: 97.8, d: 24 },
  { id: "GPIO07", name: "K2", x: 185.93, y: 86.78, d: 24 },
  { id: "GPIO08", name: "K3", x: 217, y: 86.6, d: 24 },
  { id: "GPIO09", name: "K4", x: 246.5, y: 91.6, d: 24 },
  { id: "GPIO18", name: "LS", x: 120, y: 123, d: 24 },
  { id: "GPIO19", name: "RS", x: 180, y: 123, d: 24 },
  { id: "GPIO21", name: "A2", x: 49.5, y: 74, d: 24 },
  { id: "GPIO20", name: "A1", x: 210, y: 20, d: 18 },
  { id: "GPIO17", name: "START", x: 236, y: 20, d: 18 },
  { id: "GPIO16", name: "SELECT", x: 262, y: 20, d: 18 },
];

export const DesignTool = () => {
  const storeRef = useRef<ButtonStore>(new ButtonStore(DEFAULT_BUTTONS));
  return (
    <div
      className="w-full flex gap-4"
      style={{ minHeight: "var(--spacing-content)" }}
    >
      <div className="flex-1 min-w-0">
        <Canvas store={storeRef.current} />
      </div>
      <div className="w-[200px] shrink-0">
        <ButtonList store={storeRef.current} />
      </div>
    </div>
  );
};
