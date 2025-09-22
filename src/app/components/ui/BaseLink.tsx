import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export const BaseLink = ({ href, label }: Props) => {
  return (
    <Link
      href={href}
      className="text-pink-400 border-b border-pink-400 hover:border-pink-300 hover:border-b-2"
    >
      {label}
    </Link>
  );
};
