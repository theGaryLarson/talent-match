import { ProgramEnrollmentStatus } from '@/data/dtos/JobSeekerProfileCreationDTOs';

type TPStudentDetailDTO = {
  firstName: string;
  lastName: string;
  trainingProvider: string;
  trainingProgram: string;
  trainingStartDate: string; // ISO Date string format
  trainingExitDate: string; // ISO Date string format
  currentProgramStatus: ProgramEnrollmentStatus;
  nonCompletionReason?: NoncompletionReason;
  otherPriorityPopulationsList: PriorityPopulationList;
  verified: boolean; // Verification status
};

export enum PriorityPopulationList {
  COVIDImpactedWorkers = "COVID-impacted workers",
  UnderemployedWorkers = "Underemployed workers",
  LongTermUnemployed = "Long-term unemployed",
  ShortTermUnemployed = "Short-term unemployed individuals",
  IncumbentWorkers = "Incumbent workers",
  RuralCommunities = "People living in rural communities",
  CoalCommunities = "People living in coal communities",
  MilitarySpouses = "Military spouses",
  DisconnectedYouth = "Disconnected youth",
  SubstanceAbuseRecovery = "Individuals in substance abuse recovery",
  TANFSNAPWICParticipants = "Individuals participating in TANF, SNAP, WIC",
  PastCriminalRecords = "Individuals with past criminal records (e.g., justice impacted, reentry participants)"
}

export enum NoncompletionReason {
  TechnicalRequirementsNotMet = "Could not meet the technical requirements for graduation",
  FamilyObligations = "Withdrew due to family obligations",
  PhysicalHealthReasons = "Withdrew due to physical health reasons",
  MentalHealthReasons = "Withdrew due to mental health reasons",
  LackOfTransportation = "Withdrew due to lack of adequate transportation",
  LackOfChildcare = "Withdrew due to lack of childcare",
  FinancialObligations = "Withdrew due to financial obligations e.g., had to get a full-time job",
  DismissedForBehavior = "Dismissed due to behavior",
  AttendanceRequirementsNotMet = "Did not meet attendance requirements",
  WithdrewForNewJob = "Withdrew because they started a new job during training",
  Other = "Other"
}