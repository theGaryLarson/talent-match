'use server'
import { getEmployersByCompanyId } from "@/app/lib/prisma";
import { auth } from "@/auth";

export default async function EmployerTeamMembers(){
    let session = await auth();
    let teamates = await getEmployersByCompanyId(session?.user.companyId??'')
    console.log("Team Mates: ",teamates)
    return(
<div>
    My Team
</div>
    );
}