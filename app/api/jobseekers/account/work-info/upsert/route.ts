import {NextResponse} from 'next/server';
import {Prisma, PrismaClient, WorkExperience} from '@prisma/client';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JsWorkExpDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
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


        const result: JsWorkExpDTO = await prisma.$transaction(async (prisma) => {
            // Update the jobseeker table with the provided properties
            const updatedJobseeker = await prisma.jobseekers.update({
                where: {user_id: userId},
                data: {
                    years_work_exp: yearsWorkExperience ? parseInt(yearsWorkExperience, 10) : undefined,
                    months_internship_exp: monthsInternshipExperience ? parseInt(monthsInternshipExperience, 10): undefined,
                    updatedAt: new Date(),
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
                            }, // TODO: Implement when Work Experience UI can get this added in.
                            // technology_areas: {
                            //     connect: {
                            //         technology_area_id: workExperience?.techAreaId ?? undefined,
                            //     },
                            // },
                        },
                    });
                    createdWorkExperiences.push(createdWorkExperience);
                }
            });
            if (workExpPromises) {
                await Promise.all(workExpPromises);
            }

            return {
                userId: updatedJobseeker.user_id,
                yearsWorkExperience: updatedJobseeker?.years_work_exp?.toString() ?? "0",
                monthsInternshipExperience: updatedJobseeker?.months_internship_exp?.toString() ?? "0",
                isAuthorizedToWorkUsa: updatedPrivateData.is_authorized_to_work_in_usa,
                requiresSponsorship: updatedPrivateData.job_sponsorship_required ,
                workExperiences: createdWorkExperiences,
            }
        });

        return NextResponse.json({
            success: true,
            result
        }, {status: 200});
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle unique constraint violation
            if (e.code === 'P2002') {
                console.error(e)
                return NextResponse.json({ error: 'Unique constraint violation. This data already exists.' }, { status: 409 });
            }
            // Handle foreign key constraint violation
            if (e.code === 'P2025') {
                return NextResponse.json({ error: 'No record found that matches the provided foreign key.' }, { status: 404 });
            }
            // Add other specific Prisma errors as needed
        }
        console.error('Unexpected error:', e);
        return NextResponse.json({error: `Failed to create work experiences.\n${e.message} `}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
