import { BUTTON_SIZES_MM, ButtonSizeMm, ControllerButton } from "./DesignTool";

type Props = {
  button: ControllerButton;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export const SizeForm = ({ button, label, value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = Number(e.target.value);
    if (!BUTTON_SIZES_MM.includes(num as ButtonSizeMm)) return;
    onChange(num);
  };
  return (
    <div className="inline-flex w-[70px] flex-col gap-1">
      <label
        htmlFor={`${button.uid}-${label}`}
        className="text-[10px] uppercase tracking-wide text-slate-700"
      >
        {label}
      </label>
      <select
        id={`${button.uid}-${label}`}
        className="h-8 w-full rounded-md border border-slate-700 bg-slate-900/40 px-2 text-slate-100 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
        onChange={handleChange}
        value={value}
      >
        {BUTTON_SIZES_MM.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
