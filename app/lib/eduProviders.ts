// TODO: CREATE FORM FOR TRAINING PROVIDER DATA
import { PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {EducationLevel} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

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


export type ReadEduProviderProgramCardDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage ss method to retrieve image url. getEduProviderLogoUrl(eduProviderId)
    programName: string, // provider_programs join programs on program_id
    eduProviderName: string, // provider_programs join edu_providers on edu_provider_id
    eduLevel: EducationLevel | null, // provider_programs.eduLevel
    programLength: string, // provider_programs.programLength
    costSummary: string , // provider_programs.costSummary db.TEXT
    pathway: EduProviderPathways[]
}

export type ReadEduProviderProgramDetailDTO = {
    programId: string, // provider_programs.training_program_id
    // logoUrl: string // will use blobStorage ss method to retrieve image url. getEduProviderLogoUrl(eduProviderId)
    programName: string, // provider_programs join programs on program_id
    eduProviderName: string, // provider_programs join edu_providers on edu_provider_id
    locations: string[], // provider_programs.locations. Saved as TEXT field in db but separate into list on DTO delimiter (~)
    about: string, // provider_programs.about Possibly use Quill to implement this
    tuition?: string, // provider_programs.tuition
    fees?: string, // provider_programs.fees
    costSummary?: string, // provider_programs.costSummary
    locationType: LocationType, // provider_programs.locationType (enum LocationType)
    getStartedUrl: string, // provider_programs.getStartedUrl
    faq: { question: string, answer: string }[], // provider_programs.faq as TEXT field parse response with JSON.parse, JSON.stringify
    pathways: EduProviderPathways[] // provider_programs.pathways will need converted from string to list and each item cast into EduProviderPathways enum
}

export enum EduProviderPathways {
    SoftwareDeveloper = "Software Developer",
    ITCloudSupport = "IT & Cloud Support",
    Cybersecurity = "Cybersecurity",
    DataAnalytics = "Data Analytics",
    ProfessionSkillsTraining = "Profession Skills Training",
    ProgramManagement = "Program Management",
}


export enum EducationType { // TODO: Instead of creating a new enum. Let's use the existing EducationLevel enum in data/dtos/JobSeekerProfileCreationDTOs.ts
   K12  = "K12",
   College = 'College',
}

export enum LocationType {
    InPerson = 'In-Person',
    Online = 'Online',
}


export const getProviderProgramCardView = async (pathway: EduProviderPathways): Promise<ReadEduProviderProgramCardDTO[]> => {
    // Fetch all programs
    const data = await prisma.provider_programs.findMany({
        include: {
            Program: true, // Include related program details
            edu_provider: true, // Include related edu_provider details
        },
    });

    // Transform and filter the data
    const programCards: ReadEduProviderProgramCardDTO[] = data
        .filter(program => {
            if (!program.pathways) return false; // Skip if pathways field is null/undefined
            const pathwaysArray = program.pathways.split('~').map(path => path.trim());
            return pathwaysArray.includes(pathway); // Filter programs matching the pathway
        })
        .map(program => ({
            programId: program.training_program_id,
            programName: program.Program.title,
            eduProviderName: program.edu_provider.name,
            eduLevel: isEnumValue(EducationLevel, program.eduLevel) ? program.eduLevel as EducationLevel : null,
            programLength: program.programLength || '',
            costSummary: program.costSummary || '',
            pathway: program.pathways
                ? program.pathways
                    .split('~')
                    .map(path => path.trim())
                    .filter((path): path is EduProviderPathways => isEnumValue(EduProviderPathways, path))
                : [],
        }));

    return programCards;
};

export const getProviderProgramDetailView = async (trainingProviderId: string) => {

}

function isEnumValue<T extends { [key: string]: string | number }>(
    enumObj: T,
    value: string | number | null
): value is T[keyof T] {
    if (value === null || value === undefined || value === '') return false;
    return Object.values(enumObj).includes(value);
}

