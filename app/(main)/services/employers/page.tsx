//employer landing page
import EmployerHowItWorks from "@/app/ui/components/EmployerHowItWorks";
import EmployerPageBanner from "@/app/ui/components/EmployerPageBanner";

import TCPortalFunctionsFold from "@/app/ui/components/TCPortalFunctionsFold";

export default function Page() {
  return (
    <>
      <EmployerPageBanner />
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] tablet:mx-[150px] laptop:mx-[200px]">
        <TCPortalFunctionsFold />
        <EmployerHowItWorks />
      </main>
    </>
  );
}
