import {SkillDTO} from "@/data/dtos/SkillDTO";
import {WorkExperience} from "@prisma/client";

export type JsIntroDTO = {
    userId: string,
    photoUrl?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: string | Date | null;
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
    state?: string | null;
    city?: string  | null;
    county?: string | null;
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
    issueDate?: string,
    expiryDate?: string,
    description?: string | null,
}

export type ProjectExpDTO = {
    projectId: string,
    projTitle: string,
    projectRole: string,
    startDate: string | null,
    completionDate: string | null,
    problemSolvedDescription: string,
    teamSize: string,
    repoUrl?: string | null,
    videoDemoUrl?: string | null,
    skills: SkillDTO[],
}

export enum HighestDegreeType {
    PrimaryEducation = "Primary Education",
    HighSchool = "High School",
    Associates = "Associates",
    Bachelors = "Bachelors",
    Masters = "Masters",
    GED = "GED",
    VocationalQualification = "Vocational Qualification / Certification",
    NoFormalEducation = "No Formal Education"
}

export enum CollegeDegreeType {
    AssociatesDegree = "Associate's Degree",
    BachelorsDegree = "Bachelor's Degree",
    MastersDegree = "Master's Degree",
    DoctoralDegree = "Doctoral Degree"
}

export enum HighSchoolDegreeType {
    None = "None",
    HighSchool = "Diploma",
    GED = "GED"
}

// fixme: My thoughts are this could just be a number entry constrained between 0.0 and 4.0
//  Also, the percentage thresholds and letter grading mapping to GPA vary from institution to institution.
export enum GradePointAverage {
    APlus =  "A+\t97-100%\t4.0",
    A =      "A\t93-96%\t4.0",
    AMinus = "A-\t90-92%\t3.7",
    BPlus =  "B+\t87-89%\t3.3",
    B =      "B\t83-86%\t3.0",
    BMinus = "B-\t80-82%\t2.7",
    CPlus =  "C+\t77-79%\t2.3",
    C =      "C\t73-76%\t2.0",
    CMinus = "C-\t70-72%\t1.7",
    DPlus =  "D+\t67-69%\t1.3",
    D =      "D\t65-66%\t1.0",
    F =      "F\tBelow 65%\t0.0",
}

export enum EducationLevel {
    Unselected = "",
    HighSchool = "High School",
    College = "College",
    TrainingProgram = "Training Program / Bootcamp",
    PreApprenticeship = "Pre-Apprenticeship",
    Other = "Other"
}

export enum PreAEduSystem {
    HighSchool = "High School",
    College = "College",
    Other = "Other",
}

export type JsEducationInfoDTO = {
    id: string,
    edLevel?: EducationLevel,
    edProviderId?: string, // use name lookup to find ID.
    edProviderName?: string,
    preAppEdSystem: PreAEduSystem | null;
    isEnrolled: boolean,
    startDate: string,
    gradDate: string,
    degreeType?: CollegeDegreeType | HighSchoolDegreeType | null,
    programId: string,
    programName: string,
    gpa?: GradePointAverage | null,
    description?: string | null;
}

export type JsEducationPageDTO = {
    userId: string,
    highestLevelOfStudy: HighestDegreeType;
    educations: JsEducationInfoDTO[];
    certifications: CertDTO[];
    projects: ProjectExpDTO[];
}

// type workExperienceDTO = {
//     workExpId: string,
//     techAreaId: string,
//     company: string,
//     jobTitle: string,
//     startDate: string,
//     endDate: string,
//     isCurrent: boolean,
//     isInternship: boolean,
//     responsibility: string,
// }


export type JsWorkExpDTO = {
    userId: string,
    yearsWorkExperience: string,
    monthsInternshipExperience?: string | null,
    isAuthorizedToWorkUsa?: boolean, // TODO: encrypt
    requiresSponsorship?: boolean, // TODO: encrypt
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
    targetedPathway?: string | null,
    preferredEmploymentType?: string | null,
}

// TODO: this needs to be secure
export type JsDisclosuresDTO = {
    jobseekerId?: string | null, // jsDetails
    isVeteran?: string | null, // privateDetails
    hasDisability?: string | null, // privateDetails
    gender?: string | null, // users.gender
    race?: string | null, //users.race
    hasReadTerms: boolean //users.has_read_terms

}

export type JsDisclosuresPostDTO = {
    userId: string,
    isVeteran: string, // jobseekers[0].jobseekers_private_data[0].is_veteran
    hasDisability: string, // jobseekers[0].jobseekers_private_data[0].has_disability
    gender: string, // users.gender
    race: string, //users.race
    hasReadTerms: boolean //users.has_read_terms

}