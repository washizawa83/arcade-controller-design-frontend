import { HeaderMenuLink } from "@/app/components/ui/HeaderMenuLink";
import Link from "next/link";

export const BaseHeader = async () => {
  return (
    <header
      className="h-header w-screen flex items-center relative border-b border-pink-500/30"
      style={{
        marginBottom: "var(--spacing-gap)",
        background:
          "radial-gradient(1200px 200px at 50% 0, rgba(255,53,93,0.18), transparent), #0b1120",
      }}
    >
      <div className="mx-auto w-11/12 2xl:w-[1280px] flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl tracking-wide text-slate-100 [font-family:var(--font-brand)]">
            <Link href="/" className="hover:text-pink-400 transition-colors">
              Modern <span className="text-pink-400">Design</span>
            </Link>
          </h1>
        </div>
        <ul className="flex items-center gap-6 text-sm text-slate-200">
          <li>
            <HeaderMenuLink label="Home" href="/" />
          </li>
          <li>
            <HeaderMenuLink label="Generate" href="/generate" />
          </li>
          <li>
            <HeaderMenuLink label="Document" href="/document" />
          </li>
        </ul>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80" />
    </header>
  );
};
