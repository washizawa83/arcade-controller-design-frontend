import { PositionForm } from "./PositionForm";
import { SizeForm } from "./SizeForm";
import { ButtonStore, ControllerButton } from "./DesignTool";

type Props = {
  button: ControllerButton;
  store: ButtonStore;
};

export const SelectButton = ({ button, store }: Props) => {
  const isSelected = store.isSelected(button.uid);
  return (
    <div
      className={
        "w-full rounded-md border px-3 py-3 text-left shadow-[0_0_6px_rgba(255,53,93,0.25)] transition-colors duration-150 " +
        (isSelected
          ? "border-pink-400 ring-2 ring-pink-500/30"
          : "border-pink-500/30 hover:border-pink-400") +
        " bg-[rgba(15,23,42,0.6)]"
      }
    >
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={(e) => {
          if (e.shiftKey) store.toggleSelected(button.uid);
          else store.setSelectedExclusive(button.uid);
        }}
      >
        <h3 className="text-sm font-semibold text-slate-100">{button.name}</h3>
        <span className="rounded bg-pink-500/20 border border-pink-500/30 px-2 py-0.5 text-[10px] font-mono text-pink-100">
          {button.id}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 min-w-0">
        <div className="min-w-0">
          <PositionForm
            button={button}
            label="X"
            value={button.x}
            onChange={(value) => button.setPositionX(value)}
            store={store}
          />
        </div>
        <div className="min-w-0">
          <PositionForm
            button={button}
            label="Y"
            value={button.y}
            onChange={(value) => button.setPositionY(value)}
            store={store}
          />
        </div>
        <div className="min-w-0">
          <SizeForm
            button={button}
            label="Size"
            value={button.d}
            onChange={(value) => button.setDiameter(value)}
          />
        </div>
      </div>
    </div>
  );
};
