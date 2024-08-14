import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {jobseekers_private_data, PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {JsDisclosuresDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, {params}: {params: { userId: string }}) {
    try {
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json({success: false, error: `A userId must be provided.`})
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                jobseekers: {
                    select: {
                        jobseeker_id: true,
                        jobseekers_private_data: {
                            select: {
                                is_veteran: true,
                                has_disability: true,
                            }
                        }
                    }
                },
                role: true,
                gender: true,
                has_agreed_terms: true,
                race: true,
            }
        });

        if (!user) {
            return NextResponse.json({success: false, error: `Record not found for userId: ${userId}`}, {status: 404});
        }

        if( user.role.toLowerCase().trim() !== 'jobseeker') {
            return NextResponse.json({success: false, error: `UserId is not related to a jobseeker`}, {status: 404});

        }

        let result: JsDisclosuresDTO = {
            jobseekerId: null, // users.jobseekers[0].jobseeker_id
            gender: null, // users.gender
            race: null, //users.race
            hasReadTerms: false, //users
            isVeteran: null, // jobseekers[0].jobseekers_private_data[0].is_veteran
            hasDisability: null // jobseekers[0].jobseekers_private_data[0].has_disability
        }

        if (user?.jobseekers && user?.jobseekers.length > 0) {
            result.gender = user?.gender;
            result.hasReadTerms = user.has_agreed_terms;
            result.race = user.race;
            const jobseekerDetails = user?.jobseekers?.[0] || null;
            result.jobseekerId = jobseekerDetails?.jobseeker_id;
            if (jobseekerDetails.jobseekers_private_data && jobseekerDetails.jobseekers_private_data.length > 0) {
                const privateDetails: Partial<jobseekers_private_data> = jobseekerDetails.jobseekers_private_data[0]
                result.isVeteran = privateDetails.is_veteran;
                result.hasDisability = privateDetails.has_disability;

            }
        }

        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        return NextResponse.json({error: `Failed to retrieve disclosures: ${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}