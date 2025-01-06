import { Prisma, PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';

import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { JobPostCreationDTO } from '@/data/dtos/JobListingDTO';
import Skills from '../ui/components/Skills';
import { NextResponse } from 'next/server';
import { Role } from '@/data/dtos/UserInfoDTO';
import { CareerPrepStatus } from './admin/careerPrep';
// used singleton pattern to avoid connection timeouts due to reaching connection limit
const prisma: PrismaClient = getPrismaClient();
//TODO: fix zip code and location, add in sector and skills
export async function createJobListingWithSkills(jobData: JobPostCreationDTO) {
  const Session = await auth();
  let company_id = Session?.user.companyId;
  if (Session?.user.roles.includes(Role.ADMIN)) {
    company_id = jobData.company_id;
  }

  try {
    if (!company_id) {
      throw new Error('Failed to create job listing Company id not found');
    }
    let companyAddress = await prisma.company_addresses.findFirst({
      where: {
        AND: {
          zip: jobData.zip,
          company_id: company_id,
        },
      },
    });
    if (!companyAddress) {
      companyAddress = await prisma.company_addresses.create({
        data: {
          company_id: company_id,
          company_address_id: uuidv4(),
          zip: jobData.zip,
        },
      });
    }

    let postalGeoData = await prisma.postalGeoData.findFirst({
      where: { zip: jobData.zip },
    });

    //console.log('Employer ID:', Session.user.employerId);
    //console.log('Company ID:', Session.user.companyId);
    const now = new Date();
    const jobListingId = uuidv4();
    const newJobListing = await prisma.job_postings.create({
      data: {
        job_posting_id: jobListingId,
        company_id: company_id,
        location_id: companyAddress.company_address_id,
        tech_area_id: jobData.tech_area_id,
        sector_id: jobData.sector_id,
        employer_id: Session?.user.employerId ?? null,
        job_title: jobData.job_title,
        job_description: jobData.job_description,
        is_internship: jobData.is_internship ?? false,
        is_paid: jobData.is_paid ?? true,
        zip: jobData.zip,
        employment_type: jobData.employment_type || 'full-time',
        location: jobData.location,
        salary_range: jobData.salary_range,
        county: postalGeoData?.county ?? '',
        publish_date: now,
        unpublish_date:
          jobData.unpublish_date ??
          new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), //if closing date is not provided auto set to 1 year in the futrue
        job_post_url: jobData.job_post_url,
        assessment_url: jobData.assessment_url,
        skills: {
          connect: jobData.skillIds?.map((skillId: string) => ({
            skill_id: skillId,
          })),
        },
      },
    });

    return newJobListing;
  } catch (error) {
    console.error('Error creating job listing with skills:', error);
    // throw new Error('Failed to create job listing with associated skills');
  }
}

export async function getJobListingById(joblistingId: string) {
  try {
    const joblisting = await prisma.job_postings.findUnique({
      where: {
        job_posting_id: joblistingId,
      },
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
    });
    return joblisting;
  } catch (e) {
    console.error(e);
  }
}
export async function getMyJobListings() {
  let Session = await auth();
  if (!Session?.user.employerId) {
    throw new Error(
      'Failed to create job listing employer id not found in session',
    );
  }
  try {
    let results = prisma.job_postings.findMany({
      where:{
        employer_id: Session?.user.employerId
      }, include:{
        industry_sectors:true,
        companies: true,
        skills: true,
      }
    })
    return results;
  } catch (e) {
    console.error(e);
    return [];
  }
}
export async function deleteJobListing(jobPostingId: string) {
  let Session = await auth();
  if (!Session?.user.employerId) {
    throw new Error(
      'Failed to delete job listing: employer ID not found in session',
    );
  }
  if (!Session.user.companyId) {
    throw new Error(
      'Failed to delete job listing: company ID not found in session',
    );
  }

  try {
    let result = await prisma.job_postings.delete({
      where: {
        job_posting_id: jobPostingId,
        employer_id: Session.user.employerId,
        company_id: Session.user.companyId,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function ApplyToJob(jobPostingId: string) {
  let Session = await auth();
  try {
    if (!Session?.user.jobseekerId) {
      throw new Error(
        'Failed to apply to job: jobseeker ID not found in session',
      );
    }

    const existingApplication = await prisma.jobseekerJobPosting.findFirst({
      where: {
        jobPostId: jobPostingId,
        jobseekerId: Session.user.jobseekerId,
      },
    });

    if (existingApplication) {
      return await prisma.jobseekerJobPosting.update({
        where: {
          id: existingApplication.id,
        },
        data: {
          jobStatus: CareerPrepStatus.Applied,
          appliedDate: new Date(),
        },
      });
    } else {
      return await prisma.jobseekerJobPosting.create({
        data: {
          id: uuidv4(),
          jobPostId: jobPostingId,
          jobseekerId: Session.user.jobseekerId,
          jobStatus: CareerPrepStatus.Applied,
          appliedDate: new Date(),
          isBookmarked: false,
        },
      });
    }
  } catch (error) {
    console.error('Error in ApplyToJob:', error);
    throw error;
  }
}

export async function WithdrawFromJob(jobPostingId: string) {
  let Session = await auth();
  try {
    if (!Session?.user.jobseekerId) {
      throw new Error(
        'Failed to Withdraw from job: jobseeker ID not found in session',
      );
    }

    const existingApplication = await prisma.jobseekerJobPosting.findFirst({
      where: {
        jobPostId: jobPostingId,
        jobseekerId: Session.user.jobseekerId,
      },
    });

    if (existingApplication) {
      return await prisma.jobseekerJobPosting.update({
        where: {
          id: existingApplication.id,
        },
        data: {
          jobStatus: CareerPrepStatus.Withdrawn,
          appliedDate: new Date(),
        },
      });
    } else {
      return await prisma.jobseekerJobPosting.create({
        data: {
          id: uuidv4(),
          jobPostId: jobPostingId,
          jobseekerId: Session.user.jobseekerId,
          jobStatus: CareerPrepStatus.Withdrawn,
          appliedDate: new Date(),
          isBookmarked: false,
        },
      });
    }
  } catch (error) {
    console.error('Error in WithdrawFromJob:', error);
    throw error;
  }
}

export async function bookmarkJobPosting(jobPostId: string) {
  const Session = await auth();
  try {
    if (!Session?.user.jobseekerId) {
      throw new Error('Failed to bookmark: jobseeker ID not found in session');
    }
    const existingRecord = await prisma.jobseekerJobPosting.findFirst({
      where: {
        jobPostId: jobPostId,
        jobseekerId: Session.user.jobseekerId,
      },
    });

    if (existingRecord) {
      return await prisma.jobseekerJobPosting.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          isBookmarked: true,
          savedAt: new Date(),
        },
      });
    } else {
      return await prisma.jobseekerJobPosting.create({
        data: {
          id: uuidv4(),
          jobPostId: jobPostId,
          jobseekerId: Session.user.jobseekerId,
          isBookmarked: true,
          jobStatus: '',
          savedAt: new Date(),
        },
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error:', error);
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Unique constraint violation. This data already exists.' },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: `Failed to bookmark job post: ${error.message}` },
        { status: 500 },
      );
    }
    throw error;
  }
}
export async function unbookmarkJobPosting(jobPostId: string) {
  const Session = await auth();
  try {
    if (!Session?.user.jobseekerId) {
      throw new Error(
        'Failed to unbookmark: jobseeker ID not found in session',
      );
    }

    const existingRecord = await prisma.jobseekerJobPosting.findFirst({
      where: {
        jobPostId: jobPostId,
        jobseekerId: Session.user.jobseekerId,
      },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    if (existingRecord.jobStatus !== '') {
      return await prisma.jobseekerJobPosting.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          isBookmarked: false,
        },
      });
    } else {
      return await prisma.jobseekerJobPosting.delete({
        where: {
          id: existingRecord.id,
        },
      });
    }
  } catch (error) {
    console.error('Error in unbookmarkJobPosting:', error);
    throw error;
  }
}

export async function getAllJobPosts() {
  try {
    let results = prisma.job_postings.findMany({include:{
      jobApplications:{
        include:{
          Jobseekers:{
            include:{
              users:true
            }
          }
        },
      },
      companies:true
    }});
    return results;
  } catch (error) {
    console.error(error);
  }
}

export async function getJobListingsFiltered(request: Request) {
  const session = await auth();
  const jobseekerId = session?.user?.jobseekerId;

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

  const normalizedSkills: string[] = skills.filter(
    (skill: string) => skill && skill.trim() !== '',
  );

  if (jobTitle) {
    andConditions.push({
      job_title: {
        contains: jobTitle,
      },
    });
  }

  if (normalizedSkills.length > 0) {
    const orConditions = [
      {
        skills: {
          some: {
            skill_name: {
              in: normalizedSkills,
            },
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
        jobApplications: jobseekerId
          ? {
              where: {
                jobseekerId: jobseekerId,
              },
              select: {
                jobStatus: true,
                isBookmarked: true,
              },
            }
          : false,
      },
      take: maxResults,
      skip: skip,
      orderBy: orderBy,
    }),
    prisma.job_postings.count({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
    }),
  ]);

  const transformedJobPostings = filteredJobPostings.map((posting) => {
    if (posting.jobApplications && posting.jobApplications.length > 0) {
      const jobStatus = posting.jobApplications?.[0].jobStatus || ''
      const isBookmarked = posting.jobApplications?.[0].isBookmarked || false
      return {
        ...posting,
        jobStatus: jobStatus,
        isBookmarked: isBookmarked,
        jobApplications: undefined,
      };
    }
    return {
      ...posting,
    };
  });
  return {
    filteredJobPostings: transformedJobPostings,
    totalCount,
  };
}

export async function getJobSeekerBookmarkedJobs() {
  const session = await auth();
  if (!session?.user.jobseekerId) {
    return;
  }
  try {
    const result = await prisma.jobseekerJobPosting.findMany({
      include:{
        job_posting: {
          include: {
            companies: true,
            skills: true,
            industry_sectors: {
              select: {
                sector_title: true,
              },
            },
          }
        },
     }, where:{
          jobseekerId: session.user.jobseekerId,
          isBookmarked: true
    }});

    const transformedJobPostings = result.map((posting) => {
      const jobStatus = posting.jobStatus || ''
      const isBookmarked = posting.isBookmarked || false
      return {
        ...posting.job_posting,
        jobStatus: jobStatus,
        isBookmarked: isBookmarked,
        jobApplications: undefined,
      };
    });

    return transformedJobPostings;
  } catch (error) {
    console.error(error);
  }
}

export async function getJobSeekerAppliedJobs() {
  // fixme: will probably want to get all jobs...
  const session = await auth();
  if (!session?.user.jobseekerId) {
    return;
  }
  try {
    const result = await prisma.jobseekerJobPosting.findMany({
      where: {
        jobseekerId: session.user.jobseekerId,
        jobStatus: 'Applied', // Ensure you fetch only "Applied" jobs
      },
      include:{
        job_posting: {
          include: {
            companies: true,
            skills: true,
            industry_sectors: {
              select: {
                sector_title: true,
              },
            },
          }
        },
     },
    });

    const transformedJobPostings = result.map((posting) => {
      const jobStatus = posting.jobStatus || ''
      const isBookmarked = posting.isBookmarked || false
      return {
        ...posting.job_posting,
        jobStatus: jobStatus,
        isBookmarked: isBookmarked,
        jobApplications: undefined,
      };
    });

    return transformedJobPostings;
  } catch (error) {
    console.error(error);
  }
}
