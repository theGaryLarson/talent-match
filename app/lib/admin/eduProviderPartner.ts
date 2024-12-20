import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {EducationLevel, ProgramEnrollmentStatus} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import { devLog } from '@/app/lib/utils';
import {PrismaClient} from "@prisma/client";
import { auth } from "@/auth"

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
  eduLevel?: EducationLevel | null, // edu_providers.edu_type
  providerName: string, // edu_providers.name
  contactName?: string | null, // edu_providers.contact
  contactEmail?: string | null, // edu_providers.contact_email
  logoUrl?: string | null,
  website?: string | null, // edu_providers.edu_url
  mission?: string | null, // edu_providers.mission
  providerDescription?: string | null, // edu_providers.providerDescription
  setsApartStatement?: string | null, // edu_providers.setsApartStatement
  screeningCriteria?: string | null, // edu_providers.screeningCriteria
  recruitingSources?: string  | null, // edu_providers.recruitingSources
  programCount?: string  | null, // edu_providers.programCount
  cost: string  | null, // edu_providers.cost
  isAdminReviewed: boolean, // edu_providers.isAdminReviewed
  isCoalitionMember: boolean, // edu_providers.isCoalitionMember
  // createdBy: string, // edu_providers.userId

  // relations
  providerAddresses?: string[] // zip codes
}
export const addTrainingPartner = async (newPartner: AddTrainingPartnerDTO) => {
  try {
    const session = await auth();
    const userId = session?.user.id
    const partner = await prisma.edu_providers.upsert({
      where: { name: newPartner.providerName },
      update: {
        edu_type: newPartner.eduLevel || null,
        contact: newPartner.contactName || null,
        contact_email: newPartner.contactEmail || null,
        edu_url: newPartner.website || null,
        mission: newPartner.mission || null,
        providerDescription: newPartner.providerDescription || null,
        setsApartStatement: newPartner.setsApartStatement || null,
        screeningCriteria: newPartner.screeningCriteria || null,
        recruitingSources: newPartner.recruitingSources || null,
        programCount: newPartner.programCount || null,
        cost: newPartner.cost || null,
        isAdminReviewed: newPartner.isAdminReviewed || true,
        isCoalitionMember: newPartner.isCoalitionMember || false,
        logoUrl: newPartner.logoUrl || null,
      },
      create: {
        edu_type: newPartner.eduLevel,
        contact: newPartner.contactName,
        contact_email: newPartner.contactEmail,
        edu_url: newPartner.website,
        mission: newPartner.mission,
        providerDescription: newPartner.providerDescription,
        setsApartStatement: newPartner.setsApartStatement,
        screeningCriteria: newPartner.screeningCriteria,
        recruitingSources: newPartner.recruitingSources,
        programCount: newPartner.programCount,
        cost: newPartner.cost,
        name: newPartner.providerName,
        isAdminReviewed: newPartner.isAdminReviewed ?? false,
        isCoalitionMember: newPartner.isCoalitionMember ?? false,
        logoUrl: newPartner.logoUrl,
        userId: userId,

      },
    });

    return partner; // Ensure this always returns an object
  } catch (error) {
    console.error("Error in addTrainingPartner:", error);
    return null; // Return null if an error occurs
  }
};
/**
 * Fully Deletes an edu provider along with their addresses and programs
 * @param providerId 
 * @returns 
 */
export async function deleteEduProvider(providerId: string) {
  try {
      const [deletedAddresses, deletedPrograms, deletedProvider] = await prisma.$transaction([
          prisma.edu_addresses.deleteMany({
              where: { edu_provider_id: providerId },
          }),
          prisma.provider_programs.deleteMany({
              where: { edu_provider_id: providerId },
          }),
          prisma.edu_providers.delete({
              where: { id: providerId },
          }),
      ]);
      return {
          status: 200,
          data: {
              deletedAddresses,
              deletedPrograms,
              deletedProvider,
          },
      };
  } catch (error) {
      console.error('Error during provider deletion:', error);

      return {
          status: 500,
          error: 'Failed to delete the provider. Ensure there are no remaining dependencies.',
      };
  }
}



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
