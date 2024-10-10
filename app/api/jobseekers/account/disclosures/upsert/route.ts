import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {JsDisclosuresDTO, JsDisclosuresPostDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsDisclosuresPostDTO = await request.json();
        const {
            userId,
            isVeteran,
            disability,
            gender,
            race,
            ethnicity,
            hasReadTerms
        } = body;

        if (!userId) {
            return NextResponse.json({success: false, error: `A userId must be provided.`})
        }

        // use this to get jobseeker id by user id.
        const jobseekerRecord = await prisma.jobseekers.findUnique({
            where: {
                user_id: userId
            },
            select: {
                jobseeker_id: true,
            }
        })
        if (!jobseekerRecord) {
            return NextResponse.json({
                success: false,
                error: `Jobseeker record does not exist for userId: ${userId}`
            }, {status: 400})
        }
        const jobseekerId = jobseekerRecord.jobseeker_id

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {

                has_agreed_terms: hasReadTerms,
                jobseekers: {
                    update: {
                        where: {
                            jobseeker_id: jobseekerId
                        },
                        data: {
                            jobseekers_private_data: {
                                update: {
                                    where: {
                                        jobseeker_id: jobseekerId
                                    },
                                    data: {
                                        is_veteran: isVeteran,
                                        disability: disability,
                                        gender: gender,
                                        race: race,
                                        ethnicity: ethnicity,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            select: {
                jobseekers: {
                    select: {
                        jobseeker_id: true,
                        jobseekers_private_data: {
                            select: {
                                is_veteran: true,
                                disability: true,
                                gender: true,
                                race: true,
                                ethnicity: true,

                            }
                        }
                    }
                },
                has_agreed_terms: true,
            }
        });

        const {jobseekers, has_agreed_terms} = user;
        const jobseekerDetails = jobseekers?.[0] || {};
        const privateDetails = jobseekerDetails.jobseekers_private_data?.[0] || {};

        const result: JsDisclosuresDTO = {
            jobseekerId: jobseekerDetails.jobseeker_id || null,
            gender: privateDetails.gender || null,
            race: privateDetails.race || null,
            ethnicity: privateDetails?.ethnicity || null,
            hasReadTerms: has_agreed_terms || false,
            isVeteran: privateDetails?.is_veteran || null,
            hasDisability: privateDetails?.disability || null
        };

        return NextResponse.json({success: true, result}, {status: 200})

    } catch
        (e: any) {
        return NextResponse.json({error: `Failed to upsert disclosures: ${e.message}`}, {status: 500});

    } finally {
        await prisma.$disconnect()
    }
}