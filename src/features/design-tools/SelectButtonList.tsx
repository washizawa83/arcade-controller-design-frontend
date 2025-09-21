import { ButtonStore } from "./DesignTool";
import { useEffect, useRef, useState } from "react";
import { PositionForm } from "./PositionForm";
import { SizeForm } from "./SizeForm";
import { SelectButton } from "./SelectButton";

type Props = {
  store: ButtonStore;
};

export const SelectButtonList = ({ store }: Props) => {
  const [, force] = useState(0);
  const [selectedUids, setSelectedUids] = useState<number[]>(
    store.getSelectedUids()
  );
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({});

  useEffect(() => {
    const unsub = store.subscribe(() => {
      force((v) => v + 1);
      setSelectedUids(store.getSelectedUids());
    });
    return unsub;
  }, [store]);

  useEffect(() => {
    if (selectedUids.length === 0) return;
    const last = selectedUids[selectedUids.length - 1];
    const el = itemRefs.current[last];
    if (el) {
      el.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedUids]);
  return (
    <ul
      className="overflow-y-auto w-full"
      style={{ maxHeight: "var(--spacing-content)" }}
    >
      {store.getAll().map((button) => (
        <li
          key={button.uid}
          ref={(el) => {
            itemRefs.current[button.uid] = el;
          }}
          className="p-1"
        >
          <SelectButton button={button} store={store} />
        </li>
      ))}
    </ul>
  );
};
