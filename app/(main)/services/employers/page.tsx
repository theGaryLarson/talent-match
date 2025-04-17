//employer landing page
import BottomFold from "@/app/ui/components/employerLanding/BottomFold";
import EmployerPageBanner from "@/app/ui/components/employerLanding/EmployerPageBanner";
import EmployerSteps from "@/app/ui/components/employerLanding/EmployerSteps";
import MarketingCards from "@/app/ui/components/employerLanding/MarketingCards";
import MeetTheFounders from "@/app/ui/components/employerLanding/MeetTheFounders";

import TCPortalFunctionsFold from "@/app/ui/components/employerLanding/TCPortalFunctionsFold";
import TrustedByEmployers from "@/app/ui/components/employerLanding/TrustedByEmployers";

export default function Page() {
  return (
    <>
      <EmployerPageBanner />
      <main className="space-y-3 font-['Roboto'] ">
        <TCPortalFunctionsFold />
        <div className="px-4 tablet:px-[150px] laptop:px-[200px]">
          <TrustedByEmployers />
          <EmployerSteps />
          <MarketingCards />
          <MeetTheFounders />
        </div>
        <BottomFold />
      </main>
    </>
  );
}
