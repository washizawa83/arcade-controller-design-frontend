"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { BasePageLayout } from "@/layouts/BasePageLayout";

export default function Home() {
  const featuresId = useId();
  return (
    <BasePageLayout>
      <section
        className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-white to-red-50/60 border border-slate-200"
        style={{ minHeight: "var(--spacing-content)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(248,113,113,0.06), rgba(248,113,113,0))",
          }}
        />

        <div className="relative px-6 py-10 md:px-12 md:py-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Arcade Controller Design
              <span className="block text-red-400">Made Simple</span>
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
              300×200の基板空間で、ボタン配置をドラッグ＆ドロップで直感的にデザイン。
              <br />
              基盤の設計を行うことなくホットスワップ可能な
              <span className="text-red-400">レバーレスコントローラー</span>
              の制作を可能にします。
              ラズパイや取り付け穴の位置を考慮した安全な距離制御も自動で行います。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-md bg-red-400 px-5 py-3 text-white shadow-sm transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
              >
                今すぐはじめる
              </Link>
              <a
                href="/document"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-slate-700 shadow-sm transition hover:border-red-300 hover:text-red-500"
              >
                ドキュメント
              </a>
            </div>
          </div>

          <div
            id={featuresId}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div className="rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              <div className="h-40 relative">
                <Image
                  src="/drag.svg"
                  alt="Drag and drop"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-800">
                直感的なUI
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ボタンやサイズを自由に調整。マルチセレクトやスナップも対応。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              <div className="h-40 relative">
                <Image
                  src="/clearance.svg"
                  alt="Clearance and constraints"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-800">
                安全な配置
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ラズパイ・取り付け穴・他ボタンとの干渉を1mmクリアランスで自動回避。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              <div className="h-40 relative">
                <Image
                  src="/kicad.svg"
                  alt="KiCad Export"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-800">
                KiCad出力
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ワンクリックで基板プロジェクトをダウンロードし、そのまま編集可能。
              </p>
            </div>
          </div>
        </div>
      </section>
    </BasePageLayout>
  );
}
