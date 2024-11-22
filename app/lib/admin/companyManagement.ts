import { auth } from "@/auth";
import { CompanyAdminCreationDTO } from "@/data/dtos/CompanyAdminCreationDTO";
import { Role } from "@/data/dtos/UserInfoDTO";
import { PrismaClient } from "@prisma/client";
import getPrismaClient from "../prismaClient.mjs";
import { v4 as uuidv4 } from 'uuid';
const prisma: PrismaClient = getPrismaClient();
export async function adminCreateCompany(companyData:CompanyAdminCreationDTO) {
    const Session = await auth();
    if(!Session?.user.roles.includes(Role.ADMIN)){
        throw new Error("Must Be Admin to complete this task")
    }
    if(!Session?.user.id){
        throw new Error("Must Be Admin to complete this task")
    }
    try{
        let result = await prisma.companies.create(
            {
                data:{
                    company_name:companyData.companyName,
                    company_email:companyData.companyEmail,
                    company_id: uuidv4(),
                    about_us: companyData.aboutUs,
                    size:companyData.size,
                    year_founded:companyData.yearFounded,
                    createdBy:Session.user.id

                }
            }
        )
        return result;
    }catch(e){
        console.error(e)
    }
}