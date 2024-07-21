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

 type JsCertDTO = {
    certName: string,
    issuingOrg: string,
    credentialId: string | null,
    credentialUrl: string | null,
    issueDate: string,
    expirationDate: string,
}

 type JsProjectExpDTO = {
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

export type JsEducationDTO = {
    userId: string,
    school: string | null | undefined,
    currentEdProgram: string | null | undefined
    fieldOfStudy: string | null | undefined;
    highestLevelOfStudy: string | null | undefined;
    startDate: string | null | undefined;
    completionDate: string | null | undefined;
    currentGrade: string | null | undefined;
    isEnrolledInCollege: boolean;
    edSystem: string | null | undefined;
    gpa: string | null | undefined;
    description: string | null | undefined;
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