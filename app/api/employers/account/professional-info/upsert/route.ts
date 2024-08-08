import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    CompanyInfoSummaryDTO,
    PostEmployerWorkDTO,
    ReadEmployerWorkDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: PostEmployerWorkDTO = await request.json();
        const {
            userId,
            currentJobTitle,
            linkedInUrl,
            workAddressId,
        } = body;
        const addressId = !workAddressId ? undefined : workAddressId
        const upsertedEmployer = await prisma.employers.upsert({
            where: {
                user_id: userId
            },
            update: {
                job_title: currentJobTitle,
                linkedin_url: linkedInUrl,
                work_address_id: addressId,
            },
            create: {
                employer_id: uuidv4(),
                user_id: userId,
                company_id: undefined,
                job_title: currentJobTitle,
                work_address_id: addressId,
                linkedin_url: linkedInUrl,
                is_verified_employee: false
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
                            where: {
                                company_address_id: addressId,

                            },
                            select: {
                                company_address_id: true,
                                city: true,
                                state: true,
                                zip_region: true,
                            }
                        }
                    }
                }
            }
        })
        console.log(JSON.stringify(upsertedEmployer, null, 2))
        const result: ReadEmployerWorkDTO & CompanyInfoSummaryDTO = {
            employerId: upsertedEmployer.employer_id,
            currentJobTitle: upsertedEmployer.job_title,
            linkedInUrl: upsertedEmployer.linkedin_url,
            companyId: upsertedEmployer?.companies?.company_id,
            companyName: upsertedEmployer?.companies?.company_name,
            isVerifiedEmployee: upsertedEmployer.is_verified_employee,
            companyAddress: {
                addressId: upsertedEmployer?.companies?.company_addresses[0]?.company_address_id,
                city: upsertedEmployer?.companies?.company_addresses[0]?.city,
                state: upsertedEmployer?.companies?.company_addresses[0]?.state,
                zipCode: upsertedEmployer?.companies?.company_addresses[0]?.zip_region
            }

        }
        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error upserting job seeker intro:', e.message);
        return NextResponse.json({error: `Failed to upsert employer profession information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}