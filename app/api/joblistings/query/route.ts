import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  jobSeekerCardViewSelect,
  jobseekerQueryTestSelect,
} from '@/app/lib/prisma';
import { educationRank } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { HighestCompletedEducationLevel } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {devLog} from "@/app/lib/utils";
import {PoolCategories} from "@/app/lib/poolAssignment";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    sortBy = 'publish_date',
    maxResults = 50,
    page = 1,
  } = await request.json();

  const orderBy = [{ publish_date: 'desc' as const }];
  // Determine the number of results to skip based on the page number and maxResults
  const skip = (page - 1) * maxResults;

  const [filteredJobPostings, totalCount] = await prisma.$transaction([
    prisma.job_postings.findMany({
      include:{
        skills:true,
        industry_sectors:{
          select:{
            sector_title:true
          }
        },
        companies:true,
        techArea:{
          select:{
            title:true
          }
        },
        jobApplications:{
          select:{
            jobseekerId: true,
          }
        }
      },
      take: maxResults,
      skip: skip,
      orderBy: orderBy,
    }),
    prisma.job_postings.count({
      where: undefined,
    }),
  ]);

  devLog(filteredJobPostings[0]);

  return NextResponse.json({
    filteredJobPostings,
    totalCount,
  });
}
