import { occupations } from "../lib/mock-data";
import { occupationSelected } from "../lib/mock-data";
import { regions } from "../lib/mock-data";

export interface IPathway {
    cfa_pathwayid: string;
    cfa_name: string;
};

export interface IOccupation {
    cfa_occupationid: string;
    cfa_name: string;
    cfa_whattheydo: string;
};

export interface IRelatedData {
    cfa_jobpostingsregionalbreakdown_Occupation: { cfa_aug2023july2024: string, cfa_msa: string, cfa_jobpostingsregionalbreakdownid: string }[];
    cfa_toppostedjobtitle_Occupation: { cfa_jobtitle: string }[];
    cfa_topcompaniesposting_Occupation: { cfa_company: string }[];
    cfa_toplightcastskill_Occupation: { cfa_skill: string }[];
    cfa_experiencebreakdown_Occupation: { cfa_experience: string, cfa_percentoftotal: string }[];
    cfa_educationbreakdown_Occupation: { cfa_educationlevel: string, cfa_percentoftotal: string }[];
    cfa_advertisedwagetrend_Occupation: { cfa_monthyear: string, cfa_advertisedwage: string }[];
    cfa_avgmonthlyhiresaug2023july2024: number,
    cfa_avgmonthlypostingsaug2023july2024: number,
    cfa_whattheydo: string;
    cfa_name: string;
    cfa_code: string;
}

export interface IJobData {
    cfa_name: string;
    cfa_company: string;
    cfa_description: string;
    cfa_datestring: string;
    cfa_location: string;
    cfa_skills: string;
    cfa_url: string;
}

export interface IITPrograms {
    cfa_programname: string;
    cfa_communitycollege: string;
    cfa_awardtype: string;
    cfa_programlength: string;
    cfa_completers: string;
    cfa_region: string;
    cfa_county: string;
    cfa_city: string;
    cfa_link: string;
}

export interface ICipSocs {
    cfa_careerbridgecipsocid: string;
    cfa_cipcode: string;
    cfa_soccode: string;
}