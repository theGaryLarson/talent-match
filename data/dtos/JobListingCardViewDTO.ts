import { SkillDTO } from "./SkillDTO";

export type JobListingCardViewDTO = {
  job_posting_id?: string;
  //location_id?: string;
  tech_area_id?: string;
  sector_id?: string;
  company_id?: string;
  job_title: string;
  job_description: string;
  is_internship?: boolean;
  is_paid?: boolean;
  employment_type?: string;
  location: string;
  salary_range: string;
  county: string;
  zip: string;
  publish_date?: Date;
  unpublish_date?: Date;
  job_post_url?: string;
  assessment_url?: string;
  skills?: SkillDTO[];
  companies: {
    company_name: string;
    company_logo_url: string;
    company_mission: string;
    company_vision: string;
    about_us: string;
  };
  industry_sectors: {
    sector_title: string;
  };
};
