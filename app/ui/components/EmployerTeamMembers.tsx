'use server'
import { getEmployersByCompanyId } from "@/app/lib/prisma";
import { auth } from "@/auth";
import Avatar from "./Avatar";

export default async function EmployerTeamMembers(){
    let session = await auth();
    let teamates = await getEmployersByCompanyId(session?.user.companyId??'')
    console.log("Team Mates: ",teamates)
    return(
<div>
<div className="text-black/90 text-xl font-medium leading-relaxed">My team</div>
<div className="flex">
<div className="flex items-center">
<Avatar imgsrc={"/images/plusIcon.png"} scale={.75}/>
                <div className="text-sm font-semibold tracking-tight">Invite Team</div></div>
    {teamates.map((t)=>{
        return (
            <div className="flex items-center" key={t.employer_id}>
                <Avatar imgsrc={t.users.photo_url??undefined} scale={.75}/>
                <div className="text-sm font-semibold tracking-tight">{t.users.first_name} {t.users.last_name}</div>
            </div>
        )
    })}</div>
</div>
    );
}