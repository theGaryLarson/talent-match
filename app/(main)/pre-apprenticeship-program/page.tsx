import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '@/app/ui/components/PageBannner';
import RoundedButtonCard from '@/app/ui/components/RoundedButtonCard';

//entire CFA landing page
export default function Page() {
  return (
    <>
    <PageBanner
      title="Pre-Apprenticeship Program" bg={'bg-services-hero'}></PageBanner>
    <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
      <h1 className="text-2xl">
      LEARN TO CODE AT COMPUTING FOR ALL
      </h1>
      <h2 className='text-xl text-primary-600'>
      Computing for All offers a Full Stack Web Development
Pre-Apprenticeship Program for Washington state students.
      </h2>
      <p>
        this is totally the information that is going to  be here after im done working on it 
      </p>
      <p>
        need to fill up the page so it doesnt look weird 
      </p>
      <p>one more paragrapgh </p>


    </main>
  </>
  );
}
