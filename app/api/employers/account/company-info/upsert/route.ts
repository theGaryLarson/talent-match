import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    PostAddressDTO,
    PostCompanyInfoDTO, ReadCompanyInfoDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';
import {formatPhoneE164} from "@/app/lib/utils";
import parsePhoneNumberFromString from "libphonenumber-js";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: PostCompanyInfoDTO = await request.json();
        const {
            userId,
            companyId,
            industrySectorId,
            companyName,
            companyAddresses,
            logoUrl,
            aboutUs,
            companyEmail,
            yearFounded,
            websiteUrl,
            videoUrl,
            phoneCountryCode,
            companyPhone,
            mission,
            vision,
            employeeCount,
            estimatedAnnualHires,
        } = body;

        const formattedPhone = formatPhoneE164(phoneCountryCode, companyPhone)
        const upsertedCompany = await prisma.companies.upsert({
            where: {
                company_id: companyId
            },
            update: {
                industry_sector_id: industrySectorId,
                company_name: companyName,
                company_logo_url: logoUrl,
                about_us: aboutUs,
                company_email: companyEmail,
                year_founded: parseInt(yearFounded, 10),
                company_website_url: websiteUrl,
                company_video_url: videoUrl,
                company_phone: formattedPhone,
                company_mission: mission,
                company_vision: vision,
                size: employeeCount,
                estimated_annual_hires: parseInt(estimatedAnnualHires, 10),
                employers: {
                    connect: {
                        user_id: userId,
                    }
                }
            },
            create: {
                company_id: uuidv4(),
                industry_sector_id: industrySectorId,
                company_name: companyName,
                company_logo_url: logoUrl,
                about_us: aboutUs,
                company_email: companyEmail,
                year_founded: parseInt(yearFounded, 10),
                company_website_url: websiteUrl,
                company_video_url: videoUrl,
                company_phone: formattedPhone,
                company_mission: mission,
                company_vision: vision,
                size: employeeCount,
                estimated_annual_hires: parseInt(estimatedAnnualHires, 10),
                is_approved: false,
                employers: {
                    connect: {
                        user_id: userId,
                    }
                }
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
            }
        })

        if (!upsertedCompany) {
            return NextResponse.json({success: false, error: `No company exists for companyId: ${companyId}`})
        }

        const upsertPromises = companyAddresses.map((address: PostAddressDTO) => {
            return prisma.company_addresses.upsert({
                where: {
                    company_id_city: {
                        company_id: companyId,
                        city: address.city
                    }
                },
                update: {
                    city: address.city,
                    state: address.state,
                    zip_region: address.zipCode,
                    county: address.county
                },
                create: {
                    company_address_id: uuidv4(),
                    city: address.city,
                    state: address.state,
                    zip_region: address.zipCode,
                    county: address.county,
                    companies: {connect: {company_id: companyId}}
                },
                select: {
                    city: true,
                    state: true,
                    zip_region: true,
                    county: true
                }
            });
        });

        await Promise.all(upsertPromises);
        const updatedAddresses = await prisma.company_addresses.findMany({
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
            companyId: upsertedCompany.company_id,
            industrySectorId: upsertedCompany.industry_sector_id,
            industrySectorTitle: upsertedCompany?.industry_sectors?.sector_title,
            companyName: upsertedCompany.company_name,
            companyAddresses: updatedAddresses.map(address => ({
                addressId: address.company_address_id,
                state: address.state,
                city: address.city,
                zipCode: address.zip_region,
                county: address.county
            })),
            logoUrl: upsertedCompany.company_logo_url,
            aboutUs: upsertedCompany.about_us,
            companyEmail: upsertedCompany.company_email,
            yearFounded: upsertedCompany?.year_founded?.toString(),
            websiteUrl: upsertedCompany.company_website_url,
            videoUrl: upsertedCompany.company_video_url,
            phoneCountryCode: upsertedCompany.company_phone ? parsePhoneNumberFromString(upsertedCompany?.company_phone)?.countryCallingCode : null,
            companyPhone: upsertedCompany.company_phone,
            mission: upsertedCompany.company_mission,
            vision: upsertedCompany.company_vision,
            employeeCount: upsertedCompany.size,
            estimatedAnnualHires: upsertedCompany?.estimated_annual_hires?.toString(),
            isApproved: upsertedCompany.is_approved

        }
        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error upserting company information:', e.message);
        return NextResponse.json({error: `Failed to upsert company information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}