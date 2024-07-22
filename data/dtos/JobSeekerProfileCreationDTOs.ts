import {SkillDTO} from "@/data/dtos/SkillDTO";

export type JsIntroDTO = {
    user_id: string,
    photo_url: string | null;
    first_name: string;
    last_name: string;
    birthdate: string | Date;
    phone: string | null;
    zipCode: string;
    state: string;
    city: string;
    county: string;
    email: string;
    phoneCountryCode: string | null;
    introHeadline: string | null;
    currentSchool: string | null; // TODO: move to JSEducationDTO
    currentJobTitle: string | null;
    resumeUrl: string | null;
}

 export type CertDTO = {
    certName: string,
    issuingOrg: string,
    credentialId: string | null,
    credentialUrl: string | null,
    issueDate: string,
    expirationDate: string,
}

 export type ProjectExpDTO = {
    projTitle: string,
    role: string,
    startDate: string,
    endDate: string,
    demoUrl: string,
    repoUrl: string,
    problemSolvedDescription: string,
    teamSize: string,
    skills: string[],
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

export type EducationInfo = {
    jobseekerEdId: string,
    jobSeekerId: string,
    edInstitutionId: string | null | undefined, // use name lookup to find ID.
    edProgram: EdProgram | null | undefined,
    isEnrolled: boolean,
    startDate: string,
    gradDate: string,
    degreeType: DegreeType | null | undefined,
    major: string | null | undefined,
    minor: string | null | undefined,
    edSystem: string | null | undefined; // pre apprenticeship option
    gpa: string | null | undefined;
    description: string | null | undefined;
}

export type JsEducationDTO = {
    user_id: string,
    highestLevelOfStudy: DegreeType | null | undefined;
    currentEdProgram: EdProgram | null | undefined  // college, high school, etc.
    currentGrade: CurrentGrade | null | undefined;
    isEnrolled: boolean;
    schools: EducationInfo[];
    certifications: CertDTO[];
    projects: ProjectExpDTO[];
}

type workExperienceDTO = {
    company: string,
    jobTitle: string,
    startDate: string,
    endDate: string,
    isCurrent: boolean,
    isInternship: boolean,
    responsibility: string,
}

export type JsWorkExpDTO = {
    yearsWorkExperience: string,
    AmountInternshipExperience: string, // TODO: add field to the database
    isAuthorizedToWorkUsa: boolean,
    requiresSponsorship: boolean,
    workExperiences: workExperienceDTO[]
}

export type JsShowcaseDTO = {
    skills: SkillDTO[],
    portfolioUrl: string,
    portfolioPassword: string,
    video_url: string,
}

export type JsPreferences = {
    preferredEmploymentType: string,
    targetedPathway: string
}

// TODO: this needs to be secure
export type JsDisclosures = {
    gender: string,
    isVeteran: string, // 0: no 1:yes 2: prefer not to say
    ethnicity: string,
    hasDisability: string,
    hasReadTerms: number // TODO: add to the db

}