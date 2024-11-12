import {certificates} from "@prisma/client";
import {
    EducationLevel,
    HighestCompletedEducationLevel,
    ProgramEnrollmentStatus
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {CareerPrepTrack, PoolCategories} from "@/app/lib/poolAssignment";
import { PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { auth } from "@/auth";
import {devLog} from "@/app/lib/utils";

const prisma: PrismaClient = getPrismaClient();

/**
 * Enumeration representing different time frames until completion.
 * Possible values include:
 * - NA: Not applicable
 * - ZeroToThreeMonths: Within the range of 0 to 3 months
 * - ThreeToSixMonths: Within the range of 3 to 6 months
 * - SixToNineMonths: Within the range of 6 to 9 months
 * - NineToTwelveMonths: Within the range of 9 to 12 months
 * - TwelvePlusMonths: More than 12 months to completion
 */
export enum TimeUntilCompletion {
    NA = "N/A",
    ZeroToThreeMonths = "0-3 months",
    ThreeToSixMonths = "3-6 months",
    SixToNineMonths = "6-9 months",
    NineToTwelveMonths = "9-12 months",
    TwelvePlusMonths = "12+ months"
}

/**
 * Represents the status of a technical certificate.
 * - NA: Not Applicable
 * - InProgress: Certificate is in progress
 * - Obtained: Certificate has been obtained
 */
export enum TechCertificateStatus {
    NA = "N/A",
    InProgress = "In Progress",
    Obtained = "Obtained"
}

/**
 * Enum representing the different status options for a career preparation process.
 * @enum {string}
 */
export enum CareerPrepStatus { // TODO: modify with Bethany
    Applied = "Applied",
    SentAssessment = "Sent Assessment",
    CreatingPlan = "Creating Plan",
    MeetingScheduled = "Meeting Scheduled",
    MetCareerNavigator = "Met Career Navigator",
    SentIntakeForm = "Sent Intake Form",
    Enrolled = "Enrolled",
    Completed = "Completed",
    Rejected = "Rejected",
    Withdrawn = "Withdrawn" // additional option from what was given.
}

/**
 * Represents data transfer object for Admin Career Prep.
 * This will be used to load all Jobseekers who have completed an Assessment for Career Prep
 */
export interface AdminCareerPrepDTO {
    students: CareerPrepJobseekerCardViewDTO[];
}

/**
 * Represents a summary of a student including their details, meetings, and notes.
 * This will lazy load on expanding card view of student.
 * @interface
 */
export interface StudentSummary {
    studentDetail: CareerPrepJobseekerDetailViewDTO;
    meetings: MeetingDTO[] | null;
    meetingNotes: Note[] | null; // will filter notes by NoteType on backend
    followUpNotes: Note[] | null;
    reviewNotes: Note[] | null;
}

/**
 * Interface representing a data transfer object for Jobseeker Card View in Career Prep module.
 * @interface CareerPrepJobseekerCardViewDTO
 */
export interface CareerPrepJobseekerCardViewDTO {
    firstName: string;
    lastName: string;
    pronouns: string;
    careerPrepTrack: CareerPrepTrack | null
    careerPrepAssessmentDate: Date;
    careerPrepEnrollmentStatus: CareerPrepStatus;
    careerPrepExpectedEndDate: Date | null;
    expectedEduCompletion: TimeUntilCompletion;
    assignedPool: PoolCategories;
}

export const getCareerPrepStudentsCardView = async (): Promise<CareerPrepJobseekerCardViewDTO[] | null> => {
    try {
        const data = await prisma.careerPrepAssessment.findMany({
            select: selectCareerPrepStudentCardView,
        });
        devLog('career prep card view', data)
        // Transform the data to match the CareerPrepJobseekerCardViewDTO structure
        const transformedData: CareerPrepJobseekerCardViewDTO[] = data.map(item => ({
            firstName: item.Jobseeker?.users?.first_name || '',
            lastName: item.Jobseeker?.users?.last_name || '',
            pronouns: item.pronouns,
            careerPrepTrack: item.Jobseeker.careerPrepTrackRecommendation as CareerPrepTrack,
            careerPrepAssessmentDate: item.assessmentDate,
            careerPrepEnrollmentStatus: item.CaseMgmt?.prepEnrollmentStatus as CareerPrepStatus,
            careerPrepExpectedEndDate: item.CaseMgmt?.prepExpectedEndDate || null,
            expectedEduCompletion: item.expectedEduCompletion as TimeUntilCompletion,
            assignedPool: item.Jobseeker?.assignedPool as PoolCategories || '',
        }));
        return transformedData
    } catch (e) {
        console.error("Error fetching career prep students card view:", e);
        return null;
    } finally {
        prisma.$disconnect()
    }
}


export const getCareerPrepStudentsDetailView = async(jobseekerId: string)=> {
    try {
        const data = await prisma.careerPrepAssessment.findUnique({
            where: {
                jobseekerId: jobseekerId,
            },
            select: selectCareerPrepStudentDetailView
        })
    } catch (e) {

    } finally {
        prisma.$disconnect();
    }
}

/**
 * Select statement to retrieve data for Career Prep Student Card.
 * It contains various properties to to collect data for CareerPrepJobseekerCardViewDTO[].
 */
const selectCareerPrepStudentCardView = {
    // initial table CareerPrepAssessment
    pronouns: true,
    assessmentDate: true,
    expectedEduCompletion: true,
    CaseMgmt: {
        select: {
            prepEnrollmentStatus: true,
            prepExpectedEndDate: true,
        }
    },
    Jobseeker: {
        select: {
            assignedPool: true,
            careerPrepTrackRecommendation: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                }
            }
        }
    }
}

