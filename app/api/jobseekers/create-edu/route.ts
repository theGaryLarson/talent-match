import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsEducationDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsEducationDTO = await request.json();

        const {
            userId,
            highestLevelOfStudy,
            currentEnrolledEdProgram,
            startDate,
            completionDate,
            currentGrade,
        } = body;


        const start_date = new Date(startDate).toISOString();
        const completion_date = new Date(completionDate).toISOString();

        const result = await prisma.$transaction(async (prisma) => {

            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: {user_id: userId},
                select: {jobseeker_id: true, targeted_pathway: true}
            });

            const jobseekerId = jobseeker?.jobseeker_id || uuidv4();

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
                where: { jobseeker_id: jobseekerId },
                update: {
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_enrolled_ed_program: currentEnrolledEdProgram,
                    edu_start_date: start_date,
                    edu_end_date: completion_date,
                    current_grade_level: currentGrade,
                },
                create: {
                    jobseeker_id: jobseekerId,
                    user_id: userId,
                    targeted_pathway: targetedPathway,
                    edu_institution_id: undefined,
                    is_enrolled_college: undefined,
                    highest_level_of_study_completed: highestLevelOfStudy,
                    current_grade_level: currentGrade,
                    current_enrolled_ed_program: currentEnrolledEdProgram,
                    degree_type: undefined,
                    intern_hours_required: undefined,
                    major: undefined,
                    minor: undefined,
                    intro_headline: undefined,
                    current_job_title: undefined,
                    resume_url: undefined,
                    years_work_exp: undefined,
                    portfolio_url: undefined,
                    video_url: undefined,
                    employment_type_sought: undefined,
                    edu_start_date: new Date(startDate),
                    edu_end_date: new Date(completionDate),
                },
            });
            return {jobSeeker}
        });
        return NextResponse.json(result, { status: 200 });
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({ error: 'Failed to create jobseeker education' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}