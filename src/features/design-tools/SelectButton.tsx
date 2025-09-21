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
        "w-full rounded-md border px-3 py-3 text-left shadow-sm transition-colors duration-150 " +
        (isSelected
          ? "border-red-400 ring-2 ring-red-500/40"
          : "border-slate-600 hover:border-red-400") +
        " bg-slate-100/80"
      }
    >
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={(e) => {
          if (e.shiftKey) store.toggleSelected(button.uid);
          else store.setSelectedExclusive(button.uid);
        }}
      >
        <h3 className="text-sm font-semibold text-slate-600">{button.name}</h3>
        <span className="rounded bg-slate-700/60 px-2 py-0.5 text-[10px] font-mono text-slate-200">
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
