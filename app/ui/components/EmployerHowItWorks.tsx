import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function EmployerHowItWorks() {
  return (
    <div>
      <div className="text-center text-[88px] text-[#014260]">How It Works</div>
      <div className="space-y-[32px]">
        <Step
          buttonText={'Post a Job'}
          title={'Post a Job'}
          article={
            "Create a job post, outline the specific skills you need, and publish it with a few clicks. You'll easily manage and track all your postings from a centralized dashboard, keeping you organized and informed throughout the hiring process."
          }
          link={'/underconstruction'}
        />
        <Step
          buttonText={'Search Local Candidates'}
          title={'Discover Local Talent'}
          article={
            "Connect with top tech talent right in your area. Simply define your desired search radius, and we'll present you with a curated list of local candidates. Through our advanced filters, you can search for the exact skills and experience you need, ensuring a perfect match for your needs."
          }
          link={'/services/talent-search'}
        />
        <Step
          buttonText={'Start Hiring'}
          title={'Connect With Ease'}
          article={
            "Once you've found the perfect candidate, our Portal makes connecting effortless. Directly initiate contact through our messaging system, streamlining communication and ensuring a smooth hiring process."
          }
          link={'/underconstruction'}
        />
        <div className="space-y-6">
          <div className="text-center font-['Roboto'] text-[66px] font-normal capitalize leading-[66px] text-[#014260]">
            Discover diverse, qualified talent in your community
          </div>
          <Image
            src={'/images/employerBottomPic.png'}
            alt={'Discover diverse, qualified talent in your community'}
            width={3480}
            height={1791}
          />
        </div>
      </div>
    </div>
  );
}

function Step(props: {
  buttonText: string;
  title: string;
  article: string;
  link: string;
}) {
  return (
    <div className="grid items-center gap-[32px] laptop:grid-cols-2 laptop:gap-[80px]">
      <div className="space-y-[16px]">
        <div className="font-['Roboto'] text-[44px] font-normal leading-[44px] text-[#047f9c]">
          {props.title}
        </div>
        <div className="font-['Roboto'] text-[22px] font-normal leading-[30.80px] text-[#0f1728]">
          {props.article}
        </div>
      </div>
      <div className="h-[439.36px] w-[680px] bg-fuchsia-500 laptop:row-span-2"></div>
      <Link
        href={props.link}
        className="inline-flex h-10 w-max items-center justify-center gap-2 rounded-[100px] border border-[#014260] px-6 py-2.5"
      >
        {props.buttonText}
        <ArrowRightIcon className="h-5 w-5" />
      </Link>
    </div>
  );
}
