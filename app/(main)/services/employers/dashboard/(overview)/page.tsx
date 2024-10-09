'use client';
import EmployerNameTitleTag from '@/app/ui/components/EmployerNameTitleTag';
import ScoreCard from '@/app/ui/components/ScoreCard';
import { useSession } from 'next-auth/react';
import { ReadCompanyInfoDTO, ReadEmployerWorkDTO, CompanyInfoSummaryDTO } from '@/data/dtos/EmployerProfileCreationDTOs';
import { useEffect, useState } from 'react';
import DeletionFlag from '@/app/ui/components/DeletionFlag';
//employer dashboard
export default function Page() {
  const { data: session } = useSession();
  const [company, setCompany] = useState<ReadCompanyInfoDTO>();
  const [proInfo, setProInfo] = useState<ReadEmployerWorkDTO & CompanyInfoSummaryDTO>();
  useEffect(() => {
    async function getData() {
      try {
        if (session?.user?.employerId) {
          const response = await fetch(
            `/api/employers/account/company-info/get/${session.user.companyId}`,
          );
          const data = await response.json();
          setCompany(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    async function getProInfo() {
      try {
        if (session?.user.id) {
          const response = await fetch(
            `/api/employers/account/professional-info/get/${session.user.id}`,
          );
          const data = await response.json();
          console.log(data)
          setProInfo(data)
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (session) {
      getData();
      getProInfo();
    }
  }, [session]);

  return (
    <main className="mx-4 space-y-3 py-8 font-['Roboto'] tablet:mx-[100px] tablet:mx-[50px] desktop:mx-[200px]">
      <DeletionFlag deletionDate={undefined} />
      <div className="font-['Roboto'] text-2xl font-medium leading-[28.80px] text-black/90">
        My Dashboard
      </div>
      <EmployerNameTitleTag
        name={session?.user.name}
        title={proInfo?.currentJobTitle??''}
        company={company?.companyName ?? ''}
        pfp={session?.user.image ?? undefined}
      />
      <div className="flex flex-wrap justify-evenly gap-5">
        {<ScoreCard title="Saved Candidates" val={3} />}
        {<ScoreCard title="Job Applications " val={5} />}
      </div>
    </main>
  );
}
