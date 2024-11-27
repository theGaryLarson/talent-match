import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import { ReadEmployerProfileDTO } from "@/data/dtos/EmployerProfileCreationDTOs";
import { auth } from '@/auth';
const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request) {
    try {
        const session = await auth();
        const body = await request.json()
        const { userId, firstName, lastName, currentJobTitle, linkedInUrl, workAddressId, companyId} = body;

        if (!userId ) {
            return NextResponse.json({success: false, error: `A uuidv4 userId is required.`}, {status: 400})
        }
        if (!companyId ) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }

        const createdEmployerProfile = await prisma.$transaction( async (prisma) => {

            const updatedUser = await prisma.user.upsert({
                where: {
                    id: session?.user?.id!
                },update: {

                },
                create: {
                    first_name: firstName,
                    last_name: lastName,
                    email: session?.user.email!,
                    has_agreed_terms: false,
                }
            });

            const updatedEmployer = await prisma.employers.upsert({
                where: {
                    user_id: session?.user?.id!
                },update: {

                },
                create: {

                }
            });

            const
        })


        const result: ReadEmployerProfileDTO[] = companyTestimonial.map(t => ({
            testimonyId: t.testimonial_id,
            companyId: t.company_id,
            employerId: t.employer_id,
            text: t.text,
            author: t.author,
        }));


        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error creating company testimonial:', e.message);
        return NextResponse.json({error: `Failed to create company testimonial.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}