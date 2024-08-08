import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import {JsIntroDTO} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();


export async function GET(request: Request, {params}: {params: {userId: string}}) {
    try {
        const userId = params.userId;
        if (!userId) {
            return NextResponse.json({error: 'User email is required'}, {status: 400});
        }
        // Fetch the contacts data
        const contact = await prisma.contacts.findUnique({
            where: {
                user_id: userId
            },
            select: {
                user_id: true,
                role: true,
                first_name: true,
                last_name: true,
                birthdate: true,
                email: true,
                emailVerified: true,
                phone: true, // TODO: fix with libphonenumber-js package to conform to E.164 format
                photo_url: true,
                createdAt: true,
                contact_addresses: {
                    select: {
                        contact_address_id: true,
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
        if (!contact) {
            return NextResponse.json({error: 'Jobseeker not found'}, {status: 404})
        }

        const address = contact.contact_addresses && contact.contact_addresses.length > 0 ? contact.contact_addresses[0] : null;
        const jobseeker = contact.jobseekers && contact.jobseekers.length > 0 ? contact.jobseekers[0] : null;

        // Map the jobseeker data to JsIntroDTO
        const loadIntroPage: JsIntroDTO = {
            userId: contact.user_id,
            photoUrl: contact.photo_url,
            firstName: contact.first_name,
            lastName: contact.last_name,
            birthDate: contact.birthdate,
            phoneCountryCode: contact.phone?.split('-')[0], // TODO: use libphonenumber-js parsing functions
            phone: contact?.phone?.split('-')[1],
            zipCode: address?.zip,
            state: address?.state,
            city: address?.city,
            county: address?.county,
            email: contact.email,
            introHeadline: jobseeker?.intro_headline,
            currentJobTitle: jobseeker?.current_job_title,
            resumeUrl: jobseeker?.resume_url??null,
        };

        // metadata that may be needed
        const meta = {
            emailVerified: contact.emailVerified,
            createdAt: contact.createdAt,
            pathwayId: jobseeker?.pathways?.pathway_id,
            jobseekerId: jobseeker?.jobseeker_id,
            contactAddressId: address?.contact_address_id,
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