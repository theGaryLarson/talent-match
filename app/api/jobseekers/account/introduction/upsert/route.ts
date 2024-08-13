import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsIntroDTO, JsIntroPostDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {v4 as uuidv4} from 'uuid';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import parsePhoneNumberFromString from "libphonenumber-js";
import {formatPhoneE164} from "@/app/lib/utils";

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

        const formattedPhone = formatPhoneE164(phoneCountryCode, phone)

        const result = await prisma.$transaction(async (prisma) => {

            // Upsert user
            const user = await prisma.users.upsert({
                where: {id: userId},
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
                    id: userId,
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
                where: {user_id: user.id},
                update: {
                    intro_headline: introHeadline,
                    current_job_title: currentJobTitle,
                    resume_url: resumeUrl,
                },
                create: {
                    jobseeker_id: jobseeker_id,
                    user_id: user.id,
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
            const existingUserAddress = await prisma.user_addresses.findUnique({
                where: {
                    user_id: user.id
                },
                select: {
                    user_address_id: true,
                }
            })
            const user_address_id = existingUserAddress?.user_address_id || uuidv4();
            const userAddress = await prisma.user_addresses.upsert({
                where: {user_id: user.id},
                update: {
                    zip: zipCode,
                    state,
                    city,
                    county,
                },
                create: {
                    user_address_id: user_address_id,
                    user_id: user.id,
                    zip: zipCode,
                    state,
                    city,
                    county
                }
            });
            const loadIntroPage: JsIntroDTO = {
                userId: user.id,
                photoUrl: user.photo_url,
                firstName: user.first_name,
                lastName: user.last_name,
                birthDate: user.birthdate,
                phoneCountryCode: user.phone ? parsePhoneNumberFromString(user.phone)?.countryCallingCode : null,
                phone: user.phone,
                zipCode: userAddress.zip,
                state: userAddress.state,
                city: userAddress.city,
                county: userAddress.county,
                email: user.email,
                introHeadline: jobseeker.intro_headline,
                currentJobTitle: jobseeker.current_job_title,
                resumeUrl: jobseeker?.resume_url ?? null,
            }


            const meta = {
                emailVerified: user.emailVerified,
                createdAt: user.createdAt,
                pathwayId: jobseeker.targeted_pathway,
                jobseekerId: jobseeker.jobseeker_id,
                contactAddressId: userAddress.user_address_id,
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
