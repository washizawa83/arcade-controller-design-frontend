import { BasePageLayout } from "@/layouts/BasePageLayout";
import { LinkButton } from "./components/ui/LinkButton";
import { createPageMetadata } from "@/app/lib/seo";
import Image from "next/image";
import type { CSSProperties } from "react";

export const metadata = createPageMetadata({
  title: "レバーレスコントローラー基板設計ツール",
  description:
    "ブラウザ上でレバーレスコントローラーのボタン配置をドラッグ&ドロップで設計し、KiCadプロジェクトを生成できる自作アケコン向けツールです。",
  path: "/",
});

const features = [
  {
    image: "/home-layout.svg",
    alt: "レイアウト編集イメージ",
    title: "直感的にレイアウト編集",
    description: "ボタンやサイズを自由に調整。マルチセレクトやスナップも対応。",
    point: "ドラッグ操作で素早く試行錯誤",
  },
  {
    image: "/home-clearance.svg",
    alt: "クリアランス管理イメージ",
    title: "安全な配置",
    description:
      "ラズパイ・取り付け穴・他ボタンとの干渉を1mmクリアランスで自動回避。",
    point: "干渉リスクを減らして作業効率化",
  },
  {
    image: "/home-export.svg",
    alt: "KiCadエクスポートイメージ",
    title: "KiCad出力",
    description:
      "ワンクリックで基板プロジェクトをダウンロードし、そのまま編集可能。",
    point: "製造フローへそのまま接続",
  },
];

const topBackgroundButtons = [
  { left: "50%", top: "74.25%", size: 94, delay: "0s", duration: "5.2s" }, // UP
  { left: "44.78%", top: "40.7%", size: 94, delay: "0.2s", duration: "5.5s" }, // RIGHT
  { left: "35.31%", top: "34.25%", size: 94, delay: "0.4s", duration: "5.7s" }, // DOWN
  { left: "24.69%", top: "34.3%", size: 94, delay: "0.6s", duration: "5.4s" }, // LEFT
  { left: "54.9%", top: "35.8%", size: 94, delay: "0.8s", duration: "5.8s" }, // P1
  { left: "64.53%", top: "29.9%", size: 94, delay: "1s", duration: "5.3s" }, // P2
  { left: "75.23%", top: "29.9%", size: 94, delay: "1.2s", duration: "6s" }, // P3
  { left: "85.87%", top: "31.8%", size: 94, delay: "1.4s", duration: "5.6s" }, // P4
  { left: "54.03%", top: "51.6%", size: 94, delay: "1.6s", duration: "5.4s" }, // K1
  { left: "64.1%", top: "46.1%", size: 94, delay: "1.8s", duration: "5.9s" }, // K2
  { left: "75.27%", top: "46%", size: 94, delay: "2s", duration: "5.5s" }, // K3
  { left: "85.9%", top: "48.5%", size: 94, delay: "2.2s", duration: "6.2s" }, // K4
  { left: "39.2%", top: "70.5%", size: 94, delay: "2.4s", duration: "5.4s" }, // LS
  { left: "60.8%", top: "70.5%", size: 94, delay: "2.6s", duration: "5.8s" }, // RS
  { left: "13.82%", top: "37.5%", size: 94, delay: "2.8s", duration: "5.6s" }, // A2
] as const;

export default function Home() {
  return (
    <BasePageLayout>
      <section className="space-y-10 pb-12 md:space-y-14 md:pb-16">
        <article className="relative isolate overflow-hidden rounded-[2rem] border border-pink-500/30 bg-[var(--color-panel)] px-6 py-14 shadow-[0_0_26px_rgba(255,53,93,0.2)] md:px-12 md:py-20">
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: "1080px",
                height: "620px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {topBackgroundButtons.map((button) => (
                <span
                  key={`bg-button-${button.left}-${button.top}`}
                  className="arcade-glow-button"
                  style={
                    {
                      width: `${button.size}px`,
                      height: `${button.size}px`,
                      left: button.left,
                      top: button.top,
                      animationDelay: button.delay,
                      animationDuration: button.duration,
                      opacity: 0.56,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="text-center">
              <p className="mx-auto inline-flex rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-pink-200">
                LEVERLESS CONTROLLER PCB DESIGN TOOL
              </p>
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-200 md:text-5xl lg:text-6xl">
                レバーレスコントローラー
                <span className="mt-1 block text-pink-300/90">
                  設計体験を、次の次元へ。
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-lg">
                ボタン配置の検討、干渉チェック、KiCadプロジェクト出力までをブラウザで完結。
                自作アケコンの試作サイクルを速めるための設計ワークスペースです。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <LinkButton label="設計をはじめる" href="/generate" />
                <LinkButton
                  label="使い方を見る"
                  href="/document/how-to"
                  type="outline"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-pink-500/25 pt-6 text-center md:grid-cols-3 md:gap-4 md:pt-8">
              <div>
                <p className="text-5xl font-black tracking-tight text-slate-100 md:text-6xl">
                  1
                </p>
                <p className="mt-2 text-xs tracking-wide text-slate-300 md:text-sm">
                  mm自動クリアランス制御
                </p>
              </div>
              <div>
                <p className="text-5xl font-black tracking-tight text-slate-100 md:text-6xl">
                  3
                </p>
                <p className="mt-2 text-xs tracking-wide text-slate-300 md:text-sm">
                  ボタンサイズ対応
                </p>
              </div>
              <div>
                <p className="text-5xl font-black tracking-tight text-slate-100 md:text-6xl">
                  1
                </p>
                <p className="mt-2 text-xs tracking-wide text-slate-300 md:text-sm">
                  clickでKiCad出力
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-100 md:text-4xl">
              必要なのは、設計に集中する時間だけ
            </h2>
            <p className="mt-3 text-sm text-slate-300 md:text-base">
              複雑な準備を減らし、アイデアから製造データまでを滑らかにつなぎます。
            </p>
          </div>
        </article>

        <article className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <section
              key={feature.title}
              className="rounded-[1.6rem] border border-pink-500/30 bg-[var(--color-panel)] p-5 shadow-[0_0_18px_rgba(255,53,93,0.14)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={feature.image}
                alt={feature.alt}
                width={560}
                height={320}
                className="h-auto w-full rounded-xl border border-pink-500/20 bg-slate-900/40"
              />
              <h2 className="mt-4 text-lg font-semibold text-slate-100">
                {feature.title}
              </h2>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-300">
                {feature.description}
              </p>
              <p className="mt-3 text-xs text-pink-200">{feature.point}</p>
            </section>
          ))}
        </article>

        <article className="rounded-[1.8rem] border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8">
          <h2 className="text-center text-2xl font-semibold text-slate-100 md:text-4xl">
            3ステップで製造データまで
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "STEP 1",
                title: "ボタン配置を作る",
                description:
                  "ドラッグ&ドロップや数値入力で、理想のレイアウトを詰めていきます。",
              },
              {
                step: "STEP 2",
                title: "干渉を確認する",
                description:
                  "ボタン同士や固定穴との距離を自動チェックし、現実的な設計に整えます。",
              },
              {
                step: "STEP 3",
                title: "KiCadへ出力する",
                description:
                  "生成されたデータをそのまま開いて、発注・加工に進めます。",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-pink-500/25 bg-slate-950/35 p-5"
              >
                <p className="text-xs font-semibold tracking-wide text-pink-300">
                  {item.step}
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </BasePageLayout>
  );
}
