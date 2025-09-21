import Link from "next/link";

export const BaseHeader = async () => {
  return (
    <header
      className="h-header w-screen flex items-center relative bg-white border-b border-slate-200"
      style={{ marginBottom: "var(--spacing-gap)" }}
    >
      <div className="mx-auto w-11/12 2xl:w-[1280px] flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-krona text-xl md:text-2xl tracking-tight text-slate-900">
            <Link href="/" className="text-gray-950 transition-colors">
              Modern <span className="text-red-400">Design</span>
            </Link>
          </h1>
        </div>
        <ul className="flex items-center gap-6 text-sm text-slate-700">
          <li>
            <Link
              href="/"
              className="px-2 py-1 rounded-md hover:text-red-400 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/generate"
              className="px-2 py-1 rounded-md hover:text-red-400 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30 transition-colors"
            >
              Generate
            </Link>
          </li>
          <li>
            <Link
              href="/document"
              className="px-2 py-1 rounded-md hover:text-red-400 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30 transition-colors"
            >
              Document
            </Link>
          </li>
        </ul>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-80" />
    </header>
  );
};
