import {NextResponse} from 'next/server';
import {PrismaClient, WorkExperience} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JsWorkExpDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, {params}: {params: {userId: string}}) {
    try {
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json({error: 'User ID is required'}, {status: 400});
        }

        const user = await prisma.users.findUnique({
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
        });

        if (!user) {
            return NextResponse.json({error: `Record does not exist for userId: ${userId}`}, {status: 400});
        } else {
            // Assuming there is only one jobseeker per user
            const jobseeker = user.jobseekers[0];

            const privateData = jobseeker?.jobseekers_private_data[0]; // There's only one private data record per jobseeker

            const workExperiences: WorkExperience[] = jobseeker?.work_experiences.map((w) => ({
                workId: w.workId,
                jobseekerId: w.jobseekerId,
                company: w.company,
                jobTitle: w.jobTitle,
                isCurrentJob: w.isCurrentJob,
                startDate: w.startDate,
                endDate: w.endDate,
                responsibilities: w.responsibilities,
                isInternship: w.isInternship,
                techAreaId: w.techAreaId,
            }));

            const result: JsWorkExpDTO = {
                userId: user.user_id,
                yearsWorkExperience: jobseeker.years_work_exp?.toString() ?? "0",
                monthsInternshipExperience: jobseeker.months_internship_exp?.toString() ?? "0",
                isAuthorizedToWorkUsa: privateData.is_authorized_to_work_in_usa,
                requiresSponsorship: privateData.job_sponsorship_required,
                workExperiences: workExperiences,
            };

            return NextResponse.json({
                success: true,
                result,
            }, {status: 200});
        }

    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({error: `Failed to read work experiences.\n${e.message} `}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
