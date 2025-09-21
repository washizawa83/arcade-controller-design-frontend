import Image from "next/image";
import Link from "next/link";

export default function HowToPage() {
  const placeId = "place";
  const featuresId = "features";
  const exportId = "export";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
        How To
      </h1>
      <p className="mt-2 text-slate-600 text-sm md:text-base">
        このページでは、ボタン配置から主要機能の使い方、データの出力まで一通りの操作を説明します。
      </p>

      <section id={placeId} className="mt-6">
        <h2 className="text-lg font-semibold text-slate-800">
          ボタン配置について
        </h2>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          <Link href="/generate" className="text-red-400">
            基盤生成画面
          </Link>
          からボタン配置と基盤データの生成を行うことができます。
        </p>
        <h3 className="font-bold">ボタンの配置方法</h3>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          画面に表示されているボタンをクリックすることで対象のボタンを選択状態にすることができます。
          <br />
          選択状態のボタンは、ドラッグ&ドロップで移動が可能です。
          <br />
          また、選択状態にしたボタンは右側のボタンリストも同時に選択状態になります。
          <br />
          画面右側のボタンリストからボタンの選択、座標入力、サイズ変更が可能です。
        </p>
        <Image
          src="/document/howto/howto1.png"
          alt="ボタンの配置方法"
          width={800}
          height={500}
        />
        <h3 className="font-bold">ボタンの複数選択</h3>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          Shiftを押しながらクリックで複数選択、まとめて移動が可能です。
        </p>
        <Image
          src="/document/howto/howto2.png"
          alt="ボタンの複数選択"
          width={800}
          height={500}
        />
        <h3 className="font-bold">ボタンの配置制約</h3>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          ラズパイ・取り付け穴・他ボタンとは1mmのクリアランスを自動で確保します。
        </p>
        <Image
          src="/document/howto/howto3.png"
          alt="ボタンの配置制約"
          width={800}
          height={500}
        />
        <div className="mt-3 rounded-md border-l-4 border-red-300 bg-red-50/60 p-3 text-xs md:text-sm text-slate-700">
          ヒント:
          アクリル板等で天板の加工をする場合に、1mmのクリアランスが必要になることがあります。
          <br />
          注意:
          ボタンの移動方法により制約が適用されない場合があります。ボタンを移動する際はラズパイ、取り付け穴、ボタン同士の干渉に注意してください。
        </div>
      </section>

      <section id={featuresId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800">各機能の使い方</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-md border border-slate-200 p-3">
            <h3 className="font-semibold text-slate-800 text-sm">
              ボタンリスト
            </h3>
            <p className="mt-1 text-slate-700 text-sm">
              選択、座標入力、サイズ変更が可能です。選択はCanvasと同期します。
            </p>
          </div>
          <div className="rounded-md border border-slate-200 p-3">
            <h3 className="font-semibold text-slate-800 text-sm">
              初期配置に戻す
            </h3>
            <p className="mt-1 text-slate-700 text-sm">
              ボタンをデフォルト位置へ一括リセットします。
            </p>
          </div>
          <div className="rounded-md border border-slate-200 p-3">
            <h3 className="font-semibold text-slate-800 text-sm">目印表示</h3>
            <p className="mt-1 text-slate-700 text-sm">
              デフォルト位置の目印（18mmは四角）を表示/非表示します。
            </p>
          </div>
        </div>
      </section>

      <section id={exportId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800">
          基盤データの生成
        </h2>
        <ol className="mt-2 list-decimal pl-5 text-slate-700 text-sm md:text-base space-y-1">
          <li>配置を確認し、「基盤データを生成」をクリックします。</li>
          <li>ZIP（KiCadプロジェクト）がダウンロードされます。</li>
          <li>
            必要に応じてKiCadで編集し、発注用データ（Gerber等）を書き出してください。
          </li>
        </ol>
      </section>
    </div>
  );
}
