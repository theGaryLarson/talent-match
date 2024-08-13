import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {PostEmployerPersonalDTO, ReadEmployerPersonalDTO} from "@/data/dtos/EmployerProfileCreationDTOs";
import parsePhoneNumberFromString from "libphonenumber-js";
import {formatPhoneE164} from "@/app/lib/utils";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try{
        const body: PostEmployerPersonalDTO = await request.json();
        const {
            userId,
            firstName,
            lastName,
            birthDate,
            email,
            phoneCountryCode,
            phone,
            gender,
            race,
            photoUrl,
        } = body;

        const formattedPhone = formatPhoneE164(phoneCountryCode, phone)
        const upsertedEmployer = await prisma.users.upsert({
            where: {
                user_id: userId
            },
            update: {
                first_name: firstName,
                last_name: lastName,
                birthdate: new Date(birthDate).toISOString(),
                email: email,
                phone: formattedPhone,
                gender: gender,
                race: race,
                photo_url: photoUrl,
                updatedAt: new Date(),
            },
            create: {
                user_id: userId,
                role: 'EMPLOYER',
                first_name: firstName,
                last_name: lastName,
                birthdate: new Date(birthDate).toISOString(),
                email: email,
                phone: formattedPhone,
                gender: gender,
                race: race,
                photo_url: photoUrl,
                createdAt: new Date(),
            }
        })

        const result: ReadEmployerPersonalDTO = {
            userId: upsertedEmployer.user_id,
            firstName: upsertedEmployer.first_name,
            lastName: upsertedEmployer.last_name,
            birthDate: upsertedEmployer?.birthdate?.toISOString(),
            email: upsertedEmployer.email,
            phoneCountryCode: upsertedEmployer?.phone ? parsePhoneNumberFromString(upsertedEmployer.phone)?.countryCallingCode : null,
            phone: upsertedEmployer?.phone ? parsePhoneNumberFromString(upsertedEmployer.phone)?.number : null,
            gender: upsertedEmployer.gender,
            race: upsertedEmployer.race,
            photoUrl: upsertedEmployer.photo_url,
        }
        return NextResponse.json({success:true, result}, {status: 200})

    } catch(e: any) {
        console.error('Error upserting employer:', e.message);
        return NextResponse.json({error: `Failed to upsert employer personal information.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}