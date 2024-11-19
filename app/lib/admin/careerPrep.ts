import { Prisma, PrismaClient } from '@prisma/client';
import {
  EducationLevel,
  HighestCompletedEducationLevel,
  ProgramEnrollmentStatus,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { CareerPrepTrack, PoolCategories } from '@/app/lib/poolAssignment';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { auth } from '@/auth';
import { devLog } from '@/app/lib/utils';
import TransactionClient = Prisma.TransactionClient;

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
  NA = 'N/A',
  ZeroToThreeMonths = '0-3 months',
  ThreeToSixMonths = '3-6 months',
  SixToNineMonths = '6-9 months',
  NineToTwelveMonths = '9-12 months',
  TwelvePlusMonths = '12+ months',
}

/**
 * Represents the status of a technical certificate.
 * - NA: Not Applicable
 * - InProgress: Certificate is in progress
 * - Obtained: Certificate has been obtained
 */
export enum TechCertificateStatus {
  NA = 'N/A',
  InProgress = 'In Progress',
  Obtained = 'Obtained',
}

/**
 * Enum representing the different status options for a career preparation process.
 * @enum {string}
 */
export enum CareerPrepStatus {
  Applied = 'Applied', // submitting assessment will be Applied
  CreatingPlan = 'Creating Plan',
  MeetingScheduled = 'Meeting Scheduled',
  MetCareerNavigator = 'Met Career Navigator',
  SentEnrollmentForm = 'Sent Enrollment Form',
  Enrolled = 'Enrolled',
  Completed = 'Completed',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn', // additional option from what was given.
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
  studentDetail?: CareerPrepJobseekerDetailViewDTO;
  generalNotes: NoteDTO[] | null; // will filter notes by NoteType on backend
  meetingNotes: NoteDTO[] | null;
  followUpNotes: NoteDTO[] | null;
}

/**
 * Retrieves a summary of career preparation information for a specific jobseeker.
 * Including student details and notes filtered by NoteType
 * @param {string} jobseekerId - The ID of the jobseeker to retrieve information for
 * @returns {Promise<StudentSummary | null>} A Promise that resolves to a StudentSummary object
 */
export const getCareerPrepStudentSummary = async (
  jobseekerId: string,
): Promise<StudentSummary | null> => {
  const studentDetail = await getCareerPrepStudentDetailView(jobseekerId);
  const notes = await getCareerPrepStudentNotes(jobseekerId);
  // Handle error case for student detail
  if (!studentDetail.success) {
    console.error(studentDetail.error);
    return null;
  }

  return {
    studentDetail: studentDetail.data,
    generalNotes: notes.generalNotes,
    meetingNotes: notes.meetingNotes,
    followUpNotes: notes.followUpNotes,
  };
};

/**
 * Interface representing a data transfer object for Jobseeker Card View in Career Prep module.
 * @interface CareerPrepJobseekerCardViewDTO
 */
export interface CareerPrepJobseekerCardViewDTO {
  jobseekerId: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  careerPrepTrack: CareerPrepTrack | null;
  careerPrepAssessmentDate: Date;
  careerPrepEnrollmentStatus: CareerPrepStatus;
  careerPrepExpectedEndDate: Date | null;
  expectedEduCompletion: TimeUntilCompletion;
  assignedPool: PoolCategories;
  // techAssessmentAvg: number;
  // durableSkillAssessmentAvg: number;
  // brandingAssessmentAvg: number;
}

export const getCareerPrepStudentsCardView = async (): Promise<
  CareerPrepJobseekerCardViewDTO[] | null
> => {
  try {
    const data = await prisma.careerPrepAssessment.findMany({
      select: selectCareerPrepStudentCardView,
    });
    devLog('career prep card view', data);
    // Transform the data to match the CareerPrepJobseekerCardViewDTO structure
    const transformedData: CareerPrepJobseekerCardViewDTO[] = data.map(
      (item) => ({
        jobseekerId: item.jobseekerId,
        firstName: item.Jobseeker?.users?.first_name || '',
        lastName: item.Jobseeker?.users?.last_name || '',
        pronouns: item.pronouns,
        careerPrepTrack: item.Jobseeker
          .careerPrepTrackRecommendation as CareerPrepTrack,
        careerPrepAssessmentDate: item.assessmentDate,
        careerPrepEnrollmentStatus: item.CaseMgmt
          ?.prepEnrollmentStatus as CareerPrepStatus,
        careerPrepExpectedEndDate: item.CaseMgmt?.prepExpectedEndDate || null,
        expectedEduCompletion:
          item.expectedEduCompletion as TimeUntilCompletion,
        assignedPool:
          (item.Jobseeker?.assignedPool as PoolCategories) ||
          PoolCategories.None,
      }),
    );
    return transformedData;
  } catch (e) {
    console.error('Error fetching career prep students card view:', e);
    return null;
  } finally {
    prisma.$disconnect();
  }
};

/**
 * Asynchronously retrieves a list of unmanaged Career Prep students.
 * Returns a Promise that resolves to an array of CareerPrepJobseekerCardViewDTO objects.
 *
 * The function queries the database to find Career Prep assessments that have not been assigned a Case Manager. It then transforms the data into a list of CareerPre
 *pJobseekerCardViewDTO objects containing relevant information about each student's career preparation status.
 *
 * @return {Promise<CareerPrepJobseekerCardViewDTO[]>} A Promise resolving to an array of CareerPrepJobseekerCardViewDTO objects representing unmanaged Career Prep students.
 */
export const getUnManagedCareerPrepStudents = async (): Promise<
  CareerPrepJobseekerCardViewDTO[]
> => {
  const assessmentsWithoutCaseMgmt = await prisma.careerPrepAssessment.findMany(
    {
      select: selectCareerPrepStudentCardView,
      where: {
        CaseMgmt: null,
      },
    },
  );
  const transformedData: CareerPrepJobseekerCardViewDTO[] =
    assessmentsWithoutCaseMgmt.map((item) => ({
      jobseekerId: item.jobseekerId,
      firstName: item.Jobseeker?.users?.first_name || '',
      lastName: item.Jobseeker?.users?.last_name || '',
      pronouns: item.pronouns,
      careerPrepTrack: item.Jobseeker
        .careerPrepTrackRecommendation as CareerPrepTrack,
      careerPrepAssessmentDate: item.assessmentDate,
      careerPrepEnrollmentStatus: item.CaseMgmt
        ?.prepEnrollmentStatus as CareerPrepStatus,
      careerPrepExpectedEndDate: item.CaseMgmt?.prepExpectedEndDate || null,
      expectedEduCompletion: item.expectedEduCompletion as TimeUntilCompletion,
      assignedPool:
        (item.Jobseeker?.assignedPool as PoolCategories) || PoolCategories.None,
    }));
  return transformedData;
};

/**
 * Assigns the authenticated user as the case manager for a specific jobseeker.
 *
 * @param {string} jobseekerId - The ID of the jobseeker to assign a case manager to.
 * @returns {Promise<{ success: true, status: 200 } | null>} A Promise that resolves to an object indicating the success status of the operation or null if an error occurs.
 */
export const selfAssignAsCaseManager = async (
  jobseekerId: string,
): Promise<{ success: boolean; status: number }> => {
  const session = await auth();
  try {
    const jobseekerAssessmentRecord = await prisma.caseMgmt.update({
      where: {
        jobseekerId: jobseekerId,
      },
      data: {
        CaseManager: {
          connect: {
            id: session?.user.id,
          },
        },
      },
    });
    return { success: true, status: 200 };
  } catch (e) {
    console.error('failed to assign case manager', e);
    return { success: false, status: 500 }
  }
};

export const getCareerPrepStudentDetailView = async (jobseekerId: string) => {
  try {
    const data = await prisma.careerPrepAssessment.findUnique({
      where: {
        jobseekerId: jobseekerId,
      },
      select: selectCareerPrepStudentDetailView,
    });
    if (!data) {
      return {
        success: false,
        error: 'Career Prep student not found.',
        status: 404,
      };
    }
    devLog('StudentDetailView', data);
    const transformedData: CareerPrepJobseekerDetailViewDTO = {
      jobseekerId: data.jobseekerId,
      assessmentDate: data.assessmentDate.toISOString(),
      careerPrepTrack: data.CaseMgmt?.careerPrepTrack as CareerPrepTrack,
      prepEnrollmentStatus: data.CaseMgmt
        ?.prepEnrollmentStatus as CareerPrepStatus,
      prepStartDate: data.CaseMgmt?.prepStartDate?.toISOString(),
      prepExpectedEndDate: data.CaseMgmt?.prepExpectedEndDate?.toISOString(),
      prepActualEndDate: data.CaseMgmt?.prepActualEndDate?.toISOString(),
      firstName: data.Jobseeker?.users?.first_name!,
      lastName: data.Jobseeker?.users?.last_name!,
      pronouns: data.pronouns,
      emailAddress: data.Jobseeker?.users.email!,
      pathway: data?.interestPathway ?? '',
      education: data.Jobseeker
        ?.highest_level_of_study_completed as HighestCompletedEducationLevel,
      eduProviders: data.Jobseeker?.jobseeker_education.map((edData) => ({
        partnerTrainingProvider: edData.eduProviders.name!,
        trainingProgramTitle: edData?.program?.title!,
        educationLevel: edData.edLevel as EducationLevel,
        status: edData.enrollmentStatus as ProgramEnrollmentStatus,
      })),
      expectedEduCompletion: data?.expectedEduCompletion as TimeUntilCompletion,
      technicalCertificates: data.Jobseeker?.certificates.map((cert) => ({
        name: cert.name,
      })),
      portfolio: data.Jobseeker?.portfolio_url ?? '',
      linkedin: data.Jobseeker?.linkedin_url ?? '',
      applicationExperience: data.experienceWithApplying,
      interviewExperience: data.experienceWithInterview,
      poolAssignment: data.Jobseeker?.assignedPool as PoolCategories,
    };
    return { success: true, data: transformedData };
  } catch (e) {
    console.error('Unable to retrieve student detail view', e);
    return {
      success: false,
      error: 'An unexpected error occurred',
      status: 500,
    };
  }
};

/**
 * Select statement to retrieve data for Career Prep Student Card.
 * It contains various properties to collect data for CareerPrepJobseekerCardViewDTO[].
 */
