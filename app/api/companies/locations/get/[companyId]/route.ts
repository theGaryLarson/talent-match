import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {ReadAddressDTO} from "@/data/dtos/EmployerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, {params}: { params: { companyId: string } }) {
    try {
        const companyId = params.companyId;

        if (!companyId) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }

        const companyAddresses = await prisma.company_addresses.findMany({
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
        if (!companyAddresses) {
            return NextResponse.json({
                success: false,
                error: `There are no companies with id ${companyId}`
            }, {status: 400})

        }

        const result: ReadAddressDTO[] = companyAddresses.map(address => ({
            addressId: address.company_address_id,
            city: address.city,
            state: address.state,
            zipCode: address.zip_region,
            county: address.county,
        }));

        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error reading company locations:', e.message);
        return NextResponse.json({error: `Failed to read company locations.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}