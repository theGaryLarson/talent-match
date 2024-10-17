import { auth } from '@/auth';
import { JobseekerPoolVars, SelectJobseekerPoolCatResult } from '@/app/lib/poolAssignment';
import { selectJobseekerPoolCategory } from '@/app/lib/poolAssignment';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {
  edu_providers,
  jobseekers_education,
  technology_areas,
  WorkExperience,
} from '@prisma/client';
import {
  educationRank,
  HighestCompletedEducationLevel,
  ProgramEnrollmentStatus,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { devLog } from '@/app/lib/utils';

const prisma = getPrismaClient();

/**
 * Asynchronously aggregates jobseeker pool variables based on the provided jobseekerId.
 *
 * @param {string} jobseekerId - The unique identifier of the jobseeker.
 * @returns {Promise<JobseekerPoolVars>} - A Promise that resolves with the aggregated JobseekerPoolVars object.
 */
export const aggregateJobseekerPoolVars = async (jobseekerId: string): Promise<JobseekerPoolVars> => {

  if (!jobseekerId) {
    throw new TypeError(
      `A uuidv4 jobseekerId is required which is not present in session data`,
    );
  }

  // Fetch jobseeker education and work experience details
  const education = await prisma.jobseekers_education.findMany({
    where: {
      jobseekerId: jobseekerId,
    },
    select: {
      enrollmentStatus: true,
      degreeType: true,
      eduProviders: {
        select: {
          isCoalitionMember: true, // Fetch isCoalitionMember flag
        },
      },
    },
  });

  const workExperience = await prisma.workExperience.findMany({
    where: {
      jobseekerId: jobseekerId,
    },
    select: {
      techArea: {
        select: {
          title: true,
        }
      },
    },
  });

  devLog('aggregated data:', { education, workExperience });

  // Evaluate the JobseekerPoolVars values based on the fetched data
  const jobseekerPoolVars: JobseekerPoolVars = {
    enrolledWithPartner: education.some(
      (edu: jobseekers_education & { eduProviders: edu_providers }) =>
        edu.eduProviders?.isCoalitionMember &&
        edu.enrollmentStatus === ProgramEnrollmentStatus.Enrolled,
    ),
    //TODO: include jobseeker/signup value instead
    completedPartnerProgram: education.some(
      (
        edu: jobseekers_education & {
          eduProviders: edu_providers;
        },
      ) =>
        edu.eduProviders?.isCoalitionMember &&
        edu.enrollmentStatus === ProgramEnrollmentStatus.Graduated,
    ),
    prevTechExperience: workExperience.some(
        (
            exp: WorkExperience & {
              techArea: technology_areas | null;
            },
        ) =>
            exp.techArea &&
            exp.techArea.title &&
            exp.techArea.title !== 'N/A Not an IT role',
    ),
    hasDegreeOrTechProgram: education.some(
      (edu: jobseekers_education) =>
        educationRank[edu.degreeType as HighestCompletedEducationLevel] >=
        educationRank[HighestCompletedEducationLevel.Certificate],
    ),
    // TODO: store Career Prep program completion in database.
    completeCareerPrep: false,
  };

  devLog('Calculated Pool Vars\n', jobseekerPoolVars);

  return jobseekerPoolVars;
};

/**
 * Updates the pool assignments for a jobseeker by unflagging the deletion of the assigned pools.
 *
 * @param {string} jobseekerId - The ID of the jobseeker.
 * @param {SelectJobseekerPoolCatResult} poolCategoryResult - The pool assignment details to update.
 * @returns {Promise<void>} - A Promise that resolves once the pool assignments are updated.
 */
const updatePoolUnflagDeletion = async (jobseekerId: string, poolCategoryResult: SelectJobseekerPoolCatResult) => {
  await prisma.jobseekers.update({
    where: {
      jobseeker_id: jobseekerId
    },
    data: {
      pool1: poolCategoryResult.poolAssignment.pool1,
      pool2: poolCategoryResult.poolAssignment.pool2,
      pool3: poolCategoryResult.poolAssignment.pool3,
      is_marked_deletion: null,
    }
  })
}
export const setPoolAndUnflagDeletion = async (): Promise<void> => {
  const session = await auth();
  const jobseekerId =  session?.user?.jobseekerId || '837DC4C1-2942-4E97-805A-80D198B86DBF'

  // await prisma.$transaction(async (prisma: PrismaClient) => {
    const poolVars = await aggregateJobseekerPoolVars(jobseekerId)
    const categoryOutput = selectJobseekerPoolCategory(poolVars);
    await updatePoolUnflagDeletion(jobseekerId, categoryOutput);
  // });
}