/**
 * Updates the career preparation status card view for a specific jobseeker.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom the status card view is being updated.
 * @param {CareerPrepStatus} status - The new career preparation status to be updated. Pass 'null' if not changing.
 * @param {Date} expectedEndDate - The expected end date for the current status. Pass 'null' if not changing.
 * @returns An object containing the updated status and expected end date.
 */
export const updateCareerPrepStatusCardView = async (jobseekerId: string, status?: CareerPrepStatus, expectedEndDate?: Date)=> {
    const session = await auth();
    try {
        const data = await prisma.careerPrepAssessment.findUnique({
            where: {
                jobseekerId: jobseekerId
            },
            select: selectCareerPrepStudentCardView
        })
        const studentStatus = await prisma.caseMgmt.upsert({
          where: {
            jobseekerId: jobseekerId,
          },
          update: {
              ...(status ? { prepEnrollmentStatus: status } : {}),
              ...(expectedEndDate ? { expectedEndDate: expectedEndDate } : {}),
          },
          create: {
            ...(status ? { prepEnrollmentStatus: status } : {prepEnrollmentStatus: CareerPrepStatus.Applied}),
            ...(expectedEndDate ? { expectedEndDate: expectedEndDate } : {}),
            careerPrepTrack: data?.Jobseeker.careerPrepTrackRecommendation!,
            CareerPrepAssessment: {
              connect: {
                jobseekerId: jobseekerId,
              },
            },
            CaseManager: {
              connect: {
                id: session?.user.id!,
              },
            },
          },
        });
        return {  status: studentStatus.prepEnrollmentStatus, prepExpectedEndDate: studentStatus.prepExpectedEndDate }
    } catch (e) {

    } finally {
        prisma.$disconnect()
    }
}


/**
 * Select statement to retrieve Career Prep student details.
 * Accessed through prisma.careerPrepAssessment model.
 */
const selectCareerPrepStudentDetailView = {
    jobseekerId: true,
    assessmentDate: true,
    pronouns: true,
    expectedEduCompletion: true,
    experienceWithApplying: true,
    experienceWithInterview: true,
    CaseMgmt: {
        select: {
            prepEnrollmentStatus: true,
            prepStartDate: true,
            prepExpectedEndDate: true,
        }
    },
    jobseeker: {
        select: {
            highest_level_of_study_completed: true,
            portfolio_url: true,
            linkedin_url: true,
            assignedPool: true,
            careerPrepTrackRecommendation: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                    email:true,
                }

            },
            pathways: {
                select: {
                    pathway_title: true,
                }
            },
            jobseeker_education: {
                select: {
                    edLevel: true,
                    enrollmentStatus: true,
                    eduProviders: {
                        select: {
                            name: true,
                        }
                    },
                    program: {
                        select: {
                            title: true,
                        }
                    }
                }
            },
            certificates: {
                select: {
                    name: true,
                    status: true,
                }

            }
        }
    }
}

/**
 * Represents the detailed view of a jobseeker in the Career Prep program.
 * @interface CareerPrepJobseekerDetailViewDTO
 */
export interface CareerPrepJobseekerDetailViewDTO {
    jobseekerId: string;
    assessmentDate: Date;
    careerPrepEnrollmentStatus: CareerPrepStatus
    careerPrepStartDate: string;
    careerPrepExpectedEndDate: string;
    firstName: string;
    lastName: string;
    pronouns: string;
    emailAddress: string;
    pathway: string;
    education: HighestCompletedEducationLevel;
    eduProviders: PartnerTrainingProvider[];
    expectedEduCompletion: TimeUntilCompletion;
    technicalCertificates: Partial<certificates & TechCertificateStatus>[];
    // resume: omitted but will be retrieved with blob storage function call getResumeUrl().
    // coverLetter: omitted but will be retrieved with blob storage function call getCoverLetterUrl().
    portfolio: string; // URL
    linkedin: string; // URL
    applicationExperience: boolean;
    interviewExperience: boolean;
    poolAssignment: PoolCategories;
}

/**
 * Interface representing a partner training provider.
 * @interface
 */
export interface PartnerTrainingProvider { // TODO: Discuss with Bethany. Consolidate degree and nondegree
    partnerTrainingProvider: string;
    trainingProgramTitle: string;
    educationLevel: EducationLevel; // differentiate between degree and nondegree education/training
    status: ProgramEnrollmentStatus;
}

/**
 * Represents a data transfer object (DTO) for a meeting entity.
 *
 * @property {string} id - The unique identifier for the meeting.
 * @property {string} caseMgmtId - The case management ID associated with the meeting.
 * @property {string} attendee - The full name of the jobseeker attending the meeting.
 * @property {string} meetingTitle - The title of the meeting.
 * @property {string} [meetingAgenda] - An optional agenda for the meeting. This could be in a rich text format.
 * @property {Date} meetingDatetime - The date and time at which the meeting will occur.
 * @property {string} duration - The duration of the meeting, represented in the format HH:mm:ss.
 * @property {string} createdBy - The full name of the case manager who created the meeting.
 * @property {Date} createdAt - The date and time when the meeting was created.
 * @property {string} updatedBy - The full name of the person who last updated the meeting details.
 * @property {Date} updatedAt - The date and time when the meeting was last updated.
 */
export interface MeetingDTO {
    id: string; // VARCHAR(38), primary key
    caseMgmtId: string; // CHAR(38)
    attendee: string; // jobseeker full name
    meetingTitle: string; // VARCHAR(45)
    meetingAgenda?: string; // TEXT (Rich text functionality. Possibly utilize Quill)
    meetingDatetime: Date; // DATETIME
    duration: string; // TIME represented as "HH:mm:ss"
    createdBy: string; // case manager full name
    createdAt: Date; // DATETIME
    updatedBy: string; // full name of updater
    updatedAt: Date; // DATETIME
}

/**
 * Represents the different types of notes that can be associated with a task or event.
 * - Meeting: Note associated with a specific meeting
 * - Review: Note associated with review for case manager tracking
 * - Follow-up: follow-up notes for case manager
 * @enum {string}
 */
export enum NoteType {
    MEETING = 'Meeting',
    REVIEW = 'Review',
    FOLLOWUP='Follow-up'
}

/**
 * Represents a note that can be associated with a case management ID.
 *
 * @property {string} id - The unique identifier for the note.
 * @property {string} caseMgmtId - The case management ID associated with the note.
 * @property {NoteType} noteType - The type of the note.
 * @property {Date} [date] - An optional date associated with the note.
 * @property {string} createdBy - The full name of the case manager who created the note.
 * @property {Date} createdAt - The date and time the note was created.
 * @property {string} updatedBy - The full name of the case manager who last updated the note.
 * @property {Date} updatedAt - The date and time the note was last updated.
 * @property {string} noteContent - The content of the note, potentially using rich text formatting (e.g., Quill).
 */
export interface Note {
    id: string; // VARCHAR(38)
    caseMgmtId: string; // VARCHAR(38)
    meetingId?: string // VARCHAR(38)
    noteType: NoteType;
    date?: Date // if needs associated with a date that is not the same as creation date.
    createdBy: string; // case manager full name
    createdAt: Date // DATETIME
    updatedBy: string // full name of updater
    updatedAt: Date; // DATETIME
    noteContent: string; // TEXT (Rich text functionality. Possibly utilize Quill)
}

/**
 * Represents a data transfer object for Career Prep Skills Assessment information.
 */
export type CareerPrepSkillsAssessmentDTO = {
    jobseekerId: string; // Unique identifier for the user completing the form
    basicInformation: {
        firstName: string;
        lastName: string;
        pronouns: string;
        expectedEduCompletion: TimeUntilCompletion; // how many months until completing education program
    };
    workExperienceAndMaterials: {
        hasWorkExperience: boolean; // technical or non-technical work experience
        hasResume: boolean; // will use getResumeUrl(userId) to confirm
        // resumeLink?: string; // open link with getResumeUrl(userId)
        hasPortfolio: boolean; // check jobseekers.portfolioUrl
        portfolioLink?: string; // Optional, only if 'hasPortfolio' is true
        hasCoverLetter: boolean; // will use getCoverLetter(userId) to confirm
        // coverLetterLink?: string; // open link with getCoverLetter(userId)
        hasLinkedInProfile: boolean; // check jobseekers.linkedInUrl
        linkedInLink?: string; // use value in jobseekers.linkedInUrl
        hasTechApplicationExperience: boolean;
        hasInterviewExperience: boolean;
    };
    technicalSelfAssessment: {
        interestPathway: TechPathways;
        skillRatings: {
            cybersecurity?: CybersecuritySkills;
            dataAnalytics?: DataAnalyticsSkills;
            itAndCloudComputing?: ITAndCloudComputingSkills;
            softwareDevelopment?: SoftwareDevelopmentSkills;
        };
    };
    durableSkills: DurableSkillsRatings;
    professionalBrandingAndJobMarketReadiness: ProfessionalBrandingRatings;
};

export enum TechPathways {
    Cybersecurity = "Cybersecurity",
    DataAnalytics = "Data Analytics",
    ITCloudComputing = "IT & Cloud Computing",
    SoftwareDevelopment = "Software Development"
}

// Define specific DTOs for skill categories
export type CybersecuritySkills = {
    networking: SkillProficiency;
    projectManagement: SkillProficiency;
    securityTools: SkillProficiency;
    operatingSystems: SkillProficiency;
    programming: SkillProficiency;
    cryptography: SkillProficiency;
    cloudSecurity: SkillProficiency;
    incidentResponse: SkillProficiency;
    dataSecurity: SkillProficiency;
    computationalThinking: SkillProficiency;
    apiUsage: SkillProficiency;
};

export type DataAnalyticsSkills = {
    dataAnalysis: SkillProficiency;
    sqlProgramming: SkillProficiency;
    pythonPackages: SkillProficiency;
    dataScience: SkillProficiency;
    dataEngineering: SkillProficiency;
    tableau: SkillProficiency;
    machineLearning: SkillProficiency;
    rProgramming: SkillProficiency;
    projectManagement: SkillProficiency;
    dataVisualization: SkillProficiency;
    dataStructures: SkillProficiency;
    bigOComplexity: SkillProficiency;
    sortingAlgorithms: SkillProficiency;
    databases: SkillProficiency;
    computationalThinking: SkillProficiency;
};

export type ITAndCloudComputingSkills = {
    techSupport: SkillProficiency;
    activeDirectory: SkillProficiency;
    projectManagement: SkillProficiency;
    helpDeskSupport: SkillProficiency;
    windowsServers: SkillProficiency;
    sqlProgramming: SkillProficiency;
    computerHardware: SkillProficiency;
    operatingSystems: SkillProficiency;
    systemAdmin: SkillProficiency;
    networkAdmin: SkillProficiency;
    virtualization: SkillProficiency;
    coreCloudServices: SkillProficiency;
    apiUsage: SkillProficiency;
    httpResponseCodes: SkillProficiency;
    computationalThinking: SkillProficiency;
};

export type SoftwareDevelopmentSkills = {
    softwareEngineering: SkillProficiency;
    softwareDevelopmentLifecycle: SkillProficiency;
    programmingLanguages: SkillProficiency;
    dataStructuresAndAlgorithms: SkillProficiency;
    softwareArchitecture: SkillProficiency;
    versionControl: SkillProficiency;
    databaseManagement: SkillProficiency;
    devOps: SkillProficiency;
    cloudComputing: SkillProficiency;
    conceptualSystemsThinking: SkillProficiency;
    problemSolving: SkillProficiency;
    fundamentalCodingConcepts: SkillProficiency;
    debugging: SkillProficiency;
    computationalThinking: SkillProficiency;
    softwareOptimization: SkillProficiency;
};

export type DurableSkillsRatings = {
    emotionManagement: SkillLevel;
    empathy: SkillLevel;
    goalSetting: SkillLevel;
    timeManagement: SkillLevel;
    adaptability: SkillLevel;
    criticalThinking: SkillLevel;
    creativity: SkillLevel;
    resilience: SkillLevel;
    communication: SkillLevel;
    activeListening: SkillLevel;
    conflictResolution: SkillLevel;
    nonverbalCommunication: SkillLevel;
    teamwork: SkillLevel;
    trustBuilding: SkillLevel;
    leadership: SkillLevel;
    perspectiveTaking: SkillLevel;
    culturalAwareness: SkillLevel;
    relationshipBuilding: SkillLevel;
    documentationSkills: SkillLevel;
};

// Enum for durable skill levels
export enum SkillLevel {
    NeedsImprovement = "Needs Improvement",
    Developing = "Developing",
    Fair = "Fair",
    Good = "Good",
    Exceptional = "Exceptional",
}

export type ProfessionalBrandingRatings = {
    personalBrand: AgreementLevel;
    onlinePresence: AgreementLevel;
    elevatorPitch: AgreementLevel;
    resumeEffectiveness: AgreementLevel;
    coverLetterEffectiveness: AgreementLevel;
    interviewExperience: AgreementLevel;
    responseTechnique: AgreementLevel;
    followUpImportance: AgreementLevel;
    onlineNetworking: AgreementLevel;
    eventNetworking: AgreementLevel;
    relationshipManagement: AgreementLevel;
    jobSearchStrategy: AgreementLevel;
    materialDistribution: AgreementLevel;
    networkingTechniques: AgreementLevel;
    onboardingBestPractices: AgreementLevel;
    developmentPlan: AgreementLevel;
    mentorship: AgreementLevel;
};

// Enum for agreement levels
export enum AgreementLevel {
    StronglyDisagree = "Strongly Disagree",
    Disagree = "Disagree",
    Neutral = "Neutral",
    Agree = "Agree",
    StronglyAgree = "Strongly Agree",
}

// Enum for skill proficiency levels
export enum SkillProficiency {
    NotProficient = "Not Proficient",
    Novice = "Novice",
    AdvancedBeginner = "Advanced Beginner",
    Competent = "Competent",
    Proficient = "Proficient",
}
