import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {EducationInfo, JsEducationDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

// Utility function to filter out undefined values
const filterUndefined = <T extends object>(obj: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
    ) as Partial<T>;
};
export async function POST(request: Request) {
    try {
        const body: JsEducationDTO = await request.json();

        const {
            user_id,
            highestLevelOfStudy,
            currentEdProgram,
            currentGrade,
            isEnrolled,
            schools,
            certifications,
            projects,
        } = body;


        // const start_date = new Date(startDate).toISOString();
        // const completion_date = new Date(graduationDate).toISOString();

        const result = await prisma.$transaction(async (prisma) => {

            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: {user_id},
                select: {
                    jobseeker_id: true,
                    targeted_pathway: true,
                    is_enrolled_ed_program: true
                }
            });

            const jobseekerId = jobseeker?.jobseeker_id || uuidv4();
            const isEnrolledEdProgram = jobseeker?.is_enrolled_ed_program || false;

            // Find or create the targeted pathway for 'Undecided'
            let targetedPathway = jobseeker?.targeted_pathway;
            if (!targetedPathway) {
                let pathway = await prisma.pathways.findUnique({
                    where: {pathway_title: 'Undecided'},
                    select: {pathway_id: true}
                });

                if (!pathway) {
                    pathway = await prisma.pathways.create({
                        data: {
                            pathway_id: uuidv4(),
                            pathway_title: 'Undecided'
                        },
                        select: {pathway_id: true}
                    });
                }
                targetedPathway = jobseeker?.targeted_pathway || pathway.pathway_id;
            }

            const jobSeeker = await prisma.jobseekers.upsert({
                where: {user_id: user_id},
                update: {
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_grade_level: currentGrade,
                    current_enrolled_ed_program: currentEdProgram,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                },
                create: {
                    jobseeker_id: jobseekerId,
                    user_id: user_id,
                    targeted_pathway: targetedPathway,
                    is_enrolled_ed_program: isEnrolledEdProgram,
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_grade_level: currentGrade,
                    current_enrolled_ed_program: currentEdProgram,
                    intern_hours_required: undefined,
                    intro_headline: undefined,
                    current_job_title: undefined,
                    resume_url: undefined,
                    years_work_exp: undefined,
                    portfolio_url: undefined,
                    video_url: undefined,
                    employment_type_sought: undefined,
                },
            });

            certifications.map(async cert => {

            });

            projects.map(async proj => {

            });

            const schoolPromises = schools.map(async school => {
                const existingEducation = await prisma.jobseekers_education.findFirst({
                    where: {
                        jobseekerId: jobseekerId,
                        edInstitutionId: school.edInstitutionId,
                        startDate: school.startDate,
                        gradDate: school.gradDate,
                    }
                });

                // Build update object and filter undefined values
                const updateData: Partial<EducationInfo> = filterUndefined({
                    jobseekerEdId: school.jobseekerEdId,
                    jobSeekerId: school.jobSeekerId,
                    edInstitutionId: school.edInstitutionId,
                    edProgram: school.edProgram,
                    edSystem: school.edSystem,
                    isEnrolled: school.isEnrolled,
                    startDate: school.startDate,
                    gradDate: school.gradDate,
                    degreeType: school.degreeType,
                    major: school.major,
                    minor: school.minor,
                    description: school.description,
                })

                if (existingEducation) {
                    return prisma.jobseekers_education.update({
                        where: {jobseekerEdId: existingEducation.jobseekerId},
                        data: updateData
                    });
                } else {
                    return prisma.jobseekers_education.create({
                        data: {
                            jobseekerEdId: uuidv4(),
                            edProgram: school.edProgram,
                            edSystem: school.edSystem,
                            isEnrolled: school.isEnrolled,
                            startDate: school.startDate,
                            gradDate: school.gradDate,
                            degreeType: school.degreeType,
                            major: school.major,
                            minor: school.minor,
                            description: school.description,
                            jobseekers: {
                                connect: {
                                    jobseeker_id: jobseekerId,
                                }
                            },
                            eduInstitutions: {
                                connect: {
                                    edu_institution_id: school.edInstitutionId
                                }
                            }

                        }
                    });
                }
            });
            await Promise.all(schoolPromises)
        });
        return NextResponse.json(result, {status: 200});
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({error: 'Failed to create jobseeker education'}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}