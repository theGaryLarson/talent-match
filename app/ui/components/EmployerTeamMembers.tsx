'use server';
import { getEmployersByCompanyId } from '@/app/lib/prisma';
import { auth } from '@/auth';
import Avatar from './Avatar';

export default async function EmployerTeamMembers() {
  let session = await auth();
  let teamates = await getEmployersByCompanyId(session?.user.companyId ?? '');
  console.log('Team Mates: ', teamates);
  return (
    <div>
      <div className="text-xl font-medium leading-relaxed text-black/90">
        My team
      </div>
      <div className="flex gap-[16px] p-4 bg-white rounded-[10px] shadow">
        <div className="flex items-center gap-[8px]">
          <Avatar imgsrc={'/images/plusIcon.png'} scale={0.75} />
          <div className="text-sm font-semibold tracking-tight">
            Invite Team
          </div>
        </div>
        {teamates.map((t) => {
          return (
            <div className="flex items-center gap-[8px]" key={t.employer_id}>
              <Avatar imgsrc={t.users.photo_url ?? undefined} scale={0.75} />
              <div className="text-sm font-semibold tracking-tight">
                {t.users.first_name} {t.users.last_name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
