import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {CreateUserDTO, ReadUserInfoDTO, Role} from "@/data/dtos/UserInfoDTO";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: CreateUserDTO = await request.json();
        const {
            email,
            firstName,
            lastName,
            roles,
        } = body;


        const data = await prisma.users.create({
            data: {
                user_id: uuidv4(),
                first_name: firstName,
                last_name: lastName,
                email: email,
                role: roles[0].toUpperCase().trim(), // fixme: modify database to handle multiple roles.
                createdAt: new Date(),
            },
            select: {
                user_id: true,
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
        if (!data?.user_id) {
            return NextResponse.json({success: false, error: `User not found.`}, {status: 404})
        }
        const responseRoles: Role[] = [];
        responseRoles.push(data.role.toUpperCase() as Role)
        const result: ReadUserInfoDTO = {
            userId: data.user_id,
            roles: responseRoles,
            jobseekerId: data.jobseekers?.[0]?.jobseeker_id || null,
            employerId: data.employers?.[0]?.employer_id || null,
            companyId: data.employers?.[0]?.company_id || null,
            companyIsApproved: data.employers?.[0]?.companies?.is_approved || false,
            employeeIsApproved: data.employers?.[0]?.is_verified_employee || false,

        }
        return NextResponse.json({success: true, result}, {status: 200});

    } catch (e: any) {
        return NextResponse.json({error: `Failed to create user record.${e.message}`}, {status: 500});

    } finally {
        await prisma.$disconnect()
    }
}