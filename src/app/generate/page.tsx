import { DesignTool } from "@/features/design-tools/DesignTool";
import { BasePageLayout } from "@/layouts/BasePageLayout";

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
