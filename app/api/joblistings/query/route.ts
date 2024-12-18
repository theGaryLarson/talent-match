import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  jobSeekerCardViewSelect,
  jobseekerQueryTestSelect,
} from '@/app/lib/prisma';
import { devLog } from '@/app/lib/utils';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    jobTitle = '',
    skills = [],
    industrySector = [],
    zipCode = '',
    sortBy = 'publish_date',
    page = 1,
    maxResults = 50,
  } = await request.json();

  const andConditions: any[] = [];
  const orderBy = [{ publish_date: 'desc' as const }];
  // Determine the number of results to skip based on the page number and maxResults
  const skip = (page - 1) * maxResults;

  console.log("ZUPCODEO EOODE: ", zipCode);

  if (jobTitle) {
    andConditions.push({
      job_title: {
        contains: jobTitle,
      },
    });
  }

  if (skills.length > 0) {
    const orConditions = [
      {
        skills: {
          skill_name: {
            in: skills,
          },
        },
      },
    ];
    andConditions.push({ OR: orConditions });
  }

  if (industrySector.length > 0) {
      andConditions.push({
        industry_sectors: {
            sector_title: {
              in: industrySector,
            },
        },
      });
    }

  if (zipCode) {
    andConditions.push({
      zip: {
        startsWith: zipCode,
      },
    });
  }

  const [filteredJobPostings, totalCount] = await prisma.$transaction([
    prisma.job_postings.findMany({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      include: {
        skills: true,
        industry_sectors: {
          select: {
            sector_title: true,
          },
        },
        companies: true,
        techArea: {
          select: {
            title: true,
          },
        },
        jobApplications: {
          select: {
            jobseekerId: true,
          },
        },
      },
      take: maxResults,
      skip: skip,
      orderBy: orderBy,
    }),
    prisma.job_postings.count({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
    }),
  ]);

  devLog(filteredJobPostings[0]);

  return NextResponse.json({
    filteredJobPostings,
    totalCount,
  });
}
