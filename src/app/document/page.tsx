import Link from "next/link";

export const DocumentPage = () => {
  return (
    <div className="w-full h-full">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-800">ドキュメント</h1>
        <p className="mt-2 text-slate-600 text-sm">
          本ツールの使い方から製造・注文までをまとめています。必要なトピックを選んでご覧ください。
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/document/how-to"
            className="rounded-md border border-slate-200 p-4 hover:border-red-300 hover:text-red-500 transition"
          >
            <h2 className="font-semibold">How To</h2>
            <p className="text-sm text-slate-600">
              ボタン配置・各機能の使い方・データ生成
            </p>
          </Link>
          <Link
            href="/document/order"
            className="rounded-md border border-slate-200 p-4 hover:border-red-300 hover:text-red-500 transition"
          >
            <h2 className="font-semibold">Order</h2>
            <p className="text-sm text-slate-600">
              KiCadデータの使い方・基板注文の流れ
            </p>
          </Link>
          <Link
            href="/document/construction"
            className="rounded-md border border-slate-200 p-4 hover:border-red-300 hover:text-red-500 transition"
          >
            <h2 className="font-semibold">Construction</h2>
            <p className="text-sm text-slate-600">
              必要部品の紹介・組み立て手順
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
