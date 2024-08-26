import {JobseekerSkillDTO} from "@/data/dtos/JobseekerSkillDTO";

export type JobSeekerCardViewDTO = {
    jobseeker_id: string;
    user_id: string;
    intro_headline: string | null;
    pathways: {
        pathway_title: string | null;
    };
    users: {
        role: string;
        first_name: string | null;
        last_name: string | null;
        photo_url: string | null;
    } ;
    jobseeker_education: {
        eduProviders: {
            name: string | null;
        } | null;
        edProgram: string | null;
        isEnrolled: boolean | null;
        startDate: string | null;
        gradDate: string | null;
        degreeType: string | null;
        major: string | null;
    } | null;
    program: {
        id: string | null,
        title: string | null,
    }
    jobseeker_has_skills: JobseekerSkillDTO[];
};
