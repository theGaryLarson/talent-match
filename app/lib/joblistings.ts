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
  //TODO: fix zip code and location, add in sector and skills
  export async function createJobListingWithSkills(jobData:JobListingDTO) {
    const Session = await auth()

    if(!Session?.user.employerId){
        throw new Error('Failed to create job listing employer id not found in session');
    }
    if(!Session.user.companyId){
        throw new Error('Failed to create job listing Company id not found in session');
    }
    
    
    try {
      let locationId = await prisma.company_addresses.findFirst(
        {where:{AND:{
          zip:jobData.zip,
          company_id:Session.user.companyId
        }
        }}
      )
      if (!locationId) {
        locationId = await prisma.company_addresses.create(
        {
          data:{
            company_id:Session.user.companyId,
            company_address_id: uuidv4(),
            zip: jobData.zip
          }
        }
        )
    }

    let postalGeoData = await prisma.postalGeoData.findFirst({where:{zip:jobData.zip}})

    console.log('Employer ID:', Session.user.employerId);
    console.log('Company ID:', Session.user.companyId);
      const newJobListing = await prisma.job_postings.create({
        data: {
        job_posting_id: uuidv4(),
          company_id: Session.user.companyId,
          location_id: locationId.company_address_id,
          employer_id: Session?.user.employerId,
          //tech_area_id: jobData.tech_area_id,
          //sector_id: jobData.sector_id,
          job_title: jobData.job_title,
          job_description: jobData.job_description,
          is_internship: jobData.is_internship || false,
          is_paid: jobData.is_paid || true,
          zip:jobData.zip,
          employment_type: jobData.employment_type || 'full-time',
          location: jobData.location,//meant to be Remote/ hybrid/ onsite
          salary_range: jobData.salary_range,
          county: postalGeoData?.county??'',
          publish_date: new Date(),
          unpublish_date: new Date(jobData.unpublish_date??'12/25/2030'),
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
  console.log("new jobs listing: ",newJobListing)
      return newJobListing;
      
    } catch (error) {
      console.error('Error creating job listing with skills:', error);
     // throw new Error('Failed to create job listing with associated skills');
    }
  }
  
  export async function getJobListingById(joblistingId:string) {
    try{
      const joblisting = await prisma.job_postings.findUnique({where:{
      job_posting_id:joblistingId
    }})
    return joblisting;
    }catch(e){
      console.error(e);
    }
        
  }