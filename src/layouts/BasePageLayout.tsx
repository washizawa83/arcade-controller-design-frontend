import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const BasePageLayout = ({ children }: Props) => {
  return (
    <main className="w-screen">
      <div className="mx-auto w-11/12 2xl:w-[1280px]">{children}</div>
    </main>
  );
};
