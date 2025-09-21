export default function ConstructionPage() {
  const partsId = "parts";
  const buildId = "build";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
        Construction
      </h1>
      <section id={partsId} className="mt-6">
        <h2 className="text-lg font-semibold text-slate-800">
          アケコン制作に必要な部品の紹介
        </h2>
        <ul className="mt-2 list-disc pl-5 text-slate-700 text-sm md:text-base space-y-1">
          <li>スイッチ（18/24/30mm）</li>
          <li>ケース（300×200対応）</li>
          <li>基板（本ツールで設計）/ 配線材 / ネジ類</li>
        </ul>
      </section>
      <section id={buildId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800">組み立て方法</h2>
        <p className="mt-2 text-slate-700 text-sm md:text-base">
          ケース加工→スイッチ固定→基板固定→配線→動作確認の順で進めます。
        </p>
      </section>
    </div>
  );
}
