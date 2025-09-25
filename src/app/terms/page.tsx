import { BasePageLayout } from "@/layouts/BasePageLayout";

export default function TermsPage() {
  return (
    <BasePageLayout>
      <section className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
          利用規約
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          本利用規約（以下「本規約」）は、本サービスの提供条件および本サービスの利用に関する当方と
          利用者との間の権利義務関係を定めるものです。本サービスの利用に際しては、本規約の全文に同意
          いただく必要があります。
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">
            第1条（適用）
          </h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            本規約は、本サービスの利用に関わる一切の関係に適用されます。なお、当方が本サービス上で随時
            掲載する各種ガイド、注意事項等は本規約の一部を構成します。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">
            第2条（禁止事項）
          </h2>
          <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>第三者の権利・利益を不当に侵害する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセス、リバースエンジニアリング等の行為</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">
            第3条（知的財産権）
          </h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            本サービスおよび本サービスに関連するコンテンツに含まれる著作権、商標権その他の知的財産権は、
            当方または当該権利者に帰属します。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">
            第4条（免責）
          </h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            本サービスは現状有姿で提供されます。当方は、本サービスまたは本サービスから出力された
            CAD/KiCad等のデータの正確性、適法性、適合性、安全性、有用性等につき、いかなる保証もしません。
            利用者が本サービスを利用し、あるいは出力データを利用したことにより直接的または間接的に
            生じた一切の損害について、当方は責任を負いません。不正なデータが出力された場合も同様です。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">
            第5条（本規約の変更）
          </h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            当方は、必要と判断した場合、利用者に通知することなく本規約を変更できます。変更後に本サービスを
            利用した場合、変更後の規約に同意したものとみなします。
          </p>
          <p className="mt-3 text-xs text-slate-400">
            制定日: {new Date().toLocaleDateString("ja-JP")}
          </p>
        </section>
      </section>
    </BasePageLayout>
  );
}
