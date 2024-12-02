// TODO: CREATE FORM FOR TRAINING PROVIDER DATA

export type ReadEduProviderDTO = {

}


export type ReadEduProviderProgramDetailDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage method to retrieve image url. // TODO: create post, get method for this.
    programName: string,
    eduProviderName: string,
    locations: string[], // TODO: add this to program provider table, save as TEXT field in db but separate into list on DTO delimiter (~)
    about: string, //TODO: use Quill to implement this
    quickInfo: {
        tuition?: string,
        fees?: string,
        additionalCostInfo?: string,
        locationType: LocationType,
        getStartedUrl: string,
    },
    faq: { question: string, answer: string }[],
    pathways: EduProviderPathways[]
}

export type ReadEduProviderProgramCardDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage method to retrieve image url. // TODO: create post, get method for this.
    programName: string,
    eduProviderName: string,
    edType: EducationType, // TODO: should be added to EduProviderDTO.
    programLength: string,
    cost: string, // brief cost
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