import { SkillDTO } from "./SkillDTO";

export type JobPostCreationDTO = {
  job_posting_id?: string; // Optional: for updates or responses
  //location_id?: string;
  tech_area_id?: string;
  techArea?: { id: string; title: string };
  sector_id?: string;
  company_id?: string;
  jobApplications: {
    jobseekerId: string;
    jobStatus: string;
    Jobseekers: {
      pathways: {
        pathway_title: string;
      };
      users: {
        first_name: string;
        last_name: string;
        photo_url: string;
      };
      intro_headline: string;
      jobseeker_has_skills?: {
        skills: SkillDTO;
      }[];
    };
  }[];
  job_title: string;
  job_description: string;
  is_internship?: boolean;
  is_apprenticeship: boolean;
  is_paid?: boolean;
  employment_type?: string;
  location: string;
  salary_range: string;
  //county: string;
  relocation_services_available: boolean;
  offer_visa_sponsorship: boolean;
  zip: string;
  publish_date?: Date;
  unpublish_date?: Date;
  job_post_url?: string;
  assessment_url?: string;
  skills?: SkillDTO[];
  skillIds?: string[]; // Array of skill IDs to associate with the job
  earn_and_learn_type?: string;
  occupation_code?: string;
  employment_duration?: string;
  start_date?: Date;
  end_date?: Date;
  career_services_offered?: boolean;
};
