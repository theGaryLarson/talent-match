// TODO: CREATE FORM FOR TRAINING PROVIDER DATA

import {EducationLevel} from "@/data/dtos/JobSeekerProfileCreationDTOs";

export type ReadEduProviderDTO = {
    eduProviderId: string, //edu_providers.id
    eduLevel: EducationLevel, // edu_providers.edu_type
    providerName: string, // edu_providers.name
    contactName: string, // edu_providers.contact
    contactEmail: string, // edu_providers.contact_email
    url: string, // edu_providers.edu_url
    mission: string, // edu_providers.mission
    providerDescription: string, // edu_providers.providerDescription
    setsApartStatement: string, // edu_providers.setsApartStatement
    screeningCriteria: string, // edu_providers.screeningCriteria
    recruitingSources: string, // edu_providers.recruitingSources
    programCount: string, // edu_providers.programCount
    cost: string, // edu_providers.cost
    // isAdminReviewed: boolean, // edu_providers.isAdminReviewed
    // isCoalitionMember: boolean, // edu_providers.isCoalitionMember
    // createdBy: string, // edu_providers.userId
}


export type ReadEduProviderProgramDetailDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage ss method to retrieve image url. getEduProviderLogoUrl(eduProviderId)
    programName: string, // provider_programs join programs on program_id
    eduProviderName: string, // provider_programs join edu_providers on edu_provider_id
    locations: string[], // TODO: add provider_programs.locations, save as TEXT field in db but separate into list on DTO delimiter (~)
    about: string, // TODO: add provider_programs.about use Quill to implement this
    quickInfo: {
        tuition?: string, // TODO: add provider_programs.tuition
        fees?: string, // TODO: add provider_programs.fees
        additionalCostInfo?: string, // TODO:provider_programs.cost
        locationType: LocationType, // TODO: add provider_programs.locationType
        getStartedUrl: string, // TODO: add provider_programs.getStartedUrl
    },
    faq: { question: string, answer: string }[], // TODO: add to db provider_programs.faq as TEXT field parse response with JSON.parse, JSON.stringify
    pathways: EduProviderPathways[] // provider_programs.pathways will need converted from string to list and each item cast into EduProviderPathways enum
}

export type ReadEduProviderProgramCardDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage ss method to retrieve image url. getEduProviderLogoUrl(eduProviderId)
    programName: string, // provider_programs join programs on program_id
    eduProviderName: string, // provider_programs join edu_providers on edu_provider_id
    eduLevel: EducationLevel, // TODO: add provider_programs.edLevel
    programLength: string, // TODO: add provider_programs.programLength
    costSummary: string, // TODO: remove cost, add provider_programs.costSummary db.TEXT
    pathway: EduProviderPathways[]
}

export enum EduProviderPathways {
    SoftwareDeveloper = "Software Developer",
    ITCloudSupport = "IT & Cloud Support",
    Cybersecurity = "Cybersecurity",
    DataAnalytics = "Data Analytics",
    ProfessionSkillsTraining = "Profession Skills Training",
    ProgramManagement = "Program Management",
}


export enum EducationType { // TODO: complete types e.g. what to label Per Scholas, etc.
   K12  = "K12",
   College = 'College',
}

export enum LocationType {
    InPerson = 'In-Person',
    Online = 'Online',
}