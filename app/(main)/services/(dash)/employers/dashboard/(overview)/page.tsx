import EmployerNameTitleTag from '@/app/ui/components/employerdashboard/EmployerNameTitleTag';
import ScoreCard from '@/app/ui/components/ScoreCard';
import DeletionFlag from '@/app/ui/components/DeletionFlag';
import { getCompanyById, getEmployerById } from '@/app/lib/prisma';
import EmployerTeamMembers from '@/app/ui/components/employerdashboard/EmployerTeamMembers';
import { auth } from '@/auth';
import EmployerRecentJobPosts from '@/app/ui/components/employerdashboard/EmployerRecentJobPosts';
import Link from 'next/link';
//employer dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const session = await auth();
  const company = await getCompanyById(session?.user.companyId??'');
  const proInfo = await getEmployerById(session?.user.employerId??'');
  if(!proInfo || (session?.user.companyId == undefined) ||(session?.user.companyId == null) ){
    return (
      <div>
        <h1 className='text-2xl'>
          There has been an error finding your info please try logging out and logging back in
        </h1>
      </div>
    );
  }
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <DeletionFlag deletionDate={undefined} />
      <h1 className="text-2xl font-medium">
        My Dashboard
      </h1>
      <EmployerNameTitleTag
        name={session?.user.name}
        title={proInfo?.job_title??''}
        company={company?.company_name?? ''}
        pfp={session?.user.image ?? undefined}
      />
      <div className="flex flex-wrap justify-evenly gap-5">
        <Link href='/services/employers/dashboard/savedcandidates'>
        {<ScoreCard title="Saved Candidates" val={proInfo.BookmarkedJobseeker.length} />}</Link>
        <Link href="/services/employers/dashboard/myjobposts">
        {<ScoreCard title="Job Listings" val={proInfo.job_postings.length} />}</Link>
      </div>
      <EmployerRecentJobPosts/>
      <EmployerTeamMembers/>
    </main>
  );
}

