import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    CompanyInfoSummaryDTO,
    ReadEmployerWorkDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if(!userId) {
            return NextResponse.json({success:false, error: `A uuidv4 userId is required.`}, {status: 400})
        }
        const empWorkInfo = await prisma.employers.findUnique({
            where: {
                user_id: userId
            },
            select: {
                employer_id: true,
                job_title: true,
                linkedin_url: true,
                is_verified_employee: true,
                companies: {
                    select: {
                        company_id: true,
                        company_name: true,
                        company_logo_url: true,
                        company_addresses: {
                            select: {
                                city: true,
                                state: true,
                                zip_region: true,
                            }
                        }
                    }
                }
            }
        });

        if(!empWorkInfo) {
            return NextResponse.json({success: true, error: `No entry exists for userId: ${userId}`})
        }

        const result: ReadEmployerWorkDTO & CompanyInfoSummaryDTO = {
            employerId: empWorkInfo.employer_id,
            currentJobTitle: empWorkInfo.job_title,
            linkedInUrl: empWorkInfo.linkedin_url,
            companyId: empWorkInfo?.companies?.company_id,
            companyName: empWorkInfo?.companies?.company_name,
            isVerifiedEmployee: empWorkInfo.is_verified_employee,
            companyAddress: {
                city: empWorkInfo?.companies?.company_addresses[0].city,
                state: empWorkInfo?.companies?.company_addresses[0].state,
                zipCode: empWorkInfo?.companies?.company_addresses[0].zip_region
            }

        }
        return NextResponse.json({success:true, result}, {status: 200})

    } catch(e: any) {
        console.error('Error upserting job seeker introduction:', e.message);
        return NextResponse.json({error: `Failed to upsert employer personal information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}