import { SkillDTO } from "./SkillDTO";

export type JobListingCardViewDTO = {
  job_posting_id: string;
  //location_id?: string;
  tech_area_id?: string | null;
  sector_id?: string | null;
  company_id?: string;
  job_title: string;
  job_description: string;
  is_internship?: boolean;
  hasApplied?: boolean;
  isBookmarked?: boolean;
  is_paid?: boolean;
  employment_type?: string;
  location: string;
  salary_range: string;
  county: string;
  zip: string;
  publish_date: Date;
  unpublish_date?: Date;
  job_post_url?: string | null;
  assessment_url?: string | null;
  skills?: SkillDTO[];
  companies: {
    company_name: string;
    company_logo_url: string | null;
    company_mission: string | null;
    company_vision: string | null;
    about_us: string;
  };
  industry_sectors: {
    sector_title: string;
  } | null;
};
