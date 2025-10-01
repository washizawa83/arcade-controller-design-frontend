import { ButtonStore, ControllerButton } from "./DesignTool";
import { useEffect, useState } from "react";

type Props = {
  button: ControllerButton;
  label: string;
  value: number;
  onChange: (value: number) => void;
  store?: ButtonStore;
};

export const PositionForm = ({
  button,
  label,
  value,
  onChange,
  store,
}: Props) => {
  const [text, setText] = useState<string>(String(value));

  // Sync external value into input when it changes (e.g., drag)
  useEffect(() => {
    const rounded = Math.round(value * 10) / 10;
    const asText = String(rounded);
    if (asText !== text) setText(asText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const commit = () => {
    if (text === "") {
      // revert to last valid value if empty
      setText(String(value));
      return;
    }
    const num = Number(text);
    if (!Number.isFinite(num)) {
      // invalid -> revert
      setText(String(value));
      return;
    }
    const rounded = Math.round(num * 10) / 10;
    if (store) {
      if (label === "X")
        store.moveWithConstraint(button.uid, rounded, button.y);
      else if (label === "Y")
        store.moveWithConstraint(button.uid, button.x, rounded);
    } else {
      onChange(rounded);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    // Only update local text while editing; do not commit yet
    setText(next);
  };

  const handleBlur = () => {
    commit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
      // Do not blur forcibly; let user continue if needed.
    }
  };

  return (
    <div className="inline-flex w-[76px] flex-col gap-1">
      <label
        htmlFor={`${button.uid}-${label}`}
        className="text-[10px] uppercase tracking-wide text-slate-300"
      >
        {label}
      </label>
      <input
        id={`${button.uid}-${label}`}
        className="h-8 w-full rounded-md border border-slate-700 bg-slate-900/40 px-2 text-slate-100 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
        type="number"
        step="0.1"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={text}
      />
    </div>
  );
};
