"use server";
import { getEmployersByCompanyId } from "@/app/lib/prisma";
import { auth } from "@/auth";
import Avatar from "../Avatar";
import ShareMenu from "../ShareButton";

export default async function EmployerTeamMembers(props: {
  companyid: string;
}) {
  let session = await auth();
  let teamates = await getEmployersByCompanyId(props.companyid);
  return (
    <div>
      <div className="text-xl font-medium leading-relaxed text-black/90">
        My team
      </div>
      <div className="flex flex-wrap gap-[16px] rounded-[10px] bg-white p-4 shadow">
        <ShareMenu href={"/signin"}>
          <div className="flex items-center gap-[8px]">
            <Avatar imgsrc={"/images/plusIcon.png"} scale={0.75} />
            <div className="text-sm font-semibold tracking-tight">
              Invite Team
            </div>
          </div>
        </ShareMenu>
        {teamates
          .filter((t) => t.employer_id != session?.user.employerId)
          .map((t) => {
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
