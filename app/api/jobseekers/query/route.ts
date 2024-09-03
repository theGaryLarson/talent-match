import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {jobSeekerCardViewSelect, jobseekerQueryTestSelect} from "@/app/lib/prisma";
import {educationRank} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {HighestDegreeType} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const {
        skills = [],
        yearsWorkExp = 0,
        zipCode = undefined,
        industrySector  = undefined,
        educationLevel = undefined,
    } = await request.json();

    const normalizedSkills: string[] = skills.filter((skill: string) => skill && skill.trim() !== '');

    const andConditions: any[] = [];
    andConditions.push({is_marked_deletion: null})

    if (normalizedSkills.length > 0) {
        // Here we are checking if the skills are highlighted in projects or listed as their top five
        // Discuss with team how we want this to be implemented.
        // Q: Do we want to look in both places as project skills may not be that great?
        // Or should we allow the employer to choose 1) Top Skills 2) Any Skill 3) Or All?
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

    // Industry Sector Filtering
    if (industrySector) {
        andConditions.push({
            work_experiences: {
                some: {
                    industrySector: {
                        sector_title: industrySector,
                    },
                },
            },
        });
    }

    // Education Level Filtering
    if (educationLevel) {
        const minRank: number = educationRank[educationLevel as HighestDegreeType];
        andConditions.push({
            highest_level_of_study_completed: {
                in: Object.keys(educationRank).filter(
                    (level) => educationRank[level as HighestDegreeType] >= minRank
                ),
            },
        });
    }

    // Zip Code Filtering
    if (zipCode) {
        andConditions.push({
            users: {
                user_addresses: {
                    some: {
                        zip: {
                            startsWith: zipCode
                        },
                    },
                },
            },
        });
    }

    const filteredJobSeekers = await prisma.jobseekers.findMany({
        where: andConditions.length > 0 ? { AND: andConditions } : undefined,
        select:  jobseekerQueryTestSelect // TODO: replace with original jobSeekerCardViewSelect
    });

    return NextResponse.json(filteredJobSeekers);
}
