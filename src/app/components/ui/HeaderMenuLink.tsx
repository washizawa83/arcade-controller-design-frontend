import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export const HeaderMenuLink = ({ label, href }: Props) => {
  return (
    <Link
      href={href}
      className="px-2 py-1 rounded-md hover:text-pink-400 hover:bg-pink-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/30 transition-colors"
    >
      {label}
    </Link>
  );
};
