import {JobseekerSkill} from "@/data/dtos/JobSeekerSkill";

export type JobSeekerCardViewDTO = {
    jobseeker_id: string;
    user_id: string;
    intro_headline: string | null;
    pathways: {
        pathway_title: string | null;
    };
    contacts: {
        role: string;
        first_name: string | null;
        last_name: string | null;
        photo_url: string | null;
    } ;
    jobseeker_education: {
        eduInstitutions: {
            name: string | null;
        } | null;
        edProgram: string | null;
        isEnrolled: boolean | null;
        startDate: string | null;
        gradDate: string | null;
        degreeType: string | null;
        major: string | null;
    } | null;
    jobseeker_has_skills: JobseekerSkill[];
};
