import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsIntroDTO, JsIntroPostDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsIntroPostDTO = await request.json();

        // Destructure the DTO
        const {
            userId,
            photoUrl,
            firstName,
            lastName,
            birthDate,
            phoneCountryCode,
            phone,
            zipCode,
            state,
            city,
            county,
            email,
            introHeadline,
            currentJobTitle,
            resumeUrl,
        } = body;

        // TODO: fix install and use libphonenumber-js to handle country codes. Supported React Component as well.
        // Clean the phoneNumber to remove special characters
        const cleanedPhoneCountryCode = phoneCountryCode?.replace(/[-\s().]/g, '')
        const cleanedPhoneNumber = phone?.replace(/[-\s().]/g, '');

        // Format the phone number in E.164 format
        const formattedPhone = `+${cleanedPhoneCountryCode}-${cleanedPhoneNumber}`;

        // Transaction to ensure atomicity
        const result = await prisma.$transaction(async (prisma) => {

            // Upsert contact
            const contact = await prisma.contacts.upsert({
                where: {email: email},
                update: {
                    first_name: firstName,
                    last_name: lastName,
                    birthdate: birthDate,
                    phone: formattedPhone,
                    email,
                    photo_url: photoUrl,
                    updatedAt: new Date(),
                },
                create: {
                    user_id: userId,
                    role: 'Jobseeker',
                    first_name: firstName,
                    last_name: lastName,
                    birthdate: birthDate,
                    phone,
                    email,
                    gender: undefined,
                    race: undefined,
                    photo_url: photoUrl,
                    createdAt: new Date(),
                    updatedAt: undefined,
                    emailVerified: undefined,
                },
            });

            // Upsert jobseeker
            // Find the jobseeker_id or generate a new one
            const jobseeker = await prisma.jobseekers.findUnique({
                where: {user_id: userId},
                select: {jobseeker_id: true, targeted_pathway: true, is_enrolled_ed_program: true}
            });

            const jobseeker_id = jobseeker?.jobseeker_id || uuidv4();
            const isEnrolledInCollege = jobseeker?.is_enrolled_ed_program || false;

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
                    is_enrolled_ed_program: isEnrolledInCollege,
                    highest_level_of_study_completed: undefined,
                    current_grade_level: undefined,
                    current_enrolled_ed_program: undefined,
                    intern_hours_required: undefined,
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
                where: {user_id: contact.user_id},
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
            });
            return {contact, contactAddress, jobSeeker,};
        });
        return NextResponse.json({success: true, result}, {status: 200});
    } catch (error) {
        console.error('Error creating job seeker intro:', error);
        return NextResponse.json({error: 'Failed to create job seeker intro'}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
