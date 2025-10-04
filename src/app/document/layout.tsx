"use client";

import Link from "next/link";
import { BasePageLayout } from "@/layouts/BasePageLayout";
import { useState } from "react";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BasePageLayout>
      <div
        className="w-full grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6"
        style={{ minHeight: "var(--spacing-content)" }}
      >
        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full border border-pink-500/30 bg-[rgba(15,23,42,0.95)] shadow-[0_0_12px_rgba(255,53,93,0.4)] transition hover:border-pink-400"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-pink-400 transition ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-pink-400 transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-pink-400 transition ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

        {/* Sidebar (desktop always visible, mobile overlay) */}
        <aside
          className={`
            rounded-t-lg md:rounded-lg border border-pink-500/20 ring-1 ring-pink-500/30 p-4 text-sm text-slate-200 overflow-auto shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md
            md:block md:h-full
            fixed md:relative left-0 right-0 md:left-auto md:right-auto bottom-0 md:bottom-auto z-40 md:z-auto w-full md:w-auto transform md:transform-none transition-transform duration-300 ease-out md:transition-none
            ${menuOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
          `}
          style={{
            background: "rgba(15,23,42,0.85)",
            maxHeight: "70vh",
          }}
        >
          {/* Grab handle and header (mobile only) */}
          <div className="md:hidden">
            <div className="mx-auto mb-2 mt-1 h-1.5 w-10 rounded-full bg-slate-400/40" />
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                メニュー
              </p>
            </div>
          </div>
          <nav className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                How To
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/how-to#editor"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>エディターの使い方</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/how-to#buttonEditor"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>ボタンエディターの使い方</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/how-to#editorMenu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>エディターメニューの使い方</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/how-to#export"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>基板データの生成</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Order
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/order#kicad"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>基板製造用データの作成方法</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/order#pcb"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>基板の注文方法</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Construction
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/construction#parts"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>必要な部品の紹介</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 hover:text-pink-300 transition"
                    href="/document/construction#build"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>組み立て方法</span>
                    <span className="text-pink-400/60">›</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-[2px] z-30"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <section className="min-w-0">{children}</section>
      </div>
    </BasePageLayout>
  );
}
