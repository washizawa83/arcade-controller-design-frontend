import { ControllerButton } from "./DesignTool";

type Props = {
  button: ControllerButton;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export const SizeForm = ({ button, label, value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.valueAsNumber;
    onChange(Number.isFinite(num) ? num : 0);
  };

  return (
    <div className="flex items-center gap-2 w-20 inline-block">
      <label htmlFor={`${button.uid}-${label}`}>{label}</label>
      <input
        id={`${button.uid}-${label}`}
        className="w-full"
        type="number"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
