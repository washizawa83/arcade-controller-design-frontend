import { BaseLink } from "@/app/components/ui/BaseLink";
import Image from "next/image";

export default function OrderPage() {
  const kicadId = "kicad";
  const pcbId = "pcb";
  const housingId = "housing";

  return (
    <div className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
        Order
      </h1>
      <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose">
        このページでは、基板製造用データの作成方法と基板の注文方法を説明します。
        <br />
        製造用データの作成にはKiCadが必要です。KiCadは
        <BaseLink href="https://kicad.org/" label="こちら" />
        からダウンロードできます。
      </p>
      <section id={kicadId} className="mt-6">
        <h2 className="text-lg font-semibold text-slate-100">
          基板製造用データの作成方法
        </h2>
        <p className="mt-2 mb-8 text-slate-300 text-sm md:text-base">
          解凍したZIPファイル内（以降 「design-data」フォルダ と記載）にある
          StickLess.kicad_pcb をダブルクリックしてKiCadで開いてください。
          <br />
          PCBエディターが立ち上がり基板が表示されます。ボタン配置が反映されていることを確認してください。
        </p>
        <ol className="mb-8 list-decimal pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>
            PCBエディターの「メニュー」から「ファイル」→「製造用出力」 →
            「ガーバー」を選択してください
          </li>
          <li>
            プロット画面が表示されます。「出力フォーマット」、「含めるレイヤー」が以下画像のようになっていることを確認してください
          </li>
          <li>
            「出力ディレクトリ」から製造用データを出力するディレクトリを指定してください
          </li>
          <li>最後に「プロット」ボタンをクリックしてください</li>
          <li>
            「出力メッセージ」のエラー件数が0であることを確認し、最後に「ドリルファイルの生成」ボタンをクリックしてください。
          </li>
        </ol>
        <Image
          src="/document/order/order-img1.png"
          alt="KiCadエクスポート画面"
          width={800}
          height={500}
        />
        <p className="mt-4 mb-8 text-slate-300 text-sm md:text-base">
          指定した出力ディレクトリに合計12個のファイルが出力されていることを確認してください。
          <br />
          最後に出力ディレクトリを圧縮し、ZIPファイルを作成してください。
          以上で製造用データの作成が完了です。
        </p>
      </section>
      <section id={pcbId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-100">基板の注文方法</h2>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          基板の作成は
          <BaseLink href="https://jlcpcb.com/" label="JLCPCB" />
          を利用した方法について紹介します。
        </p>
        <ol className="mb-8 list-decimal pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>JLCPCBのサイトにアクセスし、「Order now」を選択してください</li>
          <li>
            「Add gerber
            file」を選択し、先程作成したZIPファイルをアップロードしてください
            <br />
            アップロード後、プレビューが表示されるので、ボタン配置が反映されていることを確認してください
          </li>
          <li>
            注文の各項目について変更は必要ありませんが、必要に応じて基板の色、厚みを変更してください。
          </li>
        </ol>
      </section>
      <section id={housingId} className="mt-8">
        <h2 className="text-lg font-semibold text-slate-100">
          外枠（アクリル板）の発注方法
        </h2>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          外枠（アクリル板）の発注方法について紹介します。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント:
          外枠に関してはご自身のお好みの素材でご自由に作成していただいて問題ございません。
          アクリル板を使用した制作を考えている場合はご参考にしてください。
        </div>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          「design-data」フォルダ内にある「housing-data」フォルダに以下のアクリル板加工データがあります。
        </p>
        <ol className="mb-8 list-decimal pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>
            「layer1.pdf」：ボタン配置、取り付け穴が反映されたアクリル板加工データ
          </li>
          <li>
            「layer2.pdf」：ボタン配置、raspberry
            pi、取り付け穴が反映されたアクリル板加工データ
          </li>
          <li>「layer3.pdf」：取り付け穴が反映されたアクリル板加工データ</li>
        </ol>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          アクリル板の発注は
          <BaseLink href="https://anymany.net/" label="Anymany" />
          を利用した方法について紹介します。
        </p>
        <ol className="mb-8 list-decimal pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>
            Anymanyのサイトにアクセスし、「スピード注文」を選択してください
          </li>
          <li>アクリル板加工データのアップロードし、素材と個数を入力します</li>
          <li>各レイヤーごとに同様の操作をして注文を行います</li>
        </ol>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          参考に私が注文した際の内容を記載します。
        </p>
        <Image
          src="/document/order/order-img2.png"
          alt="Anymany注文画面"
          width={800}
          height={500}
        />
      </section>
    </div>
  );
}
