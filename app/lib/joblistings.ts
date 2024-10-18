import {
  PrismaClient,
} from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';

import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { JobPostCreationDTO } from '@/data/dtos/JobListingDTO';
import Skills from '../ui/components/Skills';
// used singleton pattern to avoid connection timeouts due to reaching connection limit
const prisma: PrismaClient = getPrismaClient();
//TODO: fix zip code and location, add in sector and skills
export async function createJobListingWithSkills(jobData: JobPostCreationDTO) {
  const Session = await auth();

  if (!Session?.user.employerId) {
    throw new Error(
      'Failed to create job listing employer id not found in session',
    );
  }
  if (!Session.user.companyId) {
    throw new Error(
      'Failed to create job listing Company id not found in session',
    );
  }

  try {
    let companyAddress = await prisma.company_addresses.findFirst({
      where: {
        AND: {
          zip: jobData.zip,
          company_id: Session.user.companyId,
        },
      },
    });
    if (!companyAddress) {
      companyAddress = await prisma.company_addresses.create({
        data: {
          company_id: Session.user.companyId,
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
    const jobListingId = uuidv4()
    const newJobListing = await prisma.job_postings.create({
      data: {
        job_posting_id: jobListingId,
        company_id: Session.user.companyId,
        location_id: companyAddress.company_address_id,
        employer_id: Session?.user.employerId,
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
        skills:{
          connect: jobData.skillIds?.map((skillId:string)=>({skill_id:skillId}))
        }
        
    }});

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
      include:{
        skills:true,
        industry_sectors:true,
        companies:true,
        techArea:true
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
  try{
    let results = prisma.job_postings.findMany({
      where:{
        employer_id: Session?.user.employerId
      }
    })
    return results;
  }catch(e){
    console.error(e)
    return [];
  }
}
export async function deleteJobListing(jobPostingId:string) {
  console.log("I made it here")
  let Session = await auth();
  if (!Session?.user.employerId) {
    throw new Error('Failed to delete job listing: employer ID not found in session');
  }
  if (!Session.user.companyId) {
    throw new Error('Failed to delete job listing: company ID not found in session');
  }

try{
  let result = await prisma.job_postings.delete(
    {where:{
      job_posting_id:jobPostingId,
      employer_id: Session.user.employerId,  // Matching employer ID
      company_id: Session.user.companyId,    // Matching company ID
    }
    }
  )
  return result}catch(e){
    console.error(e)
  }
}
