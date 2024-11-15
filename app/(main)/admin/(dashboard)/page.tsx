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
  //const company = await getCompanyById(session?.user.companyId??'');
  //const proInfo = await getEmployerById(session?.user.employerId??'');
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <DeletionFlag deletionDate={undefined} />
      <h1 className="text-2xl font-medium">
        My Dashboard
      </h1>
      <p>
        Admin Dash 
      </p>
      <p>
        Reminder To add stats for nerds here like:
      </p>
      <ul>
        <li>Total Number of Jobseekers</li>
        <li>Gender makeup oj Jobseekers</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

    </main>
  );
}

