//employer landing page
import CallToAction from "@/app/ui/components/employerLanding/CallToAction";
import EmployerPageBanner from "@/app/ui/components/employerLanding/EmployerPageBanner";
import EmployerSteps from "@/app/ui/components/employerLanding/EmployerSteps";
import MarketingCards from "@/app/ui/components/employerLanding/MarketingCards";
import Newsletter from "@/app/ui/components/employerLanding/Newsletter";
import RealNumbers from "@/app/ui/components/employerLanding/RealNumbers";
import RealTalent from "@/app/ui/components/employerLanding/RealTalent";

import TCPortalFunctionsFold from "@/app/ui/components/employerLanding/TCPortalFunctionsFold";
import TrustedByEmployers from "@/app/ui/components/employerLanding/TrustedByEmployers";

export default async function Page() {
  return (
    <>
      <main>
        <EmployerPageBanner />
        <TCPortalFunctionsFold />
        <TrustedByEmployers />
        <EmployerSteps />
        <MarketingCards />
        <RealNumbers />
        <RealTalent />
        <CallToAction />
        <Newsletter />
      </main>
    </>
  );
}