const selectCareerPrepStudentCardView /*: Prisma.CareerPrepAssessmentSelect*/ = {
    // initial table CareerPrepAssessment
    jobseekerId: true,
    pronouns: true,
    assessmentDate: true,
    expectedEduCompletion: true,
    CaseMgmt: {
      select: {
        prepEnrollmentStatus: true,
        prepExpectedEndDate: true,
      },
    },
    Jobseeker: {
      select: {
        assignedPool: true,
        careerPrepTrackRecommendation: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    },
  };

/**
 * Asynchronously updates the career preparation status card view for a job seeker.
 *
 * @param {string} jobseekerId - The unique identifier for the job seeker.
 * @param {CareerPrepStatus} [status] - The new career preparation status for the job seeker.
 *
 * @returns {Promise<{ status: CareerPrepStatus, expectedEndDate: Date | null } | null>} A promise that resolves with an object containing the updated status and expected end date, or
 * null if an error occurs.
 */
export const updateCareerPrepStatusCardView = async (
  jobseekerId: string,
  status?: CareerPrepStatus,
): Promise<{
  status: CareerPrepStatus;
  expectedEndDate: Date | null;
} | null> => {
  const session = await auth();
  try {
    const data = await prisma.careerPrepAssessment.findUnique({
      where: {
        jobseekerId: jobseekerId,
      },
      select: selectCareerPrepStudentCardView,
    });
    const studentStatus = await prisma.caseMgmt.upsert({
      where: {
        jobseekerId: jobseekerId,
      },
      update: {
        ...(status ? { prepEnrollmentStatus: status } : {}),
      },
      create: {
        ...(status
          ? { prepEnrollmentStatus: status }
          : { prepEnrollmentStatus: CareerPrepStatus.Applied }),
        careerPrepTrack: data?.Jobseeker.careerPrepTrackRecommendation!,
        PrepAssessment: {
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
    return {
      status: studentStatus.prepEnrollmentStatus as CareerPrepStatus,
      expectedEndDate: studentStatus.prepExpectedEndDate,
    };
  } catch (e) {
    console.error('Could not update student card view', e);
    return null;
  } finally {
    prisma.$disconnect();
  }
};

/**
 * Select statement to retrieve Career Prep student details.
 * Accessed through prisma.careerPrepAssessment model.
 */
const selectCareerPrepStudentDetailView /*: Prisma.CareerPrepAssessmentSelect*/ =
  {
    jobseekerId: true,
    assessmentDate: true,
    interestPathway: true,
    pronouns: true,
    expectedEduCompletion: true,
    experienceWithApplying: true,
    experienceWithInterview: true,
    CaseMgmt: {
      select: {
        prepEnrollmentStatus: true,
        prepStartDate: true,
        prepExpectedEndDate: true,
        prepActualEndDate: true,
        careerPrepTrack: true,
      },
    },
    Jobseeker: {
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
            email: true,
          },
        },
        jobseeker_education: {
          select: {
            edLevel: true,
            enrollmentStatus: true,
            eduProviders: {
              select: {
                name: true,
              },
            },
            program: {
              select: {
                title: true,
              },
            },
          },
        },
        certificates: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    },
  };

/**
 * Represents the detailed view of a jobseeker in the Career Prep program.
 * @interface CareerPrepJobseekerDetailViewDTO
 */
export interface CareerPrepJobseekerDetailViewDTO {
  jobseekerId: string;
  assessmentDate: string; //DateIsoString
  prepEnrollmentStatus: CareerPrepStatus;
  prepStartDate?: string; //DateIsoString
  careerPrepTrack: CareerPrepTrack;
  prepExpectedEndDate?: string; // DateIsoString System startDate + Track Length.
  prepActualEndDate?: string; // DateIsoString Entered manually
  firstName: string;
  lastName: string;
  pronouns: string;
  emailAddress: string;
  pathway: string;
  education: HighestCompletedEducationLevel;
  eduProviders?: PartnerTrainingProvider[];
  expectedEduCompletion: TimeUntilCompletion;
  technicalCertificates: { name: string }[]; // resume: omitted but will be retrieved with blob storage function call getResumeUrl().
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
export interface PartnerTrainingProvider {
  partnerTrainingProvider: string;
  trainingProgramTitle: string;
  educationLevel: EducationLevel; // differentiate between degree and nondegree education/training
  status: ProgramEnrollmentStatus;
}

// /**
//  * Represents a data transfer object (DTO) for a meeting entity.
//  *
//  * @property {string} id - The unique identifier for the meeting.
//  * @property {string} caseMgmtId - The case management ID associated with the meeting.
//  * @property {string} attendee - The full name of the jobseeker attending the meeting.
//  * @property {string} meetingTitle - The title of the meeting.
//  * @property {string} [meetingAgenda] - An optional agenda for the meeting. This could be in a rich text format.
//  * @property {Date} meetingDatetime - The date and time at which the meeting will occur.
//  * @property {string} duration - The duration of the meeting, represented in the format HH:mm:ss.
//  * @property {string} createdBy - The full name of the case manager who created the meeting.
//  * @property {Date} createdAt - The date and time when the meeting was created.
//  * @property {string} updatedBy - The full name of the person who last updated the meeting details.
//  * @property {Date} updatedAt - The date and time when the meeting was last updated.
//  */
// export interface MeetingDTO {
//     id: string; // VARCHAR(38), primary key
//     caseMgmtId: string; // CHAR(38)
//     attendee: string; // jobseeker full name
//     meetingTitle: string; // VARCHAR(45)
//     meetingAgenda?: string; // TEXT (Rich text functionality. Possibly utilize Quill)
//     meetingDatetime: Date; // DATETIME
//     duration: string; // TIME represented as "HH:mm:ss"
//     createdBy: string; // case manager full name
//     createdAt: Date; // DATETIME
//     updatedBy: string; // full name of updater
//     updatedAt: Date; // DATETIME
// }

export type NoteDTO = {
  id: string;
  jobseekerId: string;
  createdBy: string;
  noteType: NoteType;
  noteContent: string;
  createdAt: string;
  updatedAt: string;
  date?: string | null;
  authorName: string;
};

export type CategorizedNotes = {
  generalNotes: NoteDTO[];
  meetingNotes: NoteDTO[];
  followUpNotes: NoteDTO[];
};

/**
 * Fetches notes for a specific jobseeker based on the provided jobseekerId.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom notes need to be retrieved.
 * @return {Promise<NoteDTO[]>} - A promise that resolves to an array of NoteDTO objects representing the notes.
 */
export const getCareerPrepStudentNotes = async (
  jobseekerId: string,
): Promise<CategorizedNotes> => {
  const notes = await prisma.caseMgmtNotes.findMany({
    where: {
      jobseekerId: jobseekerId,
    },
    select: {
      id: true,
      jobseekerId: true,
      createdBy: true,
      noteType: true,
      noteContent: true,
      createdAt: true,
      updatedAt: true,
      date: true,
      Author: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Map notes to NoteDTO
  const flattenedNotes: NoteDTO[] = notes.map((note) => ({
    id: note.id,
    jobseekerId: note.jobseekerId,
    createdBy: note.createdBy,
    noteType: note.noteType as NoteType,
    noteContent: note.noteContent,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    date: note.date ? note.date.toISOString() : null,
    authorName:
      `${note.Author?.first_name || ''} ${note.Author?.last_name || ''}`.trim(),
  }));

  const sortedNotes: CategorizedNotes = {
    generalNotes: flattenedNotes.filter(
      (note) => note.noteType === NoteType.GENERAL,
    ),
    meetingNotes: flattenedNotes.filter(
      (note) => note.noteType === NoteType.MEETING,
    ),
    followUpNotes: flattenedNotes.filter(
      (note) => note.noteType === NoteType.FOLLOWUP,
    ),
  };
  return sortedNotes;
};

/**
 * Represents the different types of notes that can be associated with a task or event.
 * @enum {string}
 */
export enum NoteType {
  GENERAL = 'General', // for general purpose
  MEETING = 'Meeting', // associated with meetings
  FOLLOWUP = 'Follow-up', // communication notes
}

/**
 * Represents a data transfer object for Career Prep Skills Assessment information.
 */
export type CareerPrepSkillsAssessmentDTO = {
  jobseekerId: string; // Unique identifier for the user completing the form
  basicInformation: {
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
    experienceWithApplying: boolean;
    experienceWithInterviewing: boolean;
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

///////////////////////////////////////////////////
// DO NOT NEED CAN BE INFERRED FROM ACCOUNT INFO //
///////////////////////////////////////////////////
// export type jobseekerAccountDataDTO = {
//   interestPathway: TechPathways;
//   hasResume: boolean; // have to call getResumeUrl(session.user.id)
//   // resumeLink: (userId: string) => Promise<string | null>;
//   hasCoverLetter: boolean; // have to call getCoverLetter(session.user.id)
//   // coverLetterLink: (userId: string) => Promise<string | null>;
//   hasPortfolio: boolean;
//   portfolioLink: string | null;
//   hasLinkedInProfile: boolean;
//   linkedInLink: string | null;
// };
//
// export const getJobseekerAccountData = async (
//   jobseekerId: string,
// ): Promise<{
//   success: boolean;
//   data: jobseekerAccountDataDTO | null;
// }> => {
//   const jobseekerData = await prisma.jobseekers.findUnique({
//     where: {
//       jobseeker_id: jobseekerId,
//     },
//     include: {
//       pathways: true
//     }
//   });
//   if (!jobseekerData) {
//     return { success: false, data: null };
//   }
//   const userId = jobseekerData.user_id!;
//   const resumeLink = await getResumeUrl(userId);
//   const coverLetterLink = await getCoverLetterUrl(userId);
//   return {
//     success: true,
//     data: {
//       interestPathway: jobseekerData?.pathways?.pathway_title as TechPathways,
//       hasResume: resumeLink !== null,
//       // resumeLink: getResumeUrl,
//       hasCoverLetter: false, // Call similar function if available
//       // coverLetterLink:  getCoverLetterUrl, // Assign based on a function similar to getResumeUrl
//       hasPortfolio: !!jobseekerData.portfolio_url, // Set based on your criteria
//       portfolioLink: jobseekerData.portfolio_url, // Populate if portfolio link is available
//       hasLinkedInProfile: !!jobseekerData.linkedin_url, // Set based on your criteria
//       linkedInLink: jobseekerData.portfolio_url, // Populate if LinkedIn link is available
//     },
//   };
// };

/**
 * Submits a career preparation skills assessment with session data.
 *
 * @param {CareerPrepSkillsAssessmentDTO} data - The data of career preparation skills assessment to be submitted.
 */
export const submitCareerPrepAssessmentWithSession = async (
  data: CareerPrepSkillsAssessmentDTO,
): Promise<{ success: boolean; status: number } | null> => {
  const session = await auth();
  const jobseekerId = session?.user.jobseekerId;
  if (!jobseekerId) {
    console.error('No jobseeker id was provided from session data...');
    return null;
  }
  devLog('DTO', data);
  await submitCareerPrepAssessment(jobseekerId, data);
  return { success: true, status: 200 };
};
export const submitCareerPrepAssessment = async (
  jobseekerId: string,
  data: CareerPrepSkillsAssessmentDTO,
): Promise<{ success: boolean; status: number } | null> => {
  try {
    const result = await prisma.$transaction(async (prisma) => {

      const careerPrepAssessment = await upsertCareerPrepAssessment(
        prisma,
        jobseekerId,
        data,
      );

      const durableResponse =  await upsertDurableSkillRatings(
        prisma,
        jobseekerId,
        data.durableSkills,
      );

      const brandResponse = await upsertBrandRatings(
        prisma,
        jobseekerId,
        data.professionalBrandingAndJobMarketReadiness,
      );

      const assessmentResponse =  await upsertPathwayRatings(
        prisma,
        jobseekerId,
        data.technicalSelfAssessment,
      );

      // //TODO: determine case manager with least amount of assigned jobseekers
      await upsertUnassignedCaseMgmtRecord(prisma, jobseekerId);

      return { success: true, status: 200 };

    },
        {
          timeout: 10000, // Timeout in milliseconds (e.g., 10000 ms = 10 seconds)
    });
    devLog('result', result);
    return { success: true, status: 200 };
  } catch (e: any) {
    console.error('Failed to submit Career Prep Assessment records', e.message);
    return { success: false, status: 500 };
  }
};

/**
 * Asynchronously upserts a case management record for a specific jobseeker.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom the case management record will be upserted.
 * @returns {Promise<{ success: boolean, status: number }>} A promise that resolves with an object indicating the success and status of the upsert operation.
 */
const upsertUnassignedCaseMgmtRecord = async (
    prisma: TransactionClient,
    jobseekerId: string,
): Promise<{ success: boolean; status: number }> => {
  try {
    //get necessary info from jobseeker table
    const jobseeker = await prisma.jobseekers.findUnique({
      where: {
        jobseeker_id: jobseekerId,
      },
    });

    const caseMgmtEntry = await prisma.caseMgmt.upsert({
      where: {
        jobseekerId,
      },
      update: {
        PrepAssessment: {
          connect: {
            jobseekerId,
          },
        },
      },
      create: {
        prepEnrollmentStatus: CareerPrepStatus.Applied,
        careerPrepTrack: jobseeker?.careerPrepTrackRecommendation || null,
        PrepAssessment: {
          connect: {
            jobseekerId,
          },
        },
      },
    });
    return { success: true, status: 200 };
  } catch (e) {
    console.error('Failed to upsert Case Management record', e);
    return { success: false, status: 500 };
  }
};

/**
 * Upsert Professional Brand Ratings for a specific jobseeker.
 * @param {string} jobseekerId - The ID of the jobseeker to update ratings for.
 * @param {ProfessionalBrandingRatings} brand - The Professional Brand Ratings to upsert.
 * @returns {Promise<ProfessionalBrandingRatings | null>} - The updated Professional Brand Ratings or null if failed.
 */
const upsertBrandRatings = async (
  prisma: TransactionClient,
  jobseekerId: string,
  brand: ProfessionalBrandingRatings,
): Promise<{
  success: boolean;
  status: number;
}> => {
  try {
    const updatedBrandRatings = await prisma.brandingRating.upsert({
      where: {
        jobseekerId,
      },
      update: {
        personalBrand: brand.personalBrand,
        onlinePresence: brand.onlinePresence,
        elevatorPitch: brand.elevatorPitch,
        resumeEffectiveness: brand.resumeEffectiveness,
        coverLetterEffectiveness: brand.coverLetterEffectiveness,
        interviewExperience: brand.interviewExperience,
        responseTechnique: brand.responseTechnique,
        followUpImportance: brand.followUpImportance,
        onlineNetworking: brand.onlineNetworking,
        eventNetworking: brand.eventNetworking,
        relationshipManagement: brand.relationshipManagement,
        jobSearchStrategy: brand.jobSearchStrategy,
        materialDistribution: brand.materialDistribution,
        networkingTechniques: brand.networkingTechniques,
        onboardingBestPractices: brand.onboardingBestPractices,
        developmentPlan: brand.developmentPlan,
        mentorship: brand.mentorship,
      },
      create: {
        personalBrand: brand.personalBrand,
        onlinePresence: brand.onlinePresence,
        elevatorPitch: brand.elevatorPitch,
        resumeEffectiveness: brand.resumeEffectiveness,
        coverLetterEffectiveness: brand.coverLetterEffectiveness,
        interviewExperience: brand.interviewExperience,
        responseTechnique: brand.responseTechnique,
        followUpImportance: brand.followUpImportance,
        onlineNetworking: brand.onlineNetworking,
        eventNetworking: brand.eventNetworking,
        relationshipManagement: brand.relationshipManagement,
        jobSearchStrategy: brand.jobSearchStrategy,
        materialDistribution: brand.materialDistribution,
        networkingTechniques: brand.networkingTechniques,
        onboardingBestPractices: brand.onboardingBestPractices,
        developmentPlan: brand.developmentPlan,
        mentorship: brand.mentorship,
        PrepAssessment: {
          connect: {
            jobseekerId,
          },
        },
      },
    });
    const transformedData: ProfessionalBrandingRatings = {
      personalBrand: updatedBrandRatings.personalBrand as AgreementLevel,
      onlinePresence: updatedBrandRatings.onlinePresence as AgreementLevel,
      elevatorPitch: updatedBrandRatings.elevatorPitch as AgreementLevel,
      resumeEffectiveness:
        updatedBrandRatings.resumeEffectiveness as AgreementLevel,
      coverLetterEffectiveness:
        updatedBrandRatings.coverLetterEffectiveness as AgreementLevel,
      interviewExperience:
        updatedBrandRatings.interviewExperience as AgreementLevel,
      responseTechnique:
        updatedBrandRatings.responseTechnique as AgreementLevel,
      followUpImportance:
        updatedBrandRatings.followUpImportance as AgreementLevel,
      onlineNetworking: updatedBrandRatings.onlineNetworking as AgreementLevel,
      eventNetworking: updatedBrandRatings.eventNetworking as AgreementLevel,
      relationshipManagement:
        updatedBrandRatings.relationshipManagement as AgreementLevel,
      jobSearchStrategy:
        updatedBrandRatings.jobSearchStrategy as AgreementLevel,
      materialDistribution:
        updatedBrandRatings.materialDistribution as AgreementLevel,
      networkingTechniques:
        updatedBrandRatings.networkingTechniques as AgreementLevel,
      onboardingBestPractices:
        updatedBrandRatings.onboardingBestPractices as AgreementLevel,
      developmentPlan: updatedBrandRatings.developmentPlan as AgreementLevel,
      mentorship: updatedBrandRatings.mentorship as AgreementLevel,
    };
    return { success: true, status: 200 };
  } catch (e) {
    console.error('Failed to submit Professional Brand Ratings', e);
    return { success: false, status: 500 };
  }
};

const upsertCareerPrepAssessment = async (
  prisma: TransactionClient,
  jobseekerId: string,
  data: CareerPrepSkillsAssessmentDTO,
): Promise<{ success: boolean; status: number }> => {
  const assessmentData = await prisma.careerPrepAssessment.upsert({
    where: {
      jobseekerId: data.jobseekerId,
    },
    update: {
      pronouns: data.basicInformation.pronouns,
      expectedEduCompletion: data.basicInformation.expectedEduCompletion,
      experienceWithApplying:
        data.workExperienceAndMaterials.experienceWithApplying,
      experienceWithInterview:
        data.workExperienceAndMaterials.experienceWithInterviewing,
      prevWorkExperience: data.workExperienceAndMaterials.hasWorkExperience,
      interestPathway: data.technicalSelfAssessment.interestPathway,
    },
    create: {
      pronouns: data.basicInformation.pronouns,
      expectedEduCompletion: data.basicInformation.expectedEduCompletion,
      experienceWithApplying:
        data.workExperienceAndMaterials.experienceWithApplying,
      experienceWithInterview:
        data.workExperienceAndMaterials.experienceWithInterviewing,
      prevWorkExperience: data.workExperienceAndMaterials.hasWorkExperience,
      interestPathway: data.technicalSelfAssessment.interestPathway,
      Jobseeker: {
        connect: {
          jobseeker_id: jobseekerId,
        },
      },
    },
  });

  return { success: true, status: 200 };
};

/**
 * Upsert durable skill ratings for a specific jobseeker.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom the durable skill ratings are being upserted.
 * @param {CareerPrepSkillsAssessmentDTO['durableSkills']} softSkills - The durable skills ratings to be updated or created.
 *
 * @returns {Promise<DurableSkillsRatings | null>} - The updated durable skills ratings or null if an error occurs.
 */
const upsertDurableSkillRatings = async (
  prisma: TransactionClient,
  jobseekerId: string,
  softSkills: CareerPrepSkillsAssessmentDTO['durableSkills'],
): Promise<{ success: boolean; status: number }> => {
  try {
    const updatedDurableSkills = await prisma.durableSkillsRating.upsert({
      where: {
        jobseekerId,
      },
      update: {
        emotionManagement: softSkills.emotionManagement,
        empathy: softSkills.empathy,
        goalSetting: softSkills.goalSetting,
        timeManagement: softSkills.timeManagement,
        adaptability: softSkills.adaptability,
        criticalThinking: softSkills.criticalThinking,
        creativity: softSkills.creativity,
        resilience: softSkills.resilience,
        communication: softSkills.communication,
        activeListening: softSkills.activeListening,
        conflictResolution: softSkills.conflictResolution,
        nonverbalCommunication: softSkills.nonverbalCommunication,
        teamwork: softSkills.teamwork,
        trustBuilding: softSkills.trustBuilding,
        leadership: softSkills.leadership,
        perspectiveTaking: softSkills.perspectiveTaking,
        culturalAwareness: softSkills.culturalAwareness,
        relationshipBuilding: softSkills.relationshipBuilding,
        documentationSkills: softSkills.documentationSkills,
      },
      create: {
        emotionManagement: softSkills.emotionManagement,
        empathy: softSkills.empathy,
        goalSetting: softSkills.goalSetting,
        timeManagement: softSkills.timeManagement,
        adaptability: softSkills.adaptability,
        criticalThinking: softSkills.criticalThinking,
        creativity: softSkills.creativity,
        resilience: softSkills.resilience,
        communication: softSkills.communication,
        activeListening: softSkills.activeListening,
        conflictResolution: softSkills.conflictResolution,
        nonverbalCommunication: softSkills.nonverbalCommunication,
        teamwork: softSkills.teamwork,
        trustBuilding: softSkills.trustBuilding,
        leadership: softSkills.leadership,
        perspectiveTaking: softSkills.perspectiveTaking,
        culturalAwareness: softSkills.culturalAwareness,
        relationshipBuilding: softSkills.relationshipBuilding,
        documentationSkills: softSkills.documentationSkills,
        PrepAssessment: {
          connect: {
            jobseekerId,
          },
        },
      },
    });

    // Transforming data directly from the updatedDurableSkills object
    const transformedDurableSkills: DurableSkillsRatings = {
      emotionManagement: updatedDurableSkills.emotionManagement as SkillLevel,
      empathy: updatedDurableSkills.empathy as SkillLevel,
      goalSetting: updatedDurableSkills.goalSetting as SkillLevel,
      timeManagement: updatedDurableSkills.timeManagement as SkillLevel,
      adaptability: updatedDurableSkills.adaptability as SkillLevel,
      criticalThinking: updatedDurableSkills.criticalThinking as SkillLevel,
      creativity: updatedDurableSkills.creativity as SkillLevel,
      resilience: updatedDurableSkills.resilience as SkillLevel,
      communication: updatedDurableSkills.communication as SkillLevel,
      activeListening: updatedDurableSkills.activeListening as SkillLevel,
      conflictResolution: updatedDurableSkills.conflictResolution as SkillLevel,
      nonverbalCommunication:
        updatedDurableSkills.nonverbalCommunication as SkillLevel,
      teamwork: updatedDurableSkills.teamwork as SkillLevel,
      trustBuilding: updatedDurableSkills.trustBuilding as SkillLevel,
      leadership: updatedDurableSkills.leadership as SkillLevel,
      perspectiveTaking: updatedDurableSkills.perspectiveTaking as SkillLevel,
      culturalAwareness: updatedDurableSkills.culturalAwareness as SkillLevel,
      relationshipBuilding:
        updatedDurableSkills.relationshipBuilding as SkillLevel,
      documentationSkills:
        updatedDurableSkills.documentationSkills as SkillLevel,
    };

    return { success: true, status: 200 };
  } catch (e) {
    console.error('Error in upsertDurableSkills:', e);
    return { success: false, status: 500 };
  }
};

/**
 * Upsert pathway skills for a jobseeker based on their technical self-assessment.
 * @param {string} jobseekerId - The ID of the jobseeker
 * @param {CareerPrepSkillsAssessmentDTO["technicalSelfAssessment"]} techAssessment - The technical self-assessment data
 */
const upsertPathwayRatings = async (
  prisma: TransactionClient,
  jobseekerId: string,
  techAssessment: CareerPrepSkillsAssessmentDTO['technicalSelfAssessment'],
): Promise<{ success: boolean; status: number }> => {
  switch (techAssessment.interestPathway) {
    case TechPathways.DATA_ANALYTICS:
      await prisma.dataAnalyticsRating.upsert({
        where: { jobseekerId },
        update: {
          ...techAssessment.skillRatings?.dataAnalytics,
        },
        create: {
          ...techAssessment.skillRatings?.dataAnalytics!,
          PrepAssessment: {
            connect: {
              jobseekerId,
            },
          },
        },
      });
      break;

    case TechPathways.CYBERSECURITY:
      await prisma.cybersecurityRating.upsert({
        where: { jobseekerId },
        update: {
          ...techAssessment.skillRatings?.cybersecurity,
        },
        create: {
          ...techAssessment.skillRatings?.cybersecurity!,
          PrepAssessment: {
            connect: {
              jobseekerId,
            },
          },
        },
      });
      break;

    case TechPathways.IT_CLOUD_COMPUTING:
      await prisma.iTCloudRating.upsert({
        where: { jobseekerId },
        update: {
          ...techAssessment.skillRatings.itAndCloudComputing,
        },
        create: {
          ...techAssessment.skillRatings.itAndCloudComputing!,

          PrepAssessment: {
            connect: {
              jobseekerId,
            },
          },
        },
      });
      break;

    case TechPathways.SOFTWARE_DEVELOPMENT:
      await prisma.softwareDevRating.upsert({
        where: { jobseekerId },
        update: {
          ...techAssessment.skillRatings?.softwareDevelopment,
          // softwareEngineering:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareEngineering,
          // softwareDevelopmentLifecycle:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareDevelopmentLifecycle,
          // programmingLanguages:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.programmingLanguages,
          // dataStructuresAndAlgorithms:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.dataStructuresAndAlgorithms,
          // softwareArchitecture:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareArchitecture,
          // versionControl:
          //   techAssessment.skillRatings?.softwareDevelopment?.versionControl,
          // databaseManagement:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.databaseManagement,
          // devOps: techAssessment.skillRatings?.softwareDevelopment?.devOps,
          // cloudComputing:
          //   techAssessment.skillRatings?.softwareDevelopment?.cloudComputing,
          // conceptualSystemsThinking:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.conceptualSystemsThinking,
          // problemSolving:
          //   techAssessment.skillRatings?.softwareDevelopment?.problemSolving,
          // fundamentalCodingConcepts:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.fundamentalCodingConcepts,
          // debugging:
          //   techAssessment.skillRatings?.softwareDevelopment?.debugging,
          // computationalThinking:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.computationalThinking,
          // softwareOptimization:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareOptimization,
        },
        create: {
          ...techAssessment.skillRatings?.softwareDevelopment!,
          // softwareEngineering:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareEngineering!,
          // softwareDevelopmentLifecycle:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareDevelopmentLifecycle!,
          // programmingLanguages:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.programmingLanguages!,
          // dataStructuresAndAlgorithms:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.dataStructuresAndAlgorithms!,
          // softwareArchitecture:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareArchitecture!,
          // versionControl:
          //   techAssessment.skillRatings?.softwareDevelopment?.versionControl!,
          // databaseManagement:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.databaseManagement!,
          // devOps: techAssessment.skillRatings?.softwareDevelopment?.devOps!,
          // cloudComputing:
          //   techAssessment.skillRatings?.softwareDevelopment?.cloudComputing!,
          // conceptualSystemsThinking:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.conceptualSystemsThinking!,
          // problemSolving:
          //   techAssessment.skillRatings?.softwareDevelopment?.problemSolving!,
          // fundamentalCodingConcepts:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.fundamentalCodingConcepts!,
          // debugging:
          //   techAssessment.skillRatings?.softwareDevelopment?.debugging!,
          // computationalThinking:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.computationalThinking!,
          // softwareOptimization:
          //   techAssessment.skillRatings?.softwareDevelopment
          //     ?.softwareOptimization!,
          PrepAssessment: {
            connect: {
              jobseekerId,
            },
          },
        },
      });
      break;

    default:
      throw new Error(`Unsupported pathway: ${techAssessment.interestPathway}`);
  }
  return { success: true, status: 200 };
};

/**
 * Retrieves the technology ratings for a specific jobseeker based on the targeted pathway.
 * @param {string} jobseekerId - The ID of the jobseeker.
 * @param {TechPathways} targetedPathway - The targeted technology pathway.
 * @returns {Promise<CybersecuritySkills | DataAnalyticsSkills | ITAndCloudComputingSkills | SoftwareDevelopmentSkills | null>} - The technology ratings based on the pathway.
 */
export const getTechRatings = async (
  jobseekerId: string,
  targetedPathway: TechPathways,
): Promise<
  | CybersecuritySkills
  | DataAnalyticsSkills
  | ITAndCloudComputingSkills
  | SoftwareDevelopmentSkills
  | null
> => {
  switch (targetedPathway) {
    case TechPathways.CYBERSECURITY:
      const cybersecurityData = await prisma.cybersecurityRating.findUnique({
        where: { jobseekerId },
      });
      return cybersecurityData
        ? {
            overallAverage: cybersecurityData.overallAverage,
            networking: cybersecurityData.networking,
            projectManagement: cybersecurityData.projectManagement,
            securityTools: cybersecurityData.securityTools,
            operatingSystems: cybersecurityData.operatingSystems,
            programming: cybersecurityData.programming,
            cryptography: cybersecurityData.cryptography,
            cloudSecurity: cybersecurityData.cloudSecurity,
            incidentResponse: cybersecurityData.incidentResponse,
            dataSecurity: cybersecurityData.dataSecurity,
            technicalSupport: cybersecurityData.technicalSupport,
            computationalThinking: cybersecurityData.computationalThinking,
            apiUsage: cybersecurityData.apiUsage,
          }
        : null;

    case TechPathways.DATA_ANALYTICS:
      const dataAnalyticsData = await prisma.dataAnalyticsRating.findUnique({
        where: { jobseekerId },
      });
      return dataAnalyticsData
        ? {
            overallAverage: dataAnalyticsData.overallAverage,
            dataAnalysis: dataAnalyticsData.dataAnalysis,
            sqlProgramming: dataAnalyticsData.sqlProgramming,
            pythonPackages: dataAnalyticsData.pythonPackages,
            dataScience: dataAnalyticsData.dataScience,
            dataEngineering: dataAnalyticsData.dataEngineering,
            tableau: dataAnalyticsData.tableau,
            machineLearning: dataAnalyticsData.machineLearning,
            rProgramming: dataAnalyticsData.rProgramming,
            projectManagement: dataAnalyticsData.projectManagement,
            dataVisualization: dataAnalyticsData.dataVisualization,
            dataStructures: dataAnalyticsData.dataStructures,
            bigOComplexity: dataAnalyticsData.bigOComplexity,
            sortingAlgorithms: dataAnalyticsData.sortingAlgorithms,
            databases: dataAnalyticsData.databases,
            computationalThinking: dataAnalyticsData.computationalThinking,
          }
        : null;

    case TechPathways.IT_CLOUD_COMPUTING:
      const itCloudData = await prisma.iTCloudRating.findUnique({
        where: { jobseekerId },
      });
      return itCloudData
        ? {
            overallAverage: itCloudData.overallAverage,
            techSupport: itCloudData.techSupport,
            activeDirectory: itCloudData.activeDirectory,
            projectManagement: itCloudData.projectManagement,
            helpDeskSupport: itCloudData.helpDeskSupport,
            windowsServers: itCloudData.windowsServers,
            sqlProgramming: itCloudData.sqlProgramming,
            computerHardware: itCloudData.computerHardware,
            operatingSystems: itCloudData.operatingSystems,
            systemAdmin: itCloudData.systemAdmin,
            networkAdmin: itCloudData.networkAdmin,
            virtualization: itCloudData.virtualization,
            coreCloudServices: itCloudData.coreCloudServices,
            apiUsage: itCloudData.apiUsage,
            httpResponseCodes: itCloudData.httpResponseCodes,
            computationalThinking: itCloudData.computationalThinking,
          }
        : null;

    case TechPathways.SOFTWARE_DEVELOPMENT:
      const softwareDevData = await prisma.softwareDevRating.findUnique({
        where: { jobseekerId },
      });
      return softwareDevData
        ? {
            overallAverage: softwareDevData.overallAverage,
            softwareEngineering: softwareDevData.softwareEngineering,
            softwareDevelopmentLifecycle:
              softwareDevData.softwareDevelopmentLifecycle,
            programmingLanguages: softwareDevData.programmingLanguages,
            dataStructuresAndAlgorithms:
              softwareDevData.dataStructuresAndAlgorithms,
            softwareArchitecture: softwareDevData.softwareArchitecture,
            versionControl: softwareDevData.versionControl,
            databaseManagement: softwareDevData.databaseManagement,
            devOps: softwareDevData.devOps,
            cloudComputing: softwareDevData.cloudComputing,
            conceptualSystemsThinking:
              softwareDevData.conceptualSystemsThinking,
            problemSolving: softwareDevData.problemSolving,
            fundamentalCodingConcepts:
              softwareDevData.fundamentalCodingConcepts,
            debugging: softwareDevData.debugging,
            computationalThinking: softwareDevData.computationalThinking,
            softwareOptimization: softwareDevData.softwareOptimization,
          }
        : null;

    default:
      throw new Error(`Unknown pathway: ${targetedPathway}`);
  }
};

/**
 * Retrieves durable skills ratings for a specific jobseeker.
 *
 * @param {string} jobseekerId - The unique identifier of the jobseeker.
 * @returns {Promise<DurableSkillsRatings | null>} - A promise that resolves with the durable skills ratings
 * object if found, or null if no data is found for the jobseeker.
 */
export const getDurableSkillRatings = async (
  jobseekerId: string,
): Promise<DurableSkillsRatings | null> => {
  const durableSkillsData = await prisma.durableSkillsRating.findUnique({
    where: {
      jobseekerId,
    },
  });

  return durableSkillsData
    ? {
        overallAverage: durableSkillsData.overallAverage,
        emotionManagement: durableSkillsData.emotionManagement,
        empathy: durableSkillsData.empathy,
        goalSetting: durableSkillsData.goalSetting,
        timeManagement: durableSkillsData.timeManagement,
        adaptability: durableSkillsData.adaptability,
        criticalThinking: durableSkillsData.criticalThinking,
        creativity: durableSkillsData.creativity,
        resilience: durableSkillsData.resilience,
        communication: durableSkillsData.communication,
        activeListening: durableSkillsData.activeListening,
        conflictResolution: durableSkillsData.conflictResolution,
        nonverbalCommunication: durableSkillsData.nonverbalCommunication,
        teamwork: durableSkillsData.teamwork,
        trustBuilding: durableSkillsData.trustBuilding,
        leadership: durableSkillsData.leadership,
        perspectiveTaking: durableSkillsData.perspectiveTaking,
        culturalAwareness: durableSkillsData.culturalAwareness,
        relationshipBuilding: durableSkillsData.relationshipBuilding,
        documentationSkills: durableSkillsData.documentationSkills,
      }
    : null;
};

/**
 * Asynchronously retrieves the branding ratings of a jobseeker.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom branding ratings are requested.
 * @returns {Promise<ProfessionalBrandingRatings | null>} A promise that resolves to the branding ratings of the jobseeker if found, otherwise null.
 */
export const getBrandingRatings = async (
  jobseekerId: string,
): Promise<ProfessionalBrandingRatings | null> => {
  const brandingData = await prisma.brandingRating.findUnique({
    where: {
      jobseekerId,
    },
  });

  return brandingData
    ? {
        overallAverage: brandingData.overallAverage,
        personalBrand: brandingData.personalBrand,
        onlinePresence: brandingData.onlinePresence,
        elevatorPitch: brandingData.elevatorPitch,
        resumeEffectiveness: brandingData.resumeEffectiveness,
        coverLetterEffectiveness: brandingData.coverLetterEffectiveness,
        interviewExperience: brandingData.interviewExperience,
        responseTechnique: brandingData.responseTechnique,
        followUpImportance: brandingData.followUpImportance,
        onlineNetworking: brandingData.onlineNetworking,
        eventNetworking: brandingData.eventNetworking,
        relationshipManagement: brandingData.relationshipManagement,
        jobSearchStrategy: brandingData.jobSearchStrategy,
        materialDistribution: brandingData.materialDistribution,
        networkingTechniques: brandingData.networkingTechniques,
        onboardingBestPractices: brandingData.onboardingBestPractices,
        developmentPlan: brandingData.developmentPlan,
        mentorship: brandingData.mentorship,
      }
    : null;
};

export enum TechPathways {
  CYBERSECURITY = 'Cybersecurity',
  DATA_ANALYTICS = 'Data Analytics',
  IT_CLOUD_COMPUTING = 'IT & Cloud Computing',
  SOFTWARE_DEVELOPMENT = 'Software Development',
}

// Define specific DTOs for skill categories
export type CybersecuritySkills = {
  overallAverage?: number | null;
  networking: SkillProficiency;
  projectManagement: SkillProficiency;
  securityTools: SkillProficiency;
  operatingSystems: SkillProficiency;
  programming: SkillProficiency;
  cryptography: SkillProficiency;
  cloudSecurity: SkillProficiency;
  incidentResponse: SkillProficiency;
  dataSecurity: SkillProficiency;
  technicalSupport: SkillProficiency;
  computationalThinking: SkillProficiency;
  apiUsage: SkillProficiency;
};

export type DataAnalyticsSkills = {
  overallAverage?: number | null;
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
  overallAverage?: number | null;
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
  overallAverage?: number | null;
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
  overallAverage?: number | null;
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

export type ProfessionalBrandingRatings = {
  overallAverage?: number | null;
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

export function getLabel<T extends number | string>(
  score: T,
  labels: Record<T, string>,
): string {
  return labels[score] || 'Unknown';
}

// Enum for agreement levels
export enum AgreementLevel {
  StronglyDisagree = 1,
  Disagree = 2,
  Neutral = 3,
  Agree = 4,
  StronglyAgree = 5,
}

export const AgreementLevelLabels: Record<AgreementLevel, string> = {
  [AgreementLevel.StronglyDisagree]: 'Strongly Disagree',
  [AgreementLevel.Disagree]: 'Disagree',
  [AgreementLevel.Neutral]: 'Neutral',
  [AgreementLevel.Agree]: 'Agree',
  [AgreementLevel.StronglyAgree]: 'Strongly Agree',
};

// Enum for skill proficiency levels
export enum SkillProficiency {
  NotProficient = 1,
  Novice = 2,
  AdvancedBeginner = 3,
  Competent = 4,
  Proficient = 5,
}

export const SkillProficiencyLabels: Record<SkillProficiency, string> = {
  [SkillProficiency.NotProficient]: 'Not Proficient',
  [SkillProficiency.Novice]: 'Novice',
  [SkillProficiency.AdvancedBeginner]: 'Advanced Beginner',
  [SkillProficiency.Competent]: 'Competent',
  [SkillProficiency.Proficient]: 'Proficient',
};

// Enum for durable skill levels
export enum SkillLevel {
  NeedsImprovement = 1,
  Developing = 2,
  Fair = 3,
  Good = 4,
  Exceptional = 5,
}

// Label mapping for user-friendly display
export const SkillLevelLabels: Record<SkillLevel, string> = {
  [SkillLevel.NeedsImprovement]: 'Needs Improvement',
  [SkillLevel.Developing]: 'Developing',
  [SkillLevel.Fair]: 'Fair',
  [SkillLevel.Good]: 'Good',
  [SkillLevel.Exceptional]: 'Exceptional',
};
