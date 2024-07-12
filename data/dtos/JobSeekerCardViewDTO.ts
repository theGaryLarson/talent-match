import {JobseekerSkill} from "@/data/dtos/JobSeekerSkill";

export type JobSeekerCardViewDTO = {
    jobseeker_id: string;
    user_id: string;
    intro_headline: string;
    pathways: {
        pathway_title: string | null;
    };
    contacts: {
        role: string;
        first_name: string | null;
        last_name: string | null;
        photo_url: string | null;
    } ;
    edu_institutions: {
        name: string | null;
    } | null;
    jobseeker_has_skills: JobseekerSkill[];
};
