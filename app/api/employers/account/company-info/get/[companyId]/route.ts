import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    ReadCompanyInfoDTO,
} from "@/data/dtos/EmployerProfileCreationDTOs";
const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, { params }: { params: { companyId: string } }) {
    try {
        const companyId = params.companyId;

        if(!companyId) {
            return NextResponse.json({success:false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }
        const companyInfo = await prisma.companies.findUnique({
            where: {
                company_id: companyId
            },
            select: {
                company_id: true,
                industry_sector_id: true,
                industry_sectors: {
                    select: {
                        sector_title: true,
                    }
                },
                company_name: true,
                company_logo_url: true,
                about_us: true,
                company_email: true,
                year_founded: true,
                company_website_url: true,
                company_video_url: true,
                company_phone: true,
                company_mission: true,
                company_vision: true,
                size: true,
                estimated_annual_hires: true,
                is_approved: true,
                company_addresses: {
                    select: {
                        state: true,
                        city: true,
                        zip_region: true,
                        county:true,
                    }
                }
            }
        });

        if(!companyInfo) {
            return NextResponse.json({success: true, error: `No entry exists for companyId: ${companyId}`})
        }

        const updatedAddresses = await prisma.company_addresses.findMany( {
            where: {
                company_id: companyId
            },
            select: {
                company_address_id: true,
                city: true,
                state: true,
                zip_region: true,
                county: true
            }
        })

        const result: ReadCompanyInfoDTO = {
            companyId: companyInfo.company_id,
            industrySectorId: companyInfo.industry_sector_id,
            industrySectorTitle: companyInfo?.industry_sectors?.sector_title,
            companyName: companyInfo.company_name,
            companyAddresses: updatedAddresses.map(address => ({
                addressId: address.company_address_id,
                state: address.state,
                city: address.city,
                zipCode: address.zip_region,
                county: address.county
            })),
            logoUrl: companyInfo.company_logo_url,
            aboutUs: companyInfo.about_us,
            companyEmail: companyInfo.company_email,
            yearFounded: companyInfo?.year_founded?.toString(),
            websiteUrl: companyInfo.company_website_url,
            videoUrl: companyInfo.company_video_url,
            companyPhone: companyInfo.company_phone,
            mission: companyInfo.company_mission,
            vision: companyInfo.company_vision,
            employeeCount: companyInfo.size,
            estimatedAnnualHires: companyInfo?.estimated_annual_hires?.toString(),
            isApproved: companyInfo.is_approved

        }
        return NextResponse.json({success:true, result}, {status: 200})

    } catch(e: any) {
        console.error('Error upserting job seeker introduction:', e.message);
        return NextResponse.json({error: `Failed to upsert employer personal information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}