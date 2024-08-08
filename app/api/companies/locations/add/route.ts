import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {PostAddressDTO, ReadAddressDTO} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: PostAddressDTO & {companyId: string} = await request.json();
        const {
            companyId,
            city,
            state,
            zipCode,
            county,
        } = body;
        if (!companyId) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }

        const newLocation = await prisma.company_addresses.create({
            data: {
              company_address_id: uuidv4(),
              company_id: companyId,
              city,
              state,
              zip_region: zipCode,
              county
            },
            select: {
                company_address_id: true,
                city: true,
                state: true,
                zip_region: true,
                county: true
            }
        })

        const result: ReadAddressDTO = {
            addressId: newLocation.company_address_id,
            city: newLocation.city,
            state: newLocation.state,
            zipCode: newLocation.zip_region,
            county: newLocation.county,
        }

        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error creating company location:', e.message);
        return NextResponse.json({error: `Failed to create company location.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}