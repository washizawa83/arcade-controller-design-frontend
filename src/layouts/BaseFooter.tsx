import Link from "next/link";

export const BaseFooter = () => {
  return (
    <footer
      className="w-screen border-t border-pink-500/30"
      style={{ background: "#0b1120" }}
    >
      <div className="mx-auto w-11/12 2xl:w-[1280px] py-8 text-slate-200">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-xl text-sm leading-6">
            <p className="font-semibold text-slate-100">ご利用にあたって</p>
            <p className="mt-2">
              ご利用前に必ず各ポリシーをご確認ください。ルールやデータの取り扱い、
              免責事項などを記載しています。
            </p>
          </div>

          <nav className="text-sm">
            <p className="font-semibold text-slate-100">ポリシー</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/terms" className="hover:text-pink-400">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-pink-400">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-pink-500/30 pt-4 text-xs text-slate-400">
          <p>
            免責事項:
            本サービスで不正なCADデータが出力された場合を含め、その結果に
            起因または関連して発生した一切の損害・トラブルについて、当方は責任を負いません。
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Modern Design. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
