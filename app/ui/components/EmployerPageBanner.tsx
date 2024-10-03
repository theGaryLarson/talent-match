import Link from 'next/link';
import RoundedButton from './RoundedButton';
import Image from 'next/image';
import { auth } from '@/auth';

export default async function EmployerPageBanner() {
  let session = await auth();
  console.log('session is ', session);
  //h-[615px] content-center bg-jobseeker-hero-1 bg-cover bg-center p-4 text-white bg-blend-darken tablet:p-10 laptop:h-[854px] laptop:p-20 bg-gradient-to-r from-purple-500 to-blue-500
  return (
    <div
      className={
        'h-[750px] flex items-center bg-gradient-to-b from-[#047f9c] to-[#39b2c2] px-[16px] sm-tablet:px-[50px] laptop:h-[854px] laptop:px-[100px]'
      }
    >
      <div className="inline-flex h-[584.97px] w-[487px] flex-col items-start justify-start gap-2">
        <div className="self-stretch font-['Roboto'] text-[88px] font-normal capitalize leading-[105.60px] text-white">
          Where you discover Local tech talent{' '}
        </div>
        <div className="self-stretch font-['Roboto'] text-[22px] font-normal leading-[30.80px] text-white">
          Connect with quality local candidates in our Talent & Career Portal
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="relative h-[33.21px] w-px" />
        </div>
        <div className="inline-flex items-center justify-center gap-[8.30px] rounded-[103.79px] bg-[#047f9c] px-[24.91px] py-[10.38px]">
          <div className="text-center font-['Roboto'] text-[22px] font-medium leading-tight tracking-tight text-white">
            Search Talent
          </div>
        </div>
      </div>
    </div>
  );
}
