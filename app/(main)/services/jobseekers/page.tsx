import Tabs from "@/app/ui/components/Tabs";
import PageBanner from "@/app/ui/components/PageBannner";
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";
import Image from "next/image"
import PhotoCardWithTitle from "@/app/ui/components/PhotoCardWithTitle";
import LargeRoundedButtonCard from "@/app/ui/components/LargeRoundedButtonCard";
import CFAPortalCard from "@/app/ui/components/CFAPortalCard";
import RoundedButton from "@/app/ui/components/RoundedButton";
import InfoCard from "@/app/ui/components/InfoCard";
import SimpleCard from "@/app/ui/components/SimpleCard";
import CircleBlurb from "@/app/ui/components/CircleBlurb";


/**
 * @returns Job seeker landing page
 */
export default function Page() {


    return (
        <div className="font-roboto">
            <PageBanner title={"Welcome to CFA’s Tech Talent Showcase"} bg="bg-jobseeker-hero-1"/>
            <div className="px-8 md:px-12 lg:px-16 py-16 space-y-8 container mx-auto flex flex-col items-center">
                <CircleBlurb/>
             
            </div>
        </div>
    );
}

