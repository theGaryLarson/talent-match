//employer landing page
import BrowseByCategory from '@/app/ui/components/BrowseByCategory';
import CategoryCard from '@/app/ui/components/CategoryCard';
import EmployerPageBanner from '@/app/ui/components/EmployerPageBanner';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import PageBanner from '@/app/ui/components/PageBannner';
import PhotoCardWithTitle from '@/app/ui/components/PhotoCardWithTitle';
import RoundedButton from '@/app/ui/components/RoundedButton';

import SimpleCard from '@/app/ui/components/SimpleCard';
import SimpleCardWithPhoto from '@/app/ui/components/SimpleCarWithPhoto';
import TCPortalFunctionsFold from '@/app/ui/components/TCPortalFunctionsFold';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <EmployerPageBanner/>
      <main className="mx-4 space-y-3 py-8 font-['Roboto'] tablet:mx-[150px] laptop:mx-[200px]">
        <TCPortalFunctionsFold/>
      </main>
    </>
  );
}



