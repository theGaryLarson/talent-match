import {SkillDTO} from "@/data/dtos/SkillDTO";
import {WorkExperience} from "@prisma/client";

export type JsIntroDTO = {
    userId: string,
    photoUrl?: string | null;
    firstName: string;
    lastName: string;
    birthDate: string | Date;
    phoneCountryCode?: string | null;
    phone?: string | null;
    zipCode?: string | null;
    state?: string | null;
    city?: string | null;
    county?: string | null;
    email: string;
    introHeadline?: string | null;
    currentJobTitle?: string | null;
    resumeUrl?: string | null;
}

export type JsIntroPostDTO = {
    userId: string,
    photoUrl?: string | null;
    firstName: string;
    lastName: string;
    birthDate: string | Date;
    phoneCountryCode?: string | null;
    phone?: string | null;
    zipCode: string;
    state: string;
    city: string;
    county: string;
    email: string;
    introHeadline?: string | null;
    currentJobTitle?: string | null;
    resumeUrl?: string | null;
}

export type CertDTO = {
    certId: string,
    name: string,
    logoUrl?: string | null,
    issuingOrg: string,
    credentialId?: string | null,
    credentialUrl?: string | null,
    issueDate: string,
    expiryDate: string,
    description?: string | null,
}

export type ProjectExpDTO = {
    projectId: string,
    projTitle: string,
    projectRole: string,
    startDate: string,
    completionDate: string,
    problemSolvedDescription: string,
    teamSize: string,
    repoUrl?: string | null,
    demoUrl?: string | null,
    skills: SkillDTO[],
}

export enum DegreeType {
    None = "None",
    HighSchool = "High School",
    Certification = "Certification",
    AssociatesDegree = "Associate's Degree",
    BachelorsDegree = "Bachelor's Degree",
    MastersDegree = "Master's Degree",
    DoctoralDegree = "Doctoral Degree"
}

export enum CurrentGrade {
    Freshman = "Freshman",
    Sophomore = "Sophomore",
    Junior = "Junior",
    Senior = "Senior"
}

export enum EdProgram {
    None = "None",
    HighSchool = "High school",
    College = "College",
    TrainingProgram = "Training program",
    BootCamp = "Boot camp",
    PreApprenticeship = "Pre-apprenticeship",
    Other = "Other",
}

export type EducationInfoDTO = {
    jobseekerEdId: string,
    edInstitutionId: string, // use name lookup to find ID.
    institutionName?: string,
    isEnrolled: boolean,
    startDate: string,
    gradDate: string,
    degreeType?: DegreeType,
    major?: string | null,
    minor?: string | null,
    edProgram?: EdProgram,
    edSystem?: string | null; // pre apprenticeship option
    description?: string | null;
}

export type JsEducationDTO = {
    userId: string,
    highestLevelOfStudy: DegreeType;
    currentEdProgram: EdProgram // college, high school, etc.
    currentGrade: CurrentGrade;
    isEnrolledEdProgram: boolean;
    schools: EducationInfoDTO[];
    certifications: CertDTO[];
    projects: ProjectExpDTO[];
}

type workExperienceDTO = {
    workExpId: string,
    techAreaId: string,
    company: string,
    jobTitle: string,
    startDate: string,
    endDate: string,
    isCurrent: boolean,
    isInternship: boolean,
    responsibility: string,
}


export type JsWorkExpDTO = {
    userId: string,
    yearsWorkExperience: string,
    monthsInternshipExperience?: string | null, // TODO: add field to the database
    isAuthorizedToWorkUsa: boolean, // TODO: encrypt
    requiresSponsorship: boolean, // TODO: encrypt
    workExperiences?: WorkExperience[]
}

export type JsShowcaseDTO = {
    userId: string,
    skills: SkillDTO[],
    portfolioUrl?: string | null,
    portfolioPassword?: string | null, // TODO: encrypt. password for employer to view portfolio if jobseeker has portfolio pw setup.
    video_url?: string | null,
}

export type JsPreferencesDTO = {
    userId: string,
    targetedPathwayId?: string | null
    preferredEmploymentType?: string | null,
}

// TODO: this needs to be secure
export type JsDisclosuresDTO = {
    jobseekerId?: string | null, // jsDetails
    isVeteran?: string | null, // privateDetails
    hasDisability?: string | null, // privateDetails
    gender?: string | null, // contacts.gender
    race?: string | null, //contacts.race
    hasReadTerms: boolean //contacts.has_read_terms

}

export type JsDisclosuresPostDTO = {
    userId: string,
    jobseekerId: string, // contacts.jobseekers[0].jobseeker_id
    isVeteran: string, // jobseekers[0].jobseekers_private_data[0].is_veteran
    hasDisability: string, // jobseekers[0].jobseekers_private_data[0].has_disability
    gender: string, // contacts.gender
    race: string, //contacts.race
    hasReadTerms: boolean //contacts.has_read_terms

}