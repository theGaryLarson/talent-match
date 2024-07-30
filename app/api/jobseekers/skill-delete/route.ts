import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {SkillDTO} from "@/data/dtos/SkillDTO";


const prisma: PrismaClient = getPrismaClient();


export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const {jobseekerId, skillId} = body;
        if (!jobseekerId || !skillId) {
            return NextResponse.json({
                success: false,
                error: "Need to provide both jobseekerId and skillId"
            }, {status: 400});
        }
        const deletedSkill = await prisma.jobseeker_has_skills.delete({
            where: {
                jobseeker_id_skill_id: {
                    jobseeker_id: jobseekerId,
                    skill_id: skillId
                }
            },
            select: {
                jobseekers: {
                    select: {
                        user_id: true,
                    }
                },
                skills: {
                    select: {
                        skill_id: true,
                        skill_name: true,
                        skill_info_url: true
                    }
                }
            }
        });
        console.log(JSON.stringify(deletedSkill, null, 2))
        const result: SkillDTO & { userId: string } = {
            userId: deletedSkill.jobseekers.user_id,
            skill_id: deletedSkill.skills.skill_id,
            skill_name: deletedSkill.skills.skill_name,
            skill_info_url:deletedSkill.skills.skill_info_url
        }
        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({error: `Failed to delete skill.\n${e.message} `}, {status: 500});
    } finally {
        prisma.$disconnect()
    }
}