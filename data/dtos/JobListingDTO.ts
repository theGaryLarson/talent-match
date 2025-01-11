export type JobPostCreationDTO = {
    job_posting_id?: string;        // Optional: for updates or responses
    //location_id?: string;
    tech_area_id?: string;
    sector_id?: string;
    company_id?:string;
    job_title: string;
    job_description: string;
    is_internship?: boolean;
    is_paid?: boolean;
    employment_type?: string;
    location: string;
    salary_range: string;
    //county: string;
    relocation_services:boolean;
    visa_sponsership:boolean
    zip: string;
    //publish_date?: Date;
    unpublish_date?: Date;
    job_post_url?: string;
    assessment_url?: string;
    skillIds?: string[];             // Array of skill IDs to associate with the job
  }