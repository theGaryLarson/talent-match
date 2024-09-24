import { NextResponse, NextRequest } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import {
  PostAddressDTO,
  PostCompanyInfoDTO,
  ReadCompanyInfoDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
import { v4 as uuidv4 } from 'uuid';
import { devLog, formatPhoneE164 } from '@/app/lib/utils';
import parsePhoneNumberFromString from 'libphonenumber-js';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
  try {
    const body: PostCompanyInfoDTO = await request.json();
    const {
      userId,
      employerId,
      companyId,
      industrySectorId,
      companyName,
      // companyAddresses,
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
      size,
      estimatedAnnualHires,
    } = body;
    const formattedPhone = formatPhoneE164(phoneCountryCode, companyPhone);

    // Ensure employer record exists for user and is connected to user.
    const newEmployerId: string = uuidv4();
    await prisma.employers.upsert({
      where: {
        user_id: userId,
      },
      update: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      create: {
        employer_id: employerId || newEmployerId,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const newCompanyId: string = uuidv4();
    const upsertedCompany = await prisma.companies.upsert({
      where: {
        company_id: companyId || newCompanyId,
      },
      update: {
        industry_sector_id: industrySectorId,
        company_name: companyName,
        company_logo_url: logoUrl,
        about_us: aboutUs || undefined,
        company_email: companyEmail,
        year_founded: parseInt(yearFounded, 10),
        company_website_url: websiteUrl,
        company_video_url: videoUrl,
        company_phone: formattedPhone,
        company_mission: mission,
        company_vision: vision,
        size: size,
        estimated_annual_hires: parseInt(estimatedAnnualHires, 10),
        employers: {
          connect: {
            user_id: userId,
          },
        },
      },
      create: {
        company_id: companyId || newCompanyId,
        industry_sector_id: industrySectorId,
        company_name: companyName,
        company_logo_url: logoUrl,
        about_us: aboutUs || '',
        company_email: companyEmail,
        year_founded: parseInt(yearFounded, 10),
        company_website_url: websiteUrl,
        company_video_url: videoUrl,
        company_phone: formattedPhone,
        company_mission: mission,
        company_vision: vision,
        size: size,
        estimated_annual_hires: parseInt(estimatedAnnualHires, 10),
        is_approved: false,
        employers: {
          connect: {
            user_id: userId,
          },
        },
      },
      select: {
        company_id: true,
        industry_sector_id: true,
        industry_sectors: {
          select: {
            sector_title: true,
          },
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
      },
    });

    if (!upsertedCompany) {
      return NextResponse.json({
        success: false,
        error: `No company exists for companyId: ${companyId}`,
      });
    }

    const upsertPromises = companyAddresses?.map((address: PostAddressDTO) => {
      return prisma.company_addresses.upsert({
        where: {
          company_id_zip: {
            company_id: companyId || newCompanyId,
            zip: address.zipCode,
          },
        },
        update: {
          zip: address.zipCode,
        },
        create: {
          company_address_id: uuidv4(),
          zip: address.zipCode,
          company_id: upsertedCompany.company_id,
        },
        select: {
          company_address_id: true,
          locationData: {
            select: {
              city: true,
              state: true,
              zip: true,
              county: true,
            }
          },
        },
      });
    });

    if (Array.isArray(upsertPromises) && upsertPromises.length > 0) {
      await Promise.all(upsertPromises);
    }

    const updatedAddresses = await prisma.company_addresses.findMany({
      where: {
        company_id: companyId,
      },
      select: {
        company_address_id: true,
        locationData: {
          select: {
            city: true,
            state: true,
            zip: true,
            county: true,
          }
        }

      },
    });

    const result: ReadCompanyInfoDTO = {
      companyId: upsertedCompany.company_id,
      industrySectorId: upsertedCompany.industry_sector_id,
      industrySectorTitle: upsertedCompany?.industry_sectors?.sector_title,
      companyName: upsertedCompany.company_name,
      companyAddresses: updatedAddresses?.map((address) => ({
        addressId: address.company_address_id,
        state: address.locationData.state,
        city: address.locationData.city,
        zipCode: address.locationData.zip,
        county: address.locationData.county,
      })) || undefined,
      logoUrl: upsertedCompany.company_logo_url,
      aboutUs: upsertedCompany.about_us,
      companyEmail: upsertedCompany.company_email,
      yearFounded: upsertedCompany?.year_founded?.toString(),
      websiteUrl: upsertedCompany.company_website_url,
      videoUrl: upsertedCompany.company_video_url,
      phoneCountryCode: upsertedCompany.company_phone
        ? parsePhoneNumberFromString(upsertedCompany?.company_phone)
            ?.countryCallingCode
        : null,
      companyPhone: upsertedCompany.company_phone,
      mission: upsertedCompany.company_mission,
      vision: upsertedCompany.company_vision,
      employeeCount: upsertedCompany.size,
      estimatedAnnualHires: upsertedCompany?.estimated_annual_hires?.toString(),
      isApproved: upsertedCompany.is_approved,
    };

    // Fixme: Update session with new employerId and companyId. Session returning null.
    // const session = await auth(); // Get the session using the auth function
    // if (session) {
    //   // Update session properties
    //   session.user.employerId = employerId || newEmployerId;
    //   session.user.companyId = companyId || newCompanyId;
    // }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error('Error upserting company information:', e.message);
    return NextResponse.json(
      { error: `Failed to upsert company information.\n${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
