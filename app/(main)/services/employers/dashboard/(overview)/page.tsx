import EmployerNameTitleTag from '@/app/ui/components/EmployerNameTitleTag';
import ScoreCard from '@/app/ui/components/ScoreCard';
import { useSession } from 'next-auth/react';
import { ReadCompanyInfoDTO, ReadEmployerWorkDTO, CompanyInfoSummaryDTO } from '@/data/dtos/EmployerProfileCreationDTOs';
import { useEffect, useState } from 'react';
import DeletionFlag from '@/app/ui/components/DeletionFlag';
import { getCompanyById, getEmployerById, getEmployersByCompanyId } from '@/app/lib/prisma';
import EmployerTeamMembers from '@/app/ui/components/EmployerTeamMembers';
import { auth } from '@/auth';
//employer dashboard
export default async function Page() {
  const session = await auth();
  const company = await getCompanyById(session?.user.companyId??'');
  const proInfo = await getEmployerById(session?.user.employerId??'');
  return (
    <main className="mx-4 space-y-3 py-8 font-['Roboto'] tablet:mx-[100px] tablet:mx-[50px] desktop:mx-[200px]">
      <DeletionFlag deletionDate={undefined} />
      <div className="font-['Roboto'] text-2xl font-medium leading-[28.80px] text-black/90">
        My Dashboard
      </div>
      <EmployerNameTitleTag
        name={session?.user.name}
        title={proInfo?.job_title??''}
        company={company?.company_name?? ''}
        pfp={session?.user.image ?? undefined}
      />
      <div className="flex flex-wrap justify-evenly gap-5">
        {<ScoreCard title="Saved Candidates" val={3} />}
        {<ScoreCard title="Job Applications " val={5} />}
      </div>
      <EmployerTeamMembers/>
    </main>
  );
}

