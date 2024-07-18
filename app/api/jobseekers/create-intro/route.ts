import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsIntroDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsIntroDTO = await request.json();

        // Destructure the DTO
        const {
            user_id,
            photo_url,
            first_name,
            last_name,
            birthdate,
            phoneCountryCode,
            phone,
            zipCode,
            state,
            city,
            county,
            email,
            introHeadline,
            currentSchool,
            currentJobTitle,
            resumeUrl,
        } = body;

        // Clean the phoneNumber to remove special characters
        const cleanedPhoneNumber = phone?.replace(/[-\s()]/g, '');

        // Format the phone number in E.164 format
        const formattedPhone = `${phoneCountryCode}${cleanedPhoneNumber}`;

        // Transaction to ensure atomicity
        const result = await prisma.$transaction(async (prisma) => {
            // Upsert contact
            const contact = await prisma.contacts.upsert({
                where: {email: email},
                update: {
                    first_name,
                    last_name,
                    birthdate,
                    phone: formattedPhone,
                    email,
                    photo_url
                },
                create: {
                    user_id: user_id,
                    role: 'Jobseeker',
                    first_name,
                    last_name,
                    birthdate,
                    phone,
                    email,
                    gender: undefined,
                    race: undefined,
                    photo_url,
                },
            });

            // Upsert jobseeker
            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: {user_id: user_id},
                select: {jobseeker_id: true, targeted_pathway: true}
            });

            const jobseeker_id = jobseeker?.jobseeker_id || uuidv4();

            // Find or create the targeted pathway for 'Undecided'
            let targeted_pathway = jobseeker?.targeted_pathway;
            if (!targeted_pathway) {
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
                targeted_pathway = jobseeker?.targeted_pathway || pathway.pathway_id;
            }
            let edu_institution_id = undefined;
            if (currentSchool) {
                const school = await prisma.edu_institutions.findUnique({
                    where: { name: currentSchool },
                    select: { edu_institution_id: true }
                });
                edu_institution_id = school?.edu_institution_id;
            }


            const jobSeeker = await prisma.jobseekers.upsert({
                where: {user_id: contact.user_id},
                update: {
                    intro_headline: introHeadline,
                    current_job_title: currentJobTitle,
                    resume_url: resumeUrl,
                },
                create: {
                    jobseeker_id: jobseeker_id,
                    user_id: contact.user_id,
                    targeted_pathway: targeted_pathway,
                    edu_institution_id: edu_institution_id,
                    is_enrolled_college: undefined,
                    highest_level_of_study_completed: undefined,
                    current_grade_level: undefined,
                    current_enrolled_ed_program: undefined,
                    degree_type: undefined,
                    intern_hours_required: undefined,
                    major: undefined,
                    minor: undefined,
                    intro_headline: introHeadline,
                    current_job_title: currentJobTitle,
                    resume_url: resumeUrl,
                    years_work_exp: undefined,
                    portfolio_url: undefined,
                    video_url: undefined,
                    employment_type_sought: undefined,
                },
            });
            const existingContactAddress = await prisma.contact_addresses.findUnique({
                where: {
                    user_id: contact.user_id
                },
                select: {
                    contact_address_id: true,
                }
            })
            const contact_address_id = existingContactAddress?.contact_address_id || uuidv4();
            const contactAddress = await prisma.contact_addresses.upsert({
                where: { user_id: contact.user_id},
                update: {
                    zip: zipCode,
                    state,
                    city,
                    county,
                },
                create: {
                    contact_address_id,
                    user_id: contact.user_id,
                    zip: zipCode,
                    state,
                    city,
                    county
                }
            })



            return {contact, jobSeeker, };
        });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error creating job seeker intro:', error);
        return NextResponse.json({error: 'Failed to create job seeker intro'}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
