//employer landing page
import EmployerHowItWorks from "@/app/ui/components/employerLanding/EmployerHowItWorks";
import EmployerPageBanner from "@/app/ui/components/employerLanding/EmployerPageBanner";

import TCPortalFunctionsFold from "@/app/ui/components/employerLanding/TCPortalFunctionsFold";

export default function Page() {
  return (
    <>
      <EmployerPageBanner />
      <main className="space-y-3 font-['Roboto'] ">
        <TCPortalFunctionsFold />
        <div className="px-4 tablet:px-[150px] laptop:px-[200px]">
        <EmployerHowItWorks />
        </div>
      </main>
    </>
  );
}
