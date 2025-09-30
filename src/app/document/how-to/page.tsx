import { BaseLink } from "@/app/components/ui/BaseLink";
import Image from "next/image";

export default function HowToPage() {
  const editorId = "editor";
  const buttonEditorId = "buttonEditor";
  const editorMenuId = "editorMenu";
  const exportId = "export";
  return (
    <div className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
        How To
      </h1>
      <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
        このページでは、ボタン配置から主要機能の使い方、データの出力まで一通りの操作を説明します。
        <br />
        <BaseLink href="/generate" label="基板生成画面" />
        からボタン配置と基板データの生成を行うことができます。
      </p>
      <Image
        src="/document/howto/how-to-img.png"
        alt="生成画面のイメージ"
        width={800}
        height={500}
      />

      <section id={editorId} className="mt-6 border-b border-pink-500/30 pb-8">
        <h2 className="text-lg font-semibold text-slate-100">
          エディターの使い方
        </h2>
        <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          エディターに表示されているボタンをクリックすることで対象のボタンを選択状態にすることができます。
          <br />
          選択状態のボタンは、ドラッグ&ドロップで移動が可能です。
          <br />
          Shiftを押しながらボタンクリックで複数選択、まとめて移動が可能です。
        </p>
        <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          ラズパイ・取り付け穴・他ボタンとは1mmのクリアランスを自動で確保します。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント:
          アクリル板等で天板の加工をする場合に、1mmのクリアランスが必要になることがあります。
        </div>
        <div className="mt-3 rounded-md border-l-4 border-pink-400 bg-pink-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          注意:
          ボタンの移動方法により制約が適用されない場合があります。ボタンを移動する際はラズパイ、取り付け穴、ボタン同士の干渉に注意してください。
        </div>
      </section>

      <section
        id={buttonEditorId}
        className="mt-8 border-b border-pink-500/30 pb-8"
      >
        <h2 className="text-lg font-semibold text-slate-100">
          ボタンエディターの使い方
        </h2>
        <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          ボタンエディターからもエディターのボタンを選択状態にすることができます。
          <br />
          <span className="font-bold">x</span>,{" "}
          <span className="font-bold">y</span>
          の値を変更することで正確な位置にボタンを配置することが可能です。
          <br />
          <span className="font-bold">size</span>
          の値を変更することでボタンのサイズを変更することが可能です。ボタンのサイズは18mm,
          24mm, 30mmの3種類から選択できます。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-pink-400 bg-pink-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          注意: 18mmのボタンは丸型ボタンではないため注意してください。
          <br />
          クリアランス制御により、ボタンの配置が不可能な座標を入力すると意図しない座標にボタンが配置されることがあります。
        </div>
      </section>

      <section
        id={editorMenuId}
        className="mt-8 border-b border-pink-500/30 pb-8"
      >
        <h2 className="text-lg font-semibold text-slate-100">
          エディターメニューの使い方
        </h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-md border border-pink-500/30 p-3 bg-[rgba(15,23,42,0.6)]">
            <h3 className="font-semibold text-slate-100 text-sm">
              ボタンリスト
            </h3>
            <p className="mt-1 text-slate-300 text-sm">
              選択、座標入力、サイズ変更が可能です。選択はCanvasと同期します。
            </p>
          </div>
          <div className="rounded-md border border-pink-500/30 p-3 bg-[rgba(15,23,42,0.6)]">
            <h3 className="font-semibold text-slate-100 text-sm">
              初期配置に戻す
            </h3>
            <p className="mt-1 text-slate-300 text-sm">
              ボタンをデフォルト位置へ一括リセットします。
            </p>
          </div>
          <div className="rounded-md border border-pink-500/30 p-3 bg-[rgba(15,23,42,0.6)]">
            <h3 className="font-semibold text-slate-100 text-sm">目印表示</h3>
            <p className="mt-1 text-slate-300 text-sm">
              デフォルト位置の目印（18mmは四角）を表示/非表示します。
            </p>
          </div>
        </div>
      </section>

      <section id={exportId} className="mt-8 border-b border-pink-500/30 pb-8">
        <h2 className="text-lg font-semibold text-slate-100">
          基板データの生成
        </h2>
        <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          理想の配置が完了したら、エディターメニューから「基板データを生成」をクリックすることで基板データを生成できます。
          <br />
          生成されたデータはZIPファイルでダウンロードされます。
          <br />
          ダウンロードしたZIPを解凍し、発注編の
          <BaseLink href="/document/order" label="ドキュメント" />
          を参考に、基板を注文してください。
          <br />
          必要に応じてKiCadでプロジェクトを開いて編集・配線調整を行ってください。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント: 基板データの生成には1分程時間がかかる場合があります。
        </div>
      </section>
    </div>
  );
}
