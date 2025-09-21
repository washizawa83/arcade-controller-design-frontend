import Link from "next/link";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6"
      style={{ minHeight: "var(--spacing-content)" }}
    >
      <aside className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 h-full overflow-auto">
        <nav className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              How To
            </p>
            <ul className="mt-1 space-y-1">
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/how-to#place"
                >
                  ボタン配置方法
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/how-to#features"
                >
                  各機能の使い方
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/how-to#export"
                >
                  基盤データの生成
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Order
            </p>
            <ul className="mt-1 space-y-1">
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/order#kicad"
                >
                  出力されたKiCadデータの使用方法
                </Link>
              </li>
              <li>
                <Link className="hover:text-red-400" href="/document/order#pcb">
                  基盤の注文方法
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Construction
            </p>
            <ul className="mt-1 space-y-1">
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/construction#parts"
                >
                  必要な部品の紹介
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-red-400"
                  href="/document/construction#build"
                >
                  組み立て方法
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}
