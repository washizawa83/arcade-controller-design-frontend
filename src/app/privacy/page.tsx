import { BasePageLayout } from "@/layouts/BasePageLayout";

export default function PrivacyPage() {
  return (
    <BasePageLayout>
      <section className="prose prose-slate max-w-none py-8">
        <h1>プライバシーポリシー</h1>
        <p>
          本プライバシーポリシーは、当方が本サービスにおいて取得・利用・保管する情報の
          取り扱い方針を定めるものです。
        </p>
        <h2>取得する情報</h2>
        <ul>
          <li>サービス提供・改善のために必要な最小限の技術情報</li>
          <li>お問い合わせ対応に必要な連絡先情報（任意）</li>
        </ul>
        <h2>利用目的</h2>
        <ul>
          <li>本サービスの提供・保守・改善のため</li>
          <li>不正利用の防止および安全の確保のため</li>
          <li>法令に基づく対応のため</li>
        </ul>
        <h2>第三者提供</h2>
        <p>
          法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。
        </p>
        <h2>セキュリティ</h2>
        <p>
          当方は、取得した情報を安全に取り扱うために合理的な管理体制を整備します。
        </p>
        <h2>お問い合わせ</h2>
        <p>ポリシーに関するお問い合わせは管理者までご連絡ください。</p>
        <p>制定日: {new Date().toLocaleDateString("ja-JP")}</p>
      </section>
    </BasePageLayout>
  );
}
