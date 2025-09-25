import { BasePageLayout } from "@/layouts/BasePageLayout";

export default function PrivacyPage() {
  return (
    <BasePageLayout>
      <section className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
          プライバシーポリシー
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          本プライバシーポリシーは、当方が本サービスにおいて取得・利用・保管する情報の取り扱い方針を定めるものです。
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">取得する情報</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose space-y-1">
            <li>サービス提供・改善のために必要な最小限の技術情報</li>
            <li>お問い合わせ対応に必要な連絡先情報（任意）</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">利用目的</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose space-y-1">
            <li>本サービスの提供・保守・改善のため</li>
            <li>不正利用の防止および安全の確保のため</li>
            <li>法令に基づく対応のため</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">第三者提供</h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">セキュリティ</h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            当方は、取得した情報を安全に取り扱うために合理的な管理体制を整備します。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-100">お問い合わせ</h2>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
            ポリシーに関するお問い合わせは管理者までご連絡ください。
          </p>
          <p className="mt-3 text-xs text-slate-400">
            制定日: {new Date().toLocaleDateString("ja-JP")}
          </p>
        </section>
      </section>
    </BasePageLayout>
  );
}
