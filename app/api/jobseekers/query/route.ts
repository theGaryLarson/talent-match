import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {jobSeekerCardViewSelect} from "@/app/lib/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { skills = [], yearsWorkExp = 0 } = await request.json();

    const normalizedSkills: string[] = skills.filter((skill: string) => skill && skill.trim() !== '');

    const andConditions: any[] = [];

    if (normalizedSkills.length > 0) {
        const orConditions = [
            {
                jobseeker_has_skills: {
                    some: {
                        skills: {
                            skill_name: {
                                in: normalizedSkills,
                            },
                        },
                    },
                },
            },
            {
                project_experiences: {
                    some: {
                        project_has_skills: {
                            some: {
                                skills: {
                                    skill_name: {
                                        in: normalizedSkills,
                                    }
                                },
                            },
                        },
                    },
                }
            }
        ];
        andConditions.push({ OR: orConditions });
    }

    andConditions.push({
        years_work_exp: {
            gte: yearsWorkExp,
        }
    });

    const filteredJobSeekers = await prisma.jobseekers.findMany({
        where: andConditions.length > 0 ? { AND: andConditions } : undefined,
        select: jobSeekerCardViewSelect
    });

    return NextResponse.json(filteredJobSeekers);
}
