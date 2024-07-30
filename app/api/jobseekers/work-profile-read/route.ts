import {NextResponse} from 'next/server';
import {PrismaClient, WorkExperience} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JsWorkExpDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {userId} = body;
        if (!userId) {
            return NextResponse.json({error: 'User ID is required'}, {status: 400});
        }

        const c = await prisma.contacts.findUnique({
            where: {
                user_id: userId
            },
            select: {
                user_id: true,
                jobseekers: {
                    select: {
                        jobseeker_id: true,
                        years_work_exp: true,
                        months_internship_exp: true,
                        work_experiences: true,
                        jobseekers_private_data: {
                            select: {
                                is_authorized_to_work_in_usa: true,
                                job_sponsorship_required: true,
                            }
                        }
                    }
                }
            }
        })
        if (!c) {
            return NextResponse.json({error: `Record does not exist for userId:${userId}`}, {status: 400})
        } else {
            const js = c.jobseekers.map(j => {

            })
        }


        // const jobseeker: JsWorkExpDTO = {
        //     userId: c.user_id,
        //     yearsWorkExperience:
        // }
        return NextResponse.json({
            success: true,
            c,
        }, {status: 200});
    } catch (error: any) {

    } finally {
        await prisma.$disconnect();
    }
}