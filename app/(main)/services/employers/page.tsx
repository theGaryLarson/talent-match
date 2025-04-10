//employer landing page
import EmployerPageBanner from "@/app/ui/components/employerLanding/EmployerPageBanner";
import EmployerSteps from "@/app/ui/components/employerLanding/EmployerSteps";
import MarketingCards from "@/app/ui/components/employerLanding/MarketingCards";
import MeetTheFounders from "@/app/ui/components/employerLanding/MeetTheFounders";

import TCPortalFunctionsFold from "@/app/ui/components/employerLanding/TCPortalFunctionsFold";

export default function Page() {
  return (
    <>
      <EmployerPageBanner />
      <main className="space-y-3 font-['Roboto'] ">
        <TCPortalFunctionsFold />
        <div className="px-4 tablet:px-[150px] laptop:px-[200px]">
          <EmployerSteps />
          <MarketingCards />
          <MeetTheFounders />
        </div>
      </main>
    </>
  );
}
