import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import { auth } from '@/auth';
import { v4 as uuidv4 } from 'uuid';
import {Role} from "@/data/dtos/UserInfoDTO";

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

        prisma.$transaction( async (prisma) => {

            prisma.user.upsert({
                where: {
                    id: session?.user?.id!
                },
                update: {
                    first_name: firstName,
                    last_name: lastName,
                },
                create: {
                    id: uuidv4(),
                    role: Role.EMPLOYER,
                    first_name: firstName,
                    last_name: lastName,
                    email: session?.user.email!,
                    has_agreed_terms: false,
                    createdAt: new Date(Date.now()),
                }
            });

            prisma.employers.upsert({
                where: {
                    user_id: session?.user?.id!
                },
                update: {
                    job_title: currentJobTitle,
                    linkedin_url: linkedInUrl,
                    company_addresses: {
                        connect: {
                            company_address_id: workAddressId,
                        }
                    }
                },
                create: {
                    employer_id: session?.user.employerId!,
                    job_title: currentJobTitle,
                    linkedin_url: linkedInUrl,
                    hasAgreedTerms: false,
                    is_verified_employee: false,
                    users: {
                        connect: {
                            id: session?.user.id!,
                        }
                    },
                    company_addresses: {
                        connect: {
                            company_address_id: workAddressId,
                        }
                    },
                    companies: {
                        connect: {
                            company_id: companyId,
                        }
                    }
                }
            });
        }); // end transaction

        return NextResponse.json({ success: true }, {status: 200})

    } catch (e: any) {
        console.error('Error creating employer profile:', e.message);
        return NextResponse.json({error: `Failed to create employer profile.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}