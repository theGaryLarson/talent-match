import {SkillDTO} from "@/data/dtos/SkillDTO";
import {DateTime} from "@auth/core/providers/kakao";
import {WorkExperience} from "@prisma/client";

export type JsIntroDTO = {
    userId: string,
    photoUrl: string | null;
    firstName: string;
    lastName: string;
    birthDate: string | Date;
    phoneCountryCode: string | null;
    phone: string | null;
    zipCode: string;
    state: string;
    city: string;
    county: string;
    email: string;
    introHeadline: string | null;
    currentJobTitle: string | null;
    resumeUrl: string | null;
}

export type CertDTO = {
    certId: string,
    jobSeekerId: string,
    name: string,
    logoUrl: string | undefined,
    issuingOrg: string,
    credentialId: string | undefined,
    credentialUrl: string | undefined,
    issueDate: string,
    expiryDate: string,
    description: string | undefined,
}

export type ProjectExpDTO = {
    projectId: string,
    projTitle: string,
    projectRole: string,
    startDate: string,
    completionDate: string,
    problemSolvedDescription: string,
    teamSize: string,
    repoUrl?: string,
    demoUrl?: string,
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
    institutionName: string,
    isEnrolled: boolean,
    startDate: string,
    gradDate: string,
    degreeType: DegreeType,
    major: string | undefined,
    minor: string | undefined,
    edProgram: EdProgram,
    edSystem: string | undefined; // pre apprenticeship option
    description: string | undefined;
}

export type JsEducationDTO = {
    userId: string,
    highestLevelOfStudy: DegreeType | null | undefined;
    currentEdProgram: EdProgram // college, high school, etc.
    currentGrade: CurrentGrade | undefined;
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
    amountInternshipExperience?: string, // TODO: add field to the database
    isAuthorizedToWorkUsa: boolean, // TODO: encrypt
    requiresSponsorship: boolean, // TODO: encrypt
    workExperiences?: WorkExperience[]
}

export type JsShowcaseDTO = {
    skills: SkillDTO[],
    portfolioUrl: string,
    portfolioPassword: string, // TODO: encrypt. password for employer to view portfolio if jobseeker has portfolio pw setup.
    video_url: string,
}

export type JsPreferences = {
    preferredEmploymentType: string,
    targetedPathway: string
}

// TODO: this needs to be secure
export type JsDisclosures = {
    gender: string,
    isVeteran: string,
    ethnicity: string,
    hasDisability: string,
    hasReadTerms: number // TODO: add to the db

}