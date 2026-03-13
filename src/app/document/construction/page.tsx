import { BaseLink } from "@/app/components/ui/BaseLink";
import { LinkPreview } from "@/app/components/ui/LinkPreview";
import Image from "next/image";

export default function ConstructionPage() {
  const partsId = "parts";
  const buildId = "build";
  return (
    <div className="rounded-lg border border-pink-500/30 bg-[var(--color-panel)] p-6 md:p-8 shadow-[0_0_8px_rgba(255,53,93,0.25)]">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
        Construction
      </h1>
      <section id={partsId} className="mt-6 space-y-5">
        <h2 className="text-lg font-semibold text-slate-100">
          アケコン制作に必要な部品の紹介
        </h2>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          基本的に私が購入した商品を紹介していますが、ご自身の好みの商品を選んでください。
        </p>
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          固定ボルト（基盤とアクリル板の固定）
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          3x15mmのボルトであれば基本的に対応可能です。
        </p>
        <LinkPreview
          url="https://www.amazon.co.jp/%E3%82%AA%E3%83%8E%E3%82%AB%E3%83%84-%E3%82%B9%E3%83%86%E3%83%B3%E3%83%AC%E3%82%B9-%E5%85%AD%E8%A7%92%E7%A9%B4%E4%BB%98%E3%83%9C%E3%83%AB%E3%83%88-M3x15-134-00-M3x15/dp/B09Q28ZV3G/ref=sr_1_1_sspa?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2SZEV9JD86PO4&dib=eyJ2IjoiMSJ9.fwbBKfWXoUY_Dwmp9qbYoMNAS1zQHKQyE8oWkWT2Y3J590_hlFKV01_scz0TtpOC5-AEFLNJkM4PDa6pENaENcE7iFe2fSZ-4Vs9HgEw1LP0NDzOL_4Hma65D_h7f-QsWUJw5dtRa0-OaQt1ucIBs3i1QddNHzYA0SjegQvNWMP2x0c84UbU6ACyFbat0i24YDoLu4gOrYL_x8ihL_1wTwWqqdjXNlva2va4mJy6DRri_Dxj1gwK1lY8a9_Gk16zmPYk4kbSqKjoE1je8n-RT532bmdssPFYFKWcL1L4XOg.1tgJhNZeCtB_A_5-ITAq9ZJDcKSInfNdcV07-2gLeIM&dib_tag=se&keywords=3%2Bx%2B15%2B%E3%83%9C%E3%83%AB%E3%83%88&qid=1763950586&sprefix=3%2Bx%2B15%2B%E3%83%9C%E3%83%AB%E3%83%88%2Caps%2C178&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
          label="Amazon 固定ボルト"
          className="mt-3"
        />
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          ハンダ・ハンダゴテ
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          持っていない場合は購入してください。
        </p>
        <LinkPreview
          url="https://www.amazon.co.jp/%E5%A4%AA%E6%B4%8B%E9%9B%BB%E6%A9%9F%E7%94%A3%E6%A5%AD-goot-SR-60-%E5%AE%B6%E5%BA%AD%E7%94%A8%E3%81%AF%E3%82%93%E3%81%A0%E3%81%93%E3%81%A6%E3%82%BB%E3%83%83%E3%83%88/dp/B0016V9E8Q/ref=sr_1_10?dib=eyJ2IjoiMSJ9.iHNnB9Va3H7vyjc_LPZIG5kAoUT8rNIzrXD-n3X67RnkQqK_hqiayL39LMA31OB_nVZjb2cMyNnjoxR4-XWdg-BPN2BeNNxPKW9m3WTnFg2AbTp0cM9wjiWJ8tr3hbdLxEW2Kzeiw9IWgudx1kUhIg9jn1DkaEIsDr2U0xmp3yEdpGst5kKMBoI9RfdaleYZdDLJ0sKy_EBsQmMUKKoeAUxRxwO7oAErJJwSvH6aBhc8Jrgx6lxPm3y7Aelc8VSCveL4tTyViy8kJKifz42Lpmsg13tTe6OG4nQi5Gr2Wek.Q_IAohuFkb6PVupBadOzarroh1b8AipPZuK9Y1qc9Eo&dib_tag=se&keywords=%E3%83%8F%E3%83%B3%E3%83%80%E3%82%B4%E3%83%86&qid=1762695482&sr=8-10&ufe=app_do%3Aamzn1.fos.d8e7ee72-073f-4b97-8ec0-59c18d6dfebe&th=1"
          label="Amazon ハンダ・ハンダゴテ"
          className="mt-3"
        />
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          キースイッチ
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          kailh choc v2 のロープロファイルキースイッチを使用します。
          <br />
          （v1のキースイッチでも良いですが、対応するキーキャップがあまりないので注意が必要です)
          <br />
          キースイッチは好みが分かれるので、自分の好みのキースイッチを選んでください。
        </p>
        <LinkPreview
          url="https://cielogames.cielosiro.co.jp/products/000000000092?srsltid=AfmBOopRy1IFBZ6RCRC7ejgVlNNRIJ57oTCnyXfz9w9U_2-DCP5_X0-3"
          label="CieloGames キースイッチ"
          className="mt-3"
        />
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          キーキャップ
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          kailh choc v2 のキーキャップを使用します。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-pink-400 bg-pink-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          注意: ボタン配置時に選択したボタンサイズに合わせて購入してください。
        </div>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          私はオプションボタン以外は30mmのボタンを配置したので、25.5mmのキーキャップを購入しました。
          <br />
          （オプションボタンは18mmのボタンとしています）
        </p>
        <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>18mmのボタンを配置した場合：18mmのキーキャップ</li>
          <li>24mmのボタンを配置した場合：20.2mmのキーキャップ</li>
          <li>30mmのボタンを配置した場合：25.5mmのキーキャップ</li>
        </ul>
        <LinkPreview
          url="https://www.amazon.co.jp/dp/B0D7P5MQG4?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          label="Amazon キーキャップ"
          className="mt-3"
        />
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          Raspberry Pi Pico
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          通常のRaspbery Pi Pico は Type-B 端子のため、Type-C
          が必要な場合は「RP2040-Plus」を購入してください。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント: 通常のRaspberry Pi Pico
          のType-B端子は接続が悪いため「RP2040-Plus」をおすすめします。
        </div>
        <LinkPreview
          url="https://www.amazon.co.jp/dp/B09LT4V2VS?ref=ppx_yo2ov_dt_b_fed_asin_title"
          label="Amazon RP2040-Plus"
          className="mt-3"
        />
      </section>
      <section id={buildId} className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">組み立て方法</h2>
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          基盤とRaspberry Pi、キースイッチのハンダ付け
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          ハンダ付けは風通しの良い屋外または煙吸引器の近くで行いましょう。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント: 動作確認でボタンが反応しない場合、Raspberry
          Piと基盤のハンダがうまく付いていない可能性があります。 Raspberry
          Piと基盤の端子を半田でよく温めることでハンダが付きやすくなります。
        </div>
        <Image
          src="/document/construction/construction-img-6.jpg"
          alt="基盤とRaspberry Pi、キースイッチのハンダ付け"
          width={800}
          height={500}
        />
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          ボタンの動作確認
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          組み立てを進める前にこの時点でハンダがうまく付いているか確認するために動作確認を行います。
        </p>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          Raspberry Pi Picoにインストールするファームウェアを
          <BaseLink href="https://gp2040-ce.info/downloads/" label="こちら" />
          からダウンロードしてください。
          <br />
          （以下画像の青枠の「Download」ボタンをクリックしてください。）
        </p>
        <Image
          src="/document/construction/construction-img-7.png"
          alt="Raspberry Pi Picoにインストールするファームウェアのダウンロード"
          width={800}
          height={500}
        />
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          Raspberry Pi Pico
          の「BOOTSEL」と記載された白いボタンを押しながらPCと接続します。
          <br />
          （RP2040-Plusの場合は「BOOT」と記載された白いボタンを押しながらPCと接続します。）
        </p>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          接続後、Raspberry
          Piのドライブにダウンロードしたファームウェアをドラッグ&ドロップします。
          <br />
          （ドライブ内には「INFO_UF2.uf2」などの他のファイルも含まれています。）
        </p>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          ファームウェアのコピーが完了したら、一旦PCとの接続を切ります。
          <br />
          次は基盤の「GPI017」と記載されたボタンを押しながらPCと接続します。
          <br />
          これでボタン設定用のWebサーバがローカルで起動します。
          <br />
          ブラウザで
          <BaseLink href="http://192.168.7.1" label="http://192.168.7.1" />
          にアクセスしてください。
        </p>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          メニューから「Web Configurator」を開き、「GPIO Pin
          Mapping」を選択します。
          <br />
          「Map buttons
          with」を押して、ダイアログ表示後、キースイッチを押してボタンに割り当てられた番号「GP〇〇」が表示されることを確認します。
          <br />
          すべてのボタンで番号が表示されることを確認してください。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-sky-400 bg-sky-500/10 p-3 text-xs md:text-sm text-slate-200 leading-relaxed md:leading-loose">
          ヒント: ボタンの割り当てを変更する場合も「GPIO Pin
          Mapping」で行えます。
          <BaseLink
            href="https://gp2040-ce.info/web-configurator/menu-pages/gpio-pin-mapping/"
            label="公式のドキュメント"
          />
          を参考にしてください。
        </div>
        <h3 className="mt-6 text-base font-semibold text-slate-100">
          組み立て
        </h3>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          あとは組み立てるのみです。以下の順番でアクリル板と基盤を重ねて最後にボルトで固定します。
        </p>
        <ol className="mt-2 list-decimal pl-5 text-slate-300 text-sm md:text-base space-y-1">
          <li>layer3のアクリル板</li>
          <li>layer1のアクリル板</li>
          <li>基盤</li>
          <li>layer2のアクリル板 x 2</li>
          <li>layer1のアクリル板</li>
        </ol>
        <h3 className="mt-6 text-base font-semibold text-slate-100">完成品</h3>
        <Image
          src="/document/construction/construction-img-8.jpg"
          alt="完成品"
          width={800}
          height={500}
        />
      </section>
    </div>
  );
}
