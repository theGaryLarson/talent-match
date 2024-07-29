import {NextResponse} from 'next/server';
import {PrismaClient, WorkExperience} from '@prisma/client';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JsWorkExpDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    let result: JsWorkExpDTO | null = null;
    try {
        const body: JsWorkExpDTO = await request.json();

        const {
            userId,
            yearsWorkExperience,
            monthsInternshipExperience,
            isAuthorizedToWorkUsa,
            requiresSponsorship,
            workExperiences
        } = body;


        await prisma.$transaction(async (prisma) => {
            // Update the jobseeker table with the provided properties
            const updatedJobseeker = await prisma.jobseekers.update({
                where: {user_id: userId},
                data: {
                    years_work_exp: yearsWorkExperience ? parseInt(yearsWorkExperience, 10) : undefined,
                    months_internship_exp: monthsInternshipExperience ? parseInt(monthsInternshipExperience, 10): undefined
                },
            });

            // TODO: encryption of private data
            const updatedPrivateData = await prisma.jobseekers_private_data.upsert({
                where: {
                    jobseeker_id: updatedJobseeker.jobseeker_id,
                },
                update: {
                    is_authorized_to_work_in_usa: isAuthorizedToWorkUsa,
                    job_sponsorship_required: requiresSponsorship,
                },
                create: {
                    jobseeker_private_data_id: uuidv4(),
                    jobseeker_id: updatedJobseeker.jobseeker_id,
                    ssn: undefined,
                    is_authorized_to_work_in_usa: isAuthorizedToWorkUsa,
                    job_sponsorship_required: requiresSponsorship,
                }
            })

            const createdWorkExperiences: WorkExperience[] = [];
            const workExpPromises = workExperiences?.map(async (workExperience: WorkExperience) => {
                const existingWorkExperience = await prisma.workExperience.findUnique({
                    where: {
                        workId: workExperience.workId,
                    }
                });

                const updateData: Partial<WorkExperience> = {
                    company: workExperience.company,
                    jobTitle: workExperience.jobTitle,
                    isCurrentJob: workExperience.isCurrentJob,
                    startDate: new Date(workExperience.startDate),
                    endDate: workExperience.endDate ? new Date(workExperience.endDate) : null,
                    responsibilities: workExperience.responsibilities,
                    isInternship: workExperience.isInternship,
                    techAreaId: workExperience.techAreaId || undefined,
                };

                if (existingWorkExperience) {
                    const updatedWorkExperience = await prisma.workExperience.update({
                        where: {workId: existingWorkExperience.workId},
                        data: updateData,
                    });
                    createdWorkExperiences.push(updatedWorkExperience);
                } else {
                    const createdData = {}
                    const createdWorkExperience = await prisma.workExperience.create({
                        data: {
                            workId: workExperience.workId,
                            company: workExperience.company,
                            jobTitle: workExperience.jobTitle,
                            isCurrentJob: workExperience.isCurrentJob,
                            startDate: new Date(workExperience.startDate),
                            endDate: workExperience.endDate ? new Date(workExperience.endDate) : null,
                            responsibilities: workExperience.responsibilities,
                            isInternship: workExperience.isInternship,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: updatedJobseeker?.jobseeker_id ?? undefined,
                                },
                            },
                            technology_areas: {
                                connect: {
                                    technology_area_id: workExperience?.techAreaId ?? undefined,
                                },
                            },
                        },
                    });
                    createdWorkExperiences.push(createdWorkExperience);
                }
            });
            if (workExpPromises) {
                await Promise.all(workExpPromises);
            }

            result = {
                userId: updatedJobseeker.user_id,
                yearsWorkExperience: updatedJobseeker?.years_work_exp?.toString() ?? "0",
                monthsInternshipExperience: updatedJobseeker?.months_internship_exp?.toString() ?? "0",
                isAuthorizedToWorkUsa: updatedPrivateData.is_authorized_to_work_in_usa,
                requiresSponsorship: updatedPrivateData.job_sponsorship_required ,
                workExperiences: createdWorkExperiences,
            }
            return result;
        });

        return NextResponse.json({
            success: true,
            result
        }, {status: 200});
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({error: `Failed to create work experiences.\n${e.message} `}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
