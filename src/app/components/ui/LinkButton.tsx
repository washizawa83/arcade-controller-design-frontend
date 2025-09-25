import Link from "next/link";

type Props = {
  label: string;
  href: string;
  type?: "fill" | "outline";
};

export const LinkButton = ({ label, href, type = "fill" }: Props) => {
  return (
    <Link
      href={href}
      className={
        type === "fill"
          ? "inline-flex items-center justify-center rounded-md bg-pink-500 px-5 py-3 text-white shadow-sm transition hover:bg-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50"
          : "inline-flex items-center justify-center rounded-md border border-pink-500/30 bg-transparent px-5 py-3 text-slate-200 shadow-sm transition hover:border-pink-400 hover:text-pink-400"
      }
    >
      {label}
    </Link>
  );
};
