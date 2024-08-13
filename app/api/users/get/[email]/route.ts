import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {ReadUserInfoDTO, Role} from "@/data/dtos/UserInfoDTO";

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, {params}: {params: {email: string}}) {
    try {
        const email = params.email;

        const data = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                role: true,
                jobseekers: {
                    select: {
                        jobseeker_id: true,
                    }
                },
                employers: {
                    select: {
                        employer_id: true,
                        company_id: true,
                        is_verified_employee: true,
                        companies: {
                            select: {
                                is_approved: true,
                            }
                        }
                    },
                }
            }
        });
        if (!data?.id) {
            return NextResponse.json({success: false, error: `User not found.`}, {status: 404})
        }
        const roles: Role[] = [];
            roles.push(data.role.toUpperCase() as Role)
        const result: ReadUserInfoDTO  = {
            userId: data.id,
            roles: roles,
            jobseekerId: data.jobseekers?.[0]?.jobseeker_id || null,
            employerId: data.employers?.[0]?.employer_id || null,
            companyId: data.employers?.[0]?.company_id || null,
            companyIsApproved: data.employers?.[0]?.companies?.is_approved || false,
            employeeIsApproved: data.employers?.[0]?.is_verified_employee || false,

        }
        return NextResponse.json({success: true,  result}, {status: 200});

    } catch (e: any) {
        return NextResponse.json({error: `Failed to read jobseeker skills: ${e.message}`}, {status: 500});

    } finally {
        await prisma.$disconnect()
    }
}