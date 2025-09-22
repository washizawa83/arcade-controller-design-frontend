import Link from "next/link";

export const DocumentPage = () => {
  return (
    <div className="w-full h-full">
      <div className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
        <h1 className="text-xl font-semibold text-slate-100">ドキュメント</h1>
        <p className="mt-2 text-slate-300 text-sm">
          本ツールの使い方から製造・注文までをまとめています。必要なトピックを選んでご覧ください。
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/document/how-to"
            className="rounded-md border border-pink-500/30 p-4 bg-[rgba(15,23,42,0.6)] hover:border-pink-400 hover:text-pink-300 transition"
          >
            <h2 className="font-semibold text-slate-100">How To</h2>
            <p className="text-sm text-slate-300">
              ボタン配置・各機能の使い方・データ生成
            </p>
          </Link>
          <Link
            href="/document/order"
            className="rounded-md border border-pink-500/30 p-4 bg-[rgba(15,23,42,0.6)] hover:border-pink-400 hover:text-pink-300 transition"
          >
            <h2 className="font-semibold text-slate-100">Order</h2>
            <p className="text-sm text-slate-300">
              KiCadデータの使い方・基板注文の流れ
            </p>
          </Link>
          <Link
            href="/document/construction"
            className="rounded-md border border-pink-500/30 p-4 bg-[rgba(15,23,42,0.6)] hover:border-pink-400 hover:text-pink-300 transition"
          >
            <h2 className="font-semibold text-slate-100">Construction</h2>
            <p className="text-sm text-slate-300">
              必要部品の紹介・組み立て手順
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
