import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsIntroDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import parsePhoneNumberFromString from "libphonenumber-js";

const prisma: PrismaClient = getPrismaClient();


export async function GET(request: Request, {params}: {params: {userId: string}}) {
    try {
        const userId = params.userId;
        if (!userId) {
            return NextResponse.json({error: 'User email is required'}, {status: 400});
        }
        // Fetch the users data
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                role: true,
                first_name: true,
                last_name: true,
                birthdate: true,
                email: true,
                emailVerified: true,
                phone: true,
                photo_url: true,
                createdAt: true,
                user_addresses: {
                    select: {
                        user_address_id: true,
                        zip: true,
                        state: true,
                        city: true,
                        county: true,
                    }
                },
                jobseekers: {
                    select: {
                        jobseeker_id: true,
                        is_enrolled_ed_program: true,
                        highest_level_of_study_completed: true,
                        current_grade_level: true,
                        current_enrolled_ed_program: true,
                        intern_hours_required: true,
                        intro_headline: true,
                        current_job_title: true,
                        resume_url: true,
                        years_work_exp: true,
                        portfolio_url: true,
                        video_url: true,
                        is_marked_deletion: true,
                        employment_type_sought: true,
                        pathways: {
                            select: {
                                pathway_id: true,
                                pathway_title: true,
                            }
                        }

                    }
                }
            }
        });
        if (!user) {
            return NextResponse.json({error: 'Jobseeker not found'}, {status: 404})
        }

        const address = user.user_addresses && user.user_addresses.length > 0 ? user.user_addresses[0] : null;
        const jobseeker = user.jobseekers && user.jobseekers.length > 0 ? user.jobseekers[0] : null;

        // Map the jobseeker data to JsIntroDTO
        const loadIntroPage: JsIntroDTO = {
            userId: user.id,
            photoUrl: user.photo_url,
            firstName: user?.first_name,
            lastName: user?.last_name,
            birthDate: user.birthdate,
            phoneCountryCode: user.phone ? parsePhoneNumberFromString(user.phone)?.countryCallingCode : null,
            phone: user.phone ? parsePhoneNumberFromString(user.phone)?.number : null,
            zipCode: address?.zip,
            state: address?.state,
            city: address?.city,
            county: address?.county,
            email: user.email,
            introHeadline: jobseeker?.intro_headline,
            currentJobTitle: jobseeker?.current_job_title,
            resumeUrl: jobseeker?.resume_url??null,
        };

        // metadata that may be needed
        const meta = {
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            pathwayId: jobseeker?.pathways?.pathway_id,
            jobseekerId: jobseeker?.jobseeker_id,
            contactAddressId: address?.user_address_id,
            isMarkedDeletion: jobseeker?.is_marked_deletion,
        }
        const result = {loadIntroPage, meta}
        return NextResponse.json({
            success: true,
            result,
        }, {status: 200});
    } catch (error: any) {
        console.error('Error reading job seeker intro:', error);
        return NextResponse.json({error: 'Failed to read job seeker intro'}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}