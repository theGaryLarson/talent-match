import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {ReadAddressDTO} from "@/data/dtos/EmployerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: { params: { locationId: string } }) {
    try {
        const addressId = params.locationId;

        if (!addressId) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }

        const deletedAddress = await prisma.company_addresses.delete({
            where: {
                company_address_id: addressId
            },
            select: {
                company_address_id: true,
                locationData: {
                    select: {
                        city: true,
                        state: true,
                        stateCode: true,
                        zip: true,
                        county: true
                    }
                }
            }
        })
        if (!deletedAddress) {
            return NextResponse.json({
                success: false,
                error: `There are no company with id ${addressId}`
            }, {status: 400})

        }

        const result: ReadAddressDTO = {
            addressId: deletedAddress.company_address_id,
            city: deletedAddress.locationData.city,
            state: deletedAddress.locationData.state,
            zipCode: deletedAddress.locationData.zip,
            county: deletedAddress.locationData.county,
        }

        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error reading company location:', e.message);
        return NextResponse.json({error: `Failed to read company location.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}