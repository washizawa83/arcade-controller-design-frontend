import { ButtonStore } from "./DesignTool";
import { useEffect, useState } from "react";
import { SizeForm } from "./SizeForm";

type Props = {
  store: ButtonStore;
};

export const ButtonList = ({ store }: Props) => {
  const [, force] = useState(0);
  useEffect(() => {
    const unsub = store.subscribe(() => force((v) => v + 1));
    return unsub;
  }, [store]);
  return (
    <ul
      className="overflow-y-auto w-full"
      style={{ maxHeight: "var(--spacing-content)" }}
    >
      {store.getAll().map((button) => (
        <li key={button.uid} className="px-2 py-4">
          <h3 className="text-sm font-bold">{button.name}</h3>
          <div className="flex items-center gap-2">
            <SizeForm
              button={button}
              label="X"
              value={button.x}
              onChange={(value) => button.setPositionX(value)}
            />
            <SizeForm
              button={button}
              label="Y"
              value={button.y}
              onChange={(value) => button.setPositionY(value)}
            />
            <SizeForm
              button={button}
              label="Size"
              value={button.d}
              onChange={(value) => button.setDiameter(value)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
