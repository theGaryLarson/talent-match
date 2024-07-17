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
    currentSchool: string | null;
    currentJobTitle: string | null;
    resumeUrl: string | null;
}

export type JsEducationDTO = {
    highestLevelOfStudy: string;
    currentEnrolledEdProgram: string;
    startDate: string;  // todo: add to db
    completionDate: string; // todo: add to db
    currentGrade: string;
    gpa: string // fix: do not need to collect
}

export type JsCertDTO = {
    certName: string,
    issuingOrg: string,
    credentialId: string | null,
    credentialUrl: string | null,
    issueDate: string,
    expirationDate: string,
}

export type JsProjectExpDTO = {
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

type workExperienceDTO = {
    company: string,
    jobTitle: string,
    startDate: string,
    endDate: string,
    isCurrent: number, // 0 false 1 true tinyint represents boolean in the database
    isInternship: number, // 0 false 1 true tinyint represents boolean in the database
    responsibility: string,
}

export type JsWorkExpDTO = {
    yearsWorkExperience: string,
    AmountInternshipExperience: string, // TODO: add field to the database
    isAuthorizedToWorkUsa: number // 0 false 1 true tinyint represents boolean in the database
    requiresSponsorship: number // 0 false 1 true tinyint represents boolean in the database
    workExperiences: workExperienceDTO[]
}

export type JsShowcaseDTO = {
    skills: string[], // we should store uuid of the skill
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
    isVeteran: number, // 0: no 1:yes 2: prefer not to say
    ethnicity: string,
    hasDisability: string,
    hasReadTerms: number // TODO: add to the db

}