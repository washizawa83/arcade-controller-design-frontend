import { BasePageLayout } from "@/layouts/BasePageLayout";

export default function OssPage() {
  return (
    <BasePageLayout>
      <section className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
          OSSライセンス
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          本サービスでは以下のOSSをサーバー側で利用しています。
        </p>
        <ul className="mt-4 space-y-3 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
          <li className="rounded-md border border-pink-500/30 p-3 bg-[rgba(15,23,42,0.6)]">
            <p className="font-semibold text-slate-100">
              KiCad PCB EDA Suite (kicad-cli)
            </p>
            <p>License: GPL-3.0-only</p>
            <p>
              Source:{" "}
              <a
                href="https://gitlab.com/kicad/code/kicad"
                className="text-pink-400 hover:text-pink-300"
                target="_blank"
                rel="noreferrer"
              >
                https://gitlab.com/kicad/code/kicad
              </a>
            </p>
          </li>
          <li className="rounded-md border border-pink-500/30 p-3 bg-[rgba(15,23,42,0.6)]">
            <p className="font-semibold text-slate-100">Freerouting</p>
            <p>License: GPL-3.0-only</p>
            <p>
              Source:{" "}
              <a
                href="https://github.com/freerouting/freerouting"
                className="text-pink-400 hover:text-pink-300"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/freerouting/freerouting
              </a>
            </p>
          </li>
        </ul>
        <p className="mt-4 text-xs text-slate-400">
          “KiCad” および “Freerouting”
          は各プロジェクト/権利者の商標です。当サービスはそれらの権利者による承認・提携を受けていません。
        </p>
      </section>
    </BasePageLayout>
  );
}
