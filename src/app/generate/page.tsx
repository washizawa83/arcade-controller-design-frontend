import { DesignTool } from "@/features/design-tools/DesignTool";
import { BasePageLayout } from "@/layouts/BasePageLayout";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata = createPageMetadata({
  title: "レバーレスコントローラー基板データ生成",
  description:
    "ボタン位置やサイズを調整して、レバーレスコントローラー用のKiCad基板プロジェクトを生成できます。自作アケコンのレイアウト検討に使える設計画面です。",
  path: "/generate",
});

export const GeneratePage = () => {
  return (
    <BasePageLayout>
      <div className="w-full h-full">
        <DesignTool />
      </div>
    </BasePageLayout>
  );
};

export default GeneratePage;
