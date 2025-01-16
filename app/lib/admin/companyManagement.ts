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
        throw new Error("Must Be a user to complete this task")
    }
    let t = Session?.user.roles.includes(Role.ADMIN)
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
                    createdBy:Session.user.id,
                    company_mission: companyData.companyMission,
                    estimated_annual_hires:companyData.estimatedAnnualHires,
                    industry_sector_id:companyData.industrySectorId,
                    is_approved: true, //since this is created by an employer currently
                    company_website_url:companyData.companyWebsiteUrl,
                    company_phone:companyData.companyPhone,
                    company_vision: companyData.companyVision,

                }
            }
        )
        return result;
    }catch(e){
        console.error(e)
    }
}

export async function adminUpdateCompanyApproval(companyId:string,isApproved:boolean ) {
    try {
        const Session = await auth();
        if(!Session?.user.roles.includes(Role.ADMIN)){
            throw new Error("Must Be Admin to complete this task")
        }
        let res = await prisma.companies.update({
            where:{
                company_id:companyId
            },
            data:{
                is_approved:isApproved
            }
        })
        return res;
    } catch (error) {
        console.error(error) 
    }
}

export async function getAllCompaniesWithAllEmployers(){
    try{
        const res = await prisma.companies.findMany({include:{
            employers:{
                include:{
                    users:true
                }
            }
        }});
        return res;
    }catch(error){
        return[];
    }
}