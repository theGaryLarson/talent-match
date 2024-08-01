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

        // TODO: fix: install and use libphonenumber-js to handle country codes.  There is a supported React Component as well.
        // Clean the phoneNumber to remove special characters
        const cleanedPhoneCountryCode = phoneCountryCode?.replace(/[-\s().]/g, '')
        const cleanedPhoneNumber = phone?.replace(/[-\s().]/g, '');

        // Format the phone number in E.164 format
        const formattedPhone = `+${cleanedPhoneCountryCode}-${cleanedPhoneNumber}`;

        // Transaction to ensure atomicity
        const result = await prisma.$transaction(async (prisma) => {

            // Upsert contact
            const contact = await prisma.contacts.upsert({
                where: {user_id: userId},
                update: {
                    first_name: firstName,
                    last_name: lastName,
                    birthdate: birthDate,
                    phone: formattedPhone,
                    email: email,
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
            const js = await prisma.jobseekers.findUnique({
                where: {user_id: userId},
                select: {jobseeker_id: true, targeted_pathway: true, is_enrolled_ed_program: true}
            });

            const jobseeker_id = js?.jobseeker_id || uuidv4();
            const isEnrolledInCollege = js?.is_enrolled_ed_program || false;


            const jobseeker = await prisma.jobseekers.upsert({
                where: {user_id: contact.user_id},
                update: {
                    intro_headline: introHeadline,
                    current_job_title: currentJobTitle,
                    resume_url: resumeUrl,
                },
                create: {
                    jobseeker_id: jobseeker_id,
                    user_id: contact.user_id,
                    targeted_pathway: undefined,
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
            const loadIntroPage: JsIntroDTO = {
                userId: contact.user_id,
                photoUrl: contact.photo_url,
                firstName: contact.first_name,
                lastName: contact.last_name,
                birthDate: contact.birthdate,
                phoneCountryCode: cleanedPhoneCountryCode,
                phone: cleanedPhoneNumber,
                zipCode: contactAddress.zip,
                state: contactAddress.state,
                city: contactAddress.city,
                county: contactAddress.county,
                email: contact.email,
                introHeadline: jobseeker.intro_headline,
                currentJobTitle: jobseeker.current_job_title,
                resumeUrl: jobseeker?.resume_url ?? null,
            }


            const meta = {
                emailVerified: contact.emailVerified,
                createdAt: contact.createdAt,
                pathwayId: jobseeker.targeted_pathway,
                jobseekerId: jobseeker.jobseeker_id,
                contactAddressId: contactAddress.contact_address_id,
                isMarkedDeletion: jobseeker.is_marked_deletion,
            }
            return {loadIntroPage, meta};
        });
        return NextResponse.json({success: true, result}, {status: 200});
    } catch (error) {
        console.error('Error creating job seeker intro:', error);
        return NextResponse.json({error: 'Failed to create job seeker intro'}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
