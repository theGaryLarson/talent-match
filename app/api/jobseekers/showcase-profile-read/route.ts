import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {JsShowcaseDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {SkillDTO} from "@/data/dtos/SkillDTO";
import {JobseekerSkillDTO} from "@/data/dtos/JobseekerSkillDTO";

const prisma: PrismaClient = getPrismaClient();
export async function POST(request: Request) {
    try {
        const body: JsShowcaseDTO = await request.json();
        const {userId} = body;

        const updatedShowcase = await prisma.jobseekers.findUnique({
            where: {
                user_id: userId
            },
            select: {
                user_id: true,
                jobseeker_has_skills: {
                    select: {
                        skills: {
                            select: {
                                skill_id: true,
                                skill_name: true,
                                skill_info_url: true,
                            }

                        }
                    }
                },
                portfolio_url: true,
                portfolio_password: true,
                video_url: true
            }
        });

        if (!updatedShowcase) {
            return NextResponse.json({success:false, error:`Record does not exist for id ${userId}`})
        } else {
            const mappedSkills: SkillDTO[]  = updatedShowcase.jobseeker_has_skills.map((jsSkill: JobseekerSkillDTO) => ({
                skill_id: jsSkill.skills.skill_id,
                skill_name: jsSkill.skills.skill_name,
                skill_info_url: jsSkill.skills.skill_info_url

            }));
            const result: JsShowcaseDTO  = {
                userId: updatedShowcase.user_id,
                skills: mappedSkills,
                portfolioUrl: updatedShowcase.portfolio_url,
                portfolioPassword: updatedShowcase.portfolio_password,
                video_url: updatedShowcase.video_url
            }
            // console.log(JSON.stringify(updatedShowcase, null ,2))
            return NextResponse.json({success: true, result}, {status: 200})
        }



    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }finally {
        await prisma.$disconnect();
    }
}