export default function OrderPage() {
  const kicadId = "kicad";
  const pcbId = "pcb";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
        Order
      </h1>
      <section id={kicadId} className="mt-6">
        <h2 className="text-lg font-semibold text-slate-800">
          出力されたKiCadデータの使用方法
        </h2>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          ダウンロードしたZIPを解凍し、KiCadでプロジェクトを開いて編集・配線調整を行ってください。
        </p>
      </section>
      <section id={pcbId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800">基盤の注文方法</h2>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          各PCBメーカーのガイドラインに従い、必要なファイル形式（Gerber等）で書き出して発注します。
        </p>
      </section>
    </div>
  );
}
