import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  jobSeekerCardViewSelect,
  jobseekerQueryTestSelect,
} from '@/app/lib/prisma';
import { educationRank } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { HighestDegreeType } from '@/data/dtos/JobSeekerProfileCreationDTOs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    skills = [],
    industrySector = [],
    educationLevel = undefined,
    yearsWorkExp = 0,
    zipCode = undefined,
    sortBy = 'newest',
    maxResults = 50,
    page = 1,
  } = await request.json();

  const normalizedSkills: string[] = skills.filter(
    (skill: string) => skill && skill.trim() !== '',
  );

  const andConditions: any[] = [];
  andConditions.push({ is_marked_deletion: null });

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
                  },
                },
              },
            },
          },
        },
      },
    ];
    andConditions.push({ OR: orConditions });
  }

  andConditions.push({
    years_work_exp: {
      gte: yearsWorkExp,
    },
  });

  // Industry Sector Filtering
  if (industrySector.length > 0) {
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
          (level) => educationRank[level as HighestDegreeType] >= minRank,
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
              startsWith: zipCode,
            },
          },
        },
      },
    });
  }

  // Implement sorting based on 'sortBy' (e.g., "newest")
  const orderBy =
    sortBy === 'newest' ? [{ createdAt: 'desc' as const }] : undefined;

  // Determine the number of results to skip based on the page number and maxResults
  const skip = (page - 1) * maxResults;

  const [filteredJobSeekers, totalCount] = await prisma.$transaction([
    prisma.jobseekers.findMany({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      select: jobSeekerCardViewSelect, // for testing queries in Postman use jobseekerQueryTestSelect //website use: jobSeekerCardViewSelect
      take: maxResults,
      skip: skip,
      orderBy: orderBy,
    }),
    prisma.jobseekers.count({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
    }),
  ]);

  return NextResponse.json({
    filteredJobSeekers,
    totalCount,
  });
}
