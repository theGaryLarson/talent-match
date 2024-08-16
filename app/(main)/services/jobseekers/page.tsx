import Tabs from '@/app/ui/components/Tabs';
import PageBanner from '@/app/ui/components/PageBannner';
import BlockQuote from '@/app/ui/components/BlockQuote';
import GreyBackgroundBulletPointListBlock from '@/app/ui/components/GreyBackgroundBulletPointListBlock';
import Image from 'next/image';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import CFAPortalCard from '@/app/ui/components/CFAPortalCard';
import RoundedButton from '@/app/ui/components/RoundedButton';
import InfoCard from '@/app/ui/components/InfoCard';
import SimpleCard from '@/app/ui/components/SimpleCard';
import CircleBlurb from '@/app/ui/components/CircleBlurb';
import TimeLine from '@/app/ui/components/TimeLine';

/**
 * @returns Job seeker landing page
 */
export default function Page() {
  return (
    <div className="font-roboto">
      <PageBanner
        title={'Welcome to CFA’s Tech Talent Showcase'}
        bg="bg-jobseeker-hero-1"
      />
      <div className="container mx-auto flex flex-col items-center space-y-8 px-8 py-16 md:px-12 lg:px-16">
        <div className="text-center">
          <span className="font-['Roboto'] text-6xl font-normal leading-[66px] text-[#014260]">
            It’s Not a Job Board—
            <br />
            It’s a{' '}
          </span>
          <span className="font-['Roboto'] text-6xl font-medium leading-[66px] text-[#047f9c]">
            Launchpad
          </span>
        </div>
        <div className="text-center font-['Roboto'] text-2xl font-normal leading-relaxed text-[#0f1728]">
          Our Career Portal is designed to help you position yourself as a top
          job candidate in today’s digital world
        </div>
        <br />
        <CircleBlurb />
        <div className="text-center"><span className="text-[#014260] text-6xl font-normal font-['Roboto'] capitalize leading-[66px]">Career </span><span className="text-[#047f9c] text-6xl font-normal font-['Roboto'] capitalize leading-[66px]">Portal</span></div>
        <div className="text-center text-[#0f1728] text-2xl font-normal font-['Roboto'] leading-relaxed">Our Career Portal is designed to help you position yourself as a top job candidate in today’s digital world</div>
        <br/>
        <TimeLine/>
      </div>
    </div>
  );
}
