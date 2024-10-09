import {
    companies,
    edu_providers,
    PostalGeoData,
    Prisma,
    PrismaClient,
    programs,
    skills,
  } from '@prisma/client';
  import getPrismaClient from '@/app/lib/prismaClient.mjs';
  import { SkillDTO } from '@/data/dtos/SkillDTO';
  import { EducationProviderDTO } from '@/data/dtos/EducationProviderDTO';
  import { CompanyDropdownDTO } from '@/data/dtos/CompanyDropdownDTO';
  
  import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
  import { v4 as uuidv4 } from 'uuid';
  import {Role} from "@/data/dtos/UserInfoDTO";
import { auth } from '@/auth';
import { JobListingDTO } from '@/data/dtos/JobListingDTO';
  // used singleton pattern to avoid connection timeouts due to reaching connection limit
  const prisma: PrismaClient = getPrismaClient();
  // Function to create a new job listing and associate it with skills

  export async function createJobListingWithSkills(jobData:JobListingDTO) {
    const Session = await auth()

    if(!Session?.user.employerId){
        throw new Error('Failed to create job listing employer id not found in session');
    }
    if(!Session.user.companyId){
        throw new Error('Failed to create job listing Company id not found in session');
    }
    try {
      const newJobListing = await prisma.job_postings.create({
        data: {
        job_posting_id: uuidv4(),
          company_id: Session.user.companyId,
          location_id: jobData.location_id,
          employer_id: Session?.user.employerId,
          //tech_area_id: jobData.tech_area_id,
          //sector_id: jobData.sector_id,
          job_title: jobData.job_title,
          job_description: jobData.job_description,
          is_internship: jobData.is_internship || false,
          is_paid: jobData.is_paid || true,
          employment_type: jobData.employment_type || 'full-time',
          location: jobData.location,
          salary_range: jobData.salary_range,
          county: jobData.county,
          zip: jobData.zip,
          publish_date: jobData.publish_date || new Date(),
          unpublish_date: jobData.unpublish_date??'',
          job_post_url: jobData.job_post_url,
          assessment_url: jobData.assessment_url,
        //   // Connect associated skills through the relation
        //   job_listing_has_skills: {
        //     create: skillIds.map(skill_id => ({
        //       skill_id: skill_id
        //     }))
        //   }
        }
      });
  
      return newJobListing;
    } catch (error) {
      console.error('Error creating job listing with skills:', error);
      throw new Error('Failed to create job listing with associated skills');
    }
  }
  