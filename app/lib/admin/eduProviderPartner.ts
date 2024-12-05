import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {EducationLevel, ProgramEnrollmentStatus} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import { devLog } from '@/app/lib/utils';
import {PrismaClient} from "@prisma/client";
import {PostAddressDTO} from "@/data/dtos/EmployerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

type TPStudentDetailDTO = {
  firstName: string;
  lastName: string;
  trainingProvider: string;
  trainingProgram: string;
  trainingStartDate: string; // ISO Date string format
  trainingExitDate?: string; // ISO Date string format
  currentProgramStatus: ProgramEnrollmentStatus;
  nonCompletionReason?: NoncompletionReason;
  otherPriorityPopulationsList?: PriorityPopulationList;
  verified: boolean; // Verification status
};

type AdminTrainingPartnerViewDTO = {
  eduProviderId: string;
  eduProviderName: string;
  contact: string;
  contactEmail: string;
  programs: GeneralProgramDTO[];
};

export enum PriorityPopulationList {
  COVIDImpactedWorkers = 'COVID-impacted workers',
  UnderemployedWorkers = 'Underemployed workers',
  LongTermUnemployed = 'Long-term unemployed',
  ShortTermUnemployed = 'Short-term unemployed individuals',
  IncumbentWorkers = 'Incumbent workers',
  RuralCommunities = 'People living in rural communities',
  CoalCommunities = 'People living in coal communities',
  MilitarySpouses = 'Military spouses',
  DisconnectedYouth = 'Disconnected youth',
  SubstanceAbuseRecovery = 'Individuals in substance abuse recovery',
  TANFSNAPWICParticipants = 'Individuals participating in TANF, SNAP, WIC',
  PastCriminalRecords = 'Individuals with past criminal records (e.g., justice impacted, reentry participants)',
}

export enum NoncompletionReason {
  TechnicalRequirementsNotMet = 'Could not meet the technical requirements for graduation',
  FamilyObligations = 'Withdrew due to family obligations',
  PhysicalHealthReasons = 'Withdrew due to physical health reasons',
  MentalHealthReasons = 'Withdrew due to mental health reasons',
  LackOfTransportation = 'Withdrew due to lack of adequate transportation',
  LackOfChildcare = 'Withdrew due to lack of childcare',
  FinancialObligations = 'Withdrew due to financial obligations e.g., had to get a full-time job',
  DismissedForBehavior = 'Dismissed due to behavior',
  AttendanceRequirementsNotMet = 'Did not meet attendance requirements',
  WithdrewForNewJob = 'Withdrew because they started a new job during training',
  Other = 'Other',
}


export type AddTrainingPartnerDTO = {
  eduProviderId: string,
  eduLevel?: EducationLevel, // edu_providers.edu_type
  providerName: string, // edu_providers.name
  contactName?: string, // edu_providers.contact
  contactEmail?: string, // edu_providers.contact_email
  logoUrl?: string,
  url?: string, // edu_providers.edu_url
  mission?: string, // edu_providers.mission
  providerDescription?: string, // edu_providers.providerDescription
  setsApartStatement?: string, // edu_providers.setsApartStatement
  screeningCriteria?: string, // edu_providers.screeningCriteria
  recruitingSources?: string, // edu_providers.recruitingSources
  programCount?: string, // edu_providers.programCount
  cost: string, // edu_providers.cost
  isAdminReviewed: boolean, // edu_providers.isAdminReviewed
  isCoalitionMember: boolean, // edu_providers.isCoalitionMember
  // createdBy: string, // edu_providers.userId

  // relations
  providerAddresses?: string[] // zip codes
}
export const addTrainingPartner = async (newPartner: AddTrainingPartnerDTO) => {
  const partner = await prisma.edu_providers.upsert({
    where: {
      name: newPartner.providerName, // Using 'name' as the unique identifier
    },
    update: {
      edu_type: newPartner.eduLevel, // Optional
      contact: newPartner.contactName, // Optional
      contact_email: newPartner.contactEmail, // Optional
      edu_url: newPartner.url, // Optional
      mission: newPartner.mission, // Optional
      providerDescription: newPartner.providerDescription, // Optional
      setsApartStatement: newPartner.setsApartStatement, // Optional
      screeningCriteria: newPartner.screeningCriteria, // Optional
      recruitingSources: newPartner.recruitingSources, // Optional
      programCount: newPartner.programCount, // Optional
      cost: newPartner.cost, // Optional

      // Required fields (with default values if not provided)
      isAdminReviewed: newPartner.isAdminReviewed ?? true, // Required
      isCoalitionMember: newPartner.isCoalitionMember ?? false, // Required

      // Relations can be included if necessary
      // edu_addresses: {...}, // Optional
      // educators: {...}, // Optional
      // TrainingPrograms: {...}, // Optional
      // TrainingPartnerDetail: {...}, // Optional
      // ProviderTestimonials: {...}, // Optional
    },
    create: {
      // Include all fields from the schema

      // Optional fields
      edu_type: newPartner.eduLevel, // Optional
      contact: newPartner.contactName, // Optional
      contact_email: newPartner.contactEmail, // Optional
      edu_url: newPartner.url, // Optional
      mission: newPartner.mission, // Optional
      providerDescription: newPartner.providerDescription, // Optional
      setsApartStatement: newPartner.setsApartStatement, // Optional
      screeningCriteria: newPartner.screeningCriteria, // Optional
      recruitingSources: newPartner.recruitingSources, // Optional
      programCount: newPartner.programCount, // Optional
      cost: newPartner.cost, // Optional

      // Required fields
      name: newPartner.providerName, // Required for creation
      isAdminReviewed: newPartner.isAdminReviewed ?? false, // Required
      isCoalitionMember: newPartner.isCoalitionMember ?? false, // Required

      // Relations can be included if necessary
      // edu_addresses: {...}, // Optional
      // educators: {...}, // Optional
      // TrainingPrograms: {...}, // Optional
      // TrainingPartnerDetail: {...}, // Optional
      // ProviderTestimonials: {...}, // Optional
    },
  });
};

export const removeTrainingPartner = async (eduProviderId: string) => {
  // I don't think we will ever want to remove an education provider
};



export const getTrainingPartners = async (): Promise<{ success: true; result: AdminTrainingPartnerViewDTO[] }> => {
  const partners = await prisma.edu_providers.findMany({
    where: {
      isCoalitionMember: true,
    },
    select: {
      id: true,
      name: true,
      contact: true,
      contact_email: true,
      TrainingPrograms: {
        select: {
          training_program_id: true,
          Program: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  devLog(partners);

  const transformedData: AdminTrainingPartnerViewDTO[] = partners.map((partner: any) => ({
    eduProviderId: partner.id,
    eduProviderName: partner.name,
    contact: partner.contact,
    contactEmail: partner.contact_email,
    programs: partner.TrainingPrograms.map((program: any) => ({
      id: program.training_program_id as string,
      title: program.Program.title as string,
    })),
  }));

  return { success: true, result: transformedData };
};


export const getJobseekersByTrainingPartner = async (providerId: string) => {
  //TODO: Sort by is_verified
};

export const updateJobseekerTrainingProgram = async (jobseekerId: string) => {};
