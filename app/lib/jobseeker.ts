import { auth } from '@/auth';
import {
  JobseekerPoolVars,
  selectJobseekerPoolCategory,
  SelectJobseekerPoolCatResult,
} from '@/app/lib/poolAssignment';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {
  edu_providers,
  jobseekers_education,
  ProjectExperiences,
  technology_areas,
  WorkExperience,
} from '@prisma/client';
import {
  educationRank,
  HighestCompletedEducationLevel,
  ProgramEnrollmentStatus,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { devLog } from '@/app/lib/utils';
import { NextResponse } from 'next/server';
import { Role } from '@/data/dtos/UserInfoDTO';
import { removeRoleFromUser } from '@/app/lib/user';

const prisma = getPrismaClient();

/**
 * Asynchronously aggregates jobseeker pool variables based on the provided jobseekerId.
 *
 * @param {string} jobseekerId - The unique identifier of the jobseeker.
 * @returns {Promise<JobseekerPoolVars>} - A Promise that resolves with the aggregated JobseekerPoolVars object.
 */
export const aggregateJobseekerPoolVars = async (
  jobseekerId: string,
): Promise<JobseekerPoolVars> => {
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
      jobseekers: {
        select: {
          careerPrepComplete: true,
        },
      },
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
        },
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
    careerPrepComplete: education.jobseekers?.careerPrepComplete ?? false,
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
const updatePool = async (
  jobseekerId: string,
  poolCategoryResult: SelectJobseekerPoolCatResult,
): Promise<void> => {
  await prisma.jobseekers.update({
    where: {
      jobseeker_id: jobseekerId,
    },
    data: {
      assignedPool: poolCategoryResult.poolAssignment,
      careerPrepTrackRecommendation:
        poolCategoryResult.careerPrepTrackRecommendation,
    },
  });
};
export const setPool = async (): Promise<NextResponse | void> => {
  const session = await auth();
  const jobseekerId =
    session?.user?.jobseekerId || '6EA3CEEC-AB0E-4460-9014-0259BECAEF1D';
  try {
    await prisma.$transaction(async () => {
      const poolVars = await aggregateJobseekerPoolVars(jobseekerId);
      const categoryOutput = selectJobseekerPoolCategory(poolVars);
      await updatePool(jobseekerId, categoryOutput);
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: `Failed to set jobseeker pool.\n${e.message} ` },
      { status: 500 },
    );
  } finally {
    prisma.$disconnect();
  }
};

/**
 * Delete a jobseeker and associated data from the database.
 * If the jobseeker is a coalition member, perform a soft delete by marking deletion date.
 * If the jobseeker is not a coalition member, delete all related data to avoid foreign key constraints.
 * Check if the user has other roles and delete the user if no other roles exist.
 * If the user has other roles, update the user's role field to remove the jobseeker role.
 *
 * @param {string} userId - The ID of the user associated with the jobseeker to be deleted.
 * @returns {Promise<void>}
 */
export const deleteJobseeker = async (userId: string): Promise<void> => {
  // Find the jobseeker by userId
  const jobseeker = await prisma.jobseekers.findUnique({
    where: { user_id: userId },
  });
  if (!jobseeker) {
    throw new Error('Jobseeker not found');
  }

  const jobseeker_id = jobseeker.jobseeker_id;

  // Check if any EduProvider is a coalition member
  const coalitionMemberExists = await prisma.jobseekers_education.findFirst({
    where: {
      jobseekerId: jobseeker_id,
      eduProviders: {
        isCoalitionMember: true,
      },
    },
  });

  if (coalitionMemberExists) {
    // Perform soft delete
    await prisma.jobseekers.update({
      where: { jobseeker_id: jobseeker_id },
      data: { is_marked_deletion: new Date() }, // TODO: set out cron job to delete users from db far enough to ensure grant reporting data is submitted.
    });
  } else {
    // Delete related data in order to avoid foreign key constraints

    // First, get project IDs associated with the jobseeker
    const projects = await prisma.projectExperiences.findMany({
      where: { jobseekerId: jobseeker_id },
      select: { projectId: true },
    });
    const projectIds = projects.map((p: ProjectExperiences) => p.projectId);

    await prisma.$transaction([
      prisma.jobseeker_has_skills.deleteMany({ where: { jobseeker_id } }),
      prisma.certificates.deleteMany({ where: { jobSeekerId: jobseeker_id } }),
      prisma.jobseekers_private_data.deleteMany({ where: { jobseeker_id } }),
      prisma.learner_proj_based_tech_assessment.deleteMany({
        where: { jobseeker_id },
      }),
      prisma.project_has_skills.deleteMany({
        where: {
          proj_exp_id: { in: projectIds },
        },
      }),
      prisma.projectExperiences.deleteMany({
        where: { jobseekerId: jobseeker_id },
      }),
      prisma.workExperience.deleteMany({
        where: { jobseekerId: jobseeker_id },
      }),
      prisma.jobseekers_education.deleteMany({
        where: { jobseekerId: jobseeker_id },
      }),
      prisma.case_mgmt.deleteMany({ where: { jobseekerId: jobseeker_id } }),
      prisma.bookmarkedJobseeker.deleteMany({
        where: { jobseekerId: jobseeker_id },
      }),
      prisma.bookmarkedJobPosting.deleteMany({
        where: { jobseekerId: jobseeker_id },
      }),
      prisma.jobseekers.delete({ where: { jobseeker_id: jobseeker_id } }),
    ]);

    // Check if User has other roles
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true, // returns string -> comma separated list of roles
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Split the comma-separated list of roles and check for specific roles
    const userRolesArray: Role[] = user.roles
      .split(',')
      .map((role: Role) => role);

    // Get all roles from the Role enum
    const allRoles: Role[] = Object.values(Role);

    // Check if any of the roles in userRolesArray match a defined role in the Role enum
    const hasOtherRoles = userRolesArray.some((role: Role) =>
      allRoles.includes(role),
    );

    if (!hasOtherRoles) {
      // Delete User
      await prisma.user.delete({ where: { id: userId } });
    } else {
      // Update User's role field
      await removeRoleFromUser(userId, Role.JOBSEEKER);
    }
  }
};
