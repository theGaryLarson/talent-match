import { auth } from "@/auth";
import {
  JobseekerPoolVars,
  selectJobseekerPoolCategory,
  SelectJobseekerPoolCatResult,
} from "@/app/lib/poolAssignment";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  educationRank,
  HighestCompletedEducationLevel,
  ProgramEnrollmentStatus,
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { devLog } from "@/app/lib/utils";
import { Role } from "@/data/dtos/UserInfoDTO";
import { v4 as uuidv4 } from "uuid";

const prisma: PrismaClient = getPrismaClient();

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

  devLog("aggregated data:", { education, workExperience });

  // Evaluate the JobseekerPoolVars values based on the fetched data
  const jobseekerPoolVars: JobseekerPoolVars = {
    enrolledWithPartner: education.some(
      (edu) =>
        edu.eduProviders?.isCoalitionMember &&
        edu.enrollmentStatus === ProgramEnrollmentStatus.Enrolled,
    ),
    //TODO: include jobseeker/signup value instead
    completedPartnerProgram: education.some(
      (edu) =>
        edu.eduProviders?.isCoalitionMember &&
        edu.enrollmentStatus === ProgramEnrollmentStatus.Graduated,
    ),
    prevTechExperience: workExperience.some(
      (exp) =>
        exp.techArea &&
        exp.techArea.title &&
        exp.techArea.title !== "N/A Not an IT role",
    ),
    hasDegreeOrTechProgram: education.some(
      (edu) =>
        educationRank[edu.degreeType as HighestCompletedEducationLevel] >=
        educationRank[HighestCompletedEducationLevel.Certificate],
    ),
    // TODO: store Career Prep program completion in database.
    careerPrepComplete: education.some(
      (edu) => edu.jobseekers?.careerPrepComplete ?? false,
    ),
  };

  devLog("Calculated Pool Vars\n", jobseekerPoolVars);

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

/**
 * Assigns a jobseeker session to a connection pool, if the user is authenticated.
 * @returns {Promise<NextResponse>} A promise that resolves to the next response after setting the pool with the session.
 */
export const setPoolWithSession = async (): Promise<void> => {
  const session = await auth();
  try {
    if (!session?.user?.jobseekerId) {
      throw new Error("No jobseeker id found in session");
    }
    const jobseekerId = session.user.jobseekerId;
    await setPool(jobseekerId);
  } catch (error: any) {
    console.error("Error setting jobseeker pool:", error);
    throw error;
  }
};

/**
 * Asynchronously sets the jobseeker pool for a given jobseeker ID.
 * This function aggregates jobseeker pool variables, selects the jobseeker pool category,
 * and updates the pool in the database.
 *
 * @param {string} jobseekerId - The ID of the jobseeker for whom the pool needs to be set.
 * @returns {Promise<NextResponse>} A Promise that resolves to a NextResponse object indicating the success or failure of setting the jobseeker pool.
 */
export const setPool = async (jobseekerId: string): Promise<void> => {
  try {
    await prisma.$transaction(async () => {
      const poolVars = await aggregateJobseekerPoolVars(jobseekerId);
      const categoryOutput = selectJobseekerPoolCategory(poolVars);
      await updatePool(jobseekerId, categoryOutput);
    });
  } catch (e: any) {
    // Log the error for debugging
    console.error("Error setting jobseeker pool:", e);
    throw new Error("Failed to set jobseeker pool. Please try again later.", e);
  } finally {
    prisma.$disconnect();
  }
};

export async function getPoolWithSession() {
  const session = await auth();

  try {
    if (session?.user.jobseekerId == null) {
      return;
    }
    const res = await prisma.jobseekers.findUnique({
      where: {
        jobseeker_id: session?.user.jobseekerId,
      },
      select: {
        assignedPool: true,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getCareerPrepAssementStatus() {
  try {
    const session = await auth();
    if (session?.user.jobseekerId == null) {
      return;
    }
    const res = await prisma.jobseekers.findUnique({
      where: {
        jobseeker_id: session?.user.jobseekerId,
      },
      select: {
        CareerPrepAssessment: {
          select: {
            assessmentDate: true,
          },
        },
      },
    });
    if (res == undefined) {
      return {
        CareerPrepAssessment: [],
      };
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Create a jobseeker (for an existing user) and associated data from the database.
 *
 * @param {string} userId - The ID of the user to become a jobseeker.
 * @param {object} checkboxes - {jobNotifications: boolean, opportunities: boolean, termsAgree: boolean}
 * @returns {Promise<jobseekers>}
 * @throws {Error} If user creation fails
 */
export async function createJobseeker(
  userId: string,
  checkboxes: {
    jobNotifications: boolean;
    opportunities: boolean;
    termsAgree: boolean;
  },
): Promise<Prisma.jobseekersGetPayload<object>> {
  const { jobNotifications, opportunities, termsAgree } = checkboxes;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: userId },
        data: {
          role: Role.JOBSEEKER,
          has_agreed_terms: termsAgree,
          sendCareerOpportunities: opportunities,
          sendNewJobPosts: jobNotifications,
          updatedAt: new Date(),
        },
      });

      const jobseeker = await prisma.jobseekers.create({
        data: {
          jobseeker_id: uuidv4(),
          user_id: userId,
          is_enrolled_ed_program: false,
          intern_hours_required: 0,
          careerPrepComplete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return jobseeker;
    });

    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors (e.g., unique constraint violations)
      if (error.code === "P2002") {
        throw new Error("A jobseeker profile already exists for this user");
      }
    }
    throw error;
  }
}

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
export const deleteJobseeker = async (userId: string) => {
  // Find the jobseeker by userId
  const jobseeker = await prisma.jobseekers.findUnique({
    where: { user_id: userId },
  });

  if (!jobseeker) {
    throw new Error("User associated with jobseeker id not found");
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
      data: { is_marked_deletion: new Date() },
    });
    return true;
  } else {
    try {
      // Start a transaction
      await prisma.$transaction(async (prisma) => {
        // Delete the jobseeker record
        await prisma.jobseekers.delete({ where: { user_id: userId } });

        // Fetch the user's roles
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            role: true, // Returns string -> comma-separated list of roles
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Split the comma-separated list of roles and check for specific roles
        const userRolesArray: Role[] = user.role
          .split(",")
          .map((role: string) => role.trim() as Role);

        // Remove the JOBSEEKER role
        const filteredRolesArray = userRolesArray.filter(
          (role) => role !== Role.JOBSEEKER,
        );

        if (filteredRolesArray.length === 0) {
          // Delete the user if no roles are left
          await prisma.user.delete({ where: { id: userId } });
        } else {
          // Update the user's roles
          await prisma.user.update({
            where: { id: userId },
            data: { role: filteredRolesArray.join(",") },
          });
        }
      });
      return true;
    } catch (error) {
      console.error("Error deleting jobseeker: ", error);
      return false;
    } finally {
      await prisma.$disconnect();
    }
  }
};

export const deleteJobseekerWithSession = async (): Promise<void> => {
  const session = await auth();
  try {
    const userId = session?.user.id;
    if (!userId) {
      throw new Error("User id not found in session. ");
    }
    await deleteJobseeker(userId);
  } catch (error: any) {
    console.error("Error deleting jobseeker with session:", error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
};
