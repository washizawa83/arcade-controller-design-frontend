import { useId } from "react";
import { BasePageLayout } from "@/layouts/BasePageLayout";
import { BaseCard, BaseCardProps } from "./components/ui/BaseCard";
import { LinkButton } from "./components/ui/LinkButton";

const cardInfos: BaseCardProps[] = [
  {
    image: {
      url: "/drag.svg",
      alt: "Drag and drop",
    },
    title: "直感的なUI",
    description: "ボタンやサイズを自由に調整。マルチセレクトやスナップも対応。",
  },
  {
    image: {
      url: "/clearance.svg",
      alt: "Clearance and constraints",
    },
    title: "安全な配置",
    description:
      "ラズパイ・取り付け穴・他ボタンとの干渉を1mmクリアランスで自動回避。",
  },
  {
    image: {
      url: "/kicad.svg",
      alt: "KiCad Export",
    },
    title: "KiCad出力",
    description:
      "ワンクリックで基板プロジェクトをダウンロードし、そのまま編集可能。",
  },
];

export default function Home() {
  const featuresId = useId();
  return (
    <BasePageLayout>
      <section
        className="relative isolate overflow-hidden rounded-2xl border border-pink-500/30"
        style={{ minHeight: "var(--spacing-content)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(1200px 300px at 50% -10%, rgba(255,53,93,0.18), transparent), linear-gradient(to bottom, rgba(15,23,42,0.6), rgba(11,17,32,0.9))",
          }}
        />

        <div className="relative px-6 py-10 md:px-12 md:py-14">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-100">
              Arcade Controller Design
              <span className="block text-pink-400">Made Simple</span>
            </h1>
            <p className="mt-4 text-slate-300 md:text-lg">
              ボタン配置をドラッグ＆ドロップで直感的にデザインすることができます。
              <br />
              理想のボタンレイアウトが完成したらワンボタンで基板の設計を行うことなくホットスワップ可能な
              <span className="text-pink-400">レバーレスコントローラー</span>
              のCADデータを生成することができます。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <LinkButton label="今すぐ始める" href="/generate" />
              <LinkButton
                label="ドキュメント"
                href="/document"
                type="outline"
              />
            </div>
          </div>
          <ul
            id={featuresId}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {cardInfos.map((cardInfo) => (
              <li key={cardInfo.title}>
                <BaseCard {...cardInfo} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </BasePageLayout>
  );
}
