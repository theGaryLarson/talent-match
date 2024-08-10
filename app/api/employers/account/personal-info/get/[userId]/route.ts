import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {PostEmployerPersonalDTO, ReadEmployerPersonalDTO} from "@/data/dtos/EmployerProfileCreationDTOs";
import parsePhoneNumberFromString from "libphonenumber-js";

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if(!userId) {
            return NextResponse.json({success:false, error: `A uuidv4 userId is required.`}, {status: 400})
        }
        const empPersonalInfo = await prisma.contacts.findUnique({
            where: {
                user_id: userId
            }
        });

        if(!empPersonalInfo) {
        return NextResponse.json({success: true, error: `No entry exists for userId: ${userId}`})
        }

        const result: ReadEmployerPersonalDTO = {
            userId: empPersonalInfo.user_id,
            firstName: empPersonalInfo?.first_name,
            lastName: empPersonalInfo?.last_name,
            birthDate: empPersonalInfo?.birthdate.toISOString(),
            email: empPersonalInfo?.email,
            phoneCountryCode: empPersonalInfo?.phone ? parsePhoneNumberFromString(empPersonalInfo.phone)?.countryCallingCode : null,
            phone: empPersonalInfo?.phone,
            gender: empPersonalInfo?.gender,
            race: empPersonalInfo?.race,
            photoUrl: empPersonalInfo?.photo_url,
        }
        return NextResponse.json({success:true, result}, {status: 200})

    } catch(e: any) {
        console.error('Error upserting job seeker introduction:', e.message);
        return NextResponse.json({error: `Failed to upsert employer personal information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}