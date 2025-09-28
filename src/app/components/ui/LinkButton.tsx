import Link from "next/link";
import { tv } from "tailwind-variants";

type Props = {
  label: string;
  href: string;
  type?: "fill" | "outline";
};

const linkButton = tv({
  base: "inline-flex items-center justify-center rounded-md",
  variants: {
    type: {
      fill: "bg-pink-500 px-5 py-3 text-white shadow-sm transition hover:bg-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50",
      outline:
        "border border-pink-500/30 bg-transparent px-5 py-3 text-slate-200 shadow-sm transition hover:border-pink-400 hover:text-pink-400",
    },
  },
  defaultVariants: {
    type: "fill",
  },
});

export const LinkButton = ({ label, href, type = "fill" }: Props) => {
  return (
    <Link href={href} className={linkButton({ type })}>
      {label}
    </Link>
  );
};
