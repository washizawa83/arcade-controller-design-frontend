import Link from "next/link";

export const BaseHeader = async () => {
  return (
    <header className="h-header w-screen items-center flex items-center">
      <div className="mx-auto flex w-11/12 items-center justify-between 2xl:w-[1280px]">
        <div>
          <h1 className="font-krona text-xl">
            <Link href="/">
              Modern <span className="text-red-400">Design</span>
            </Link>
          </h1>
        </div>
        <ul className="flex items-center text-lg">
          <li className="ml-10">
            <Link href="/">Home</Link>
          </li>
          <li className="ml-10">
            <Link href="/generate">Generate</Link>
          </li>
          <li className="ml-10">
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
