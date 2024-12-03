import { PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { Role } from '@/data/dtos/UserInfoDTO';
import { auth } from "@/auth";

const prisma: PrismaClient = getPrismaClient();

/**
 * Deletes an employer from the database based on the provided user ID.
 * This function starts a transaction to ensure data consistency and integrity.
 * It first deletes the employer record directly using the user ID.
 * Then it retrieves the user's roles, removes the EMPLOYER role if present,
 * and updates the user's roles accordingly. If the user has no roles left after removing EMPLOYER,
 * the user record is deleted as well.
 * If an error occurs during the process, it is logged and rethrown.
 * Finally, it disconnects from the Prisma client.
 * @param {string} userId - The unique identifier of the user whose employer record should be deleted.
 * @returns {Promise<void>} - A Promise that resolves when the employer is successfully deleted.
 */
export const deleteEmployer = async (userId: string): Promise<void> => {
    try {
        // Start a transaction
        await prisma.$transaction(async (prisma) => {

            // Delete the employer record directly using user_id
            await prisma.employers.delete({ where: { user_id: userId } });

            // Fetch the user's roles
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    role: true, // Returns string -> comma-separated list of roles
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Split the roles into an array
            const userRolesArray: Role[] = user.role
                .split(',')
                .map((role) => role.trim() as Role);

            // Remove the EMPLOYER role
            const filteredRolesArray = userRolesArray.filter((role) => role !== Role.EMPLOYER);

            if (filteredRolesArray.length === 0) {
                // Delete the user if no roles are left
                await prisma.user.delete({ where: { id: userId } });
            } else {
                // Update the user's roles
                await prisma.user.update({
                    where: { id: userId },
                    data: { role: filteredRolesArray.join(',') },
                });
            }
        });
    } catch (error: any) {
        console.error('Error deleting employer:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

/**
 * Deletes the employer associated with the current user session.
 *
 * This function first authenticates the user session to obtain the user ID.
 * If the user ID is not found in the session, an error is logged and an exception is thrown.
 * Then it attempts to delete the employer with the obtained user ID.
 * If an error occurs during the deletion process, the error is logged and rethrown.
 *
 * @returns {Promise<void>} A promise that resolves when the employer is successfully deleted.
 */
export const deleteEmployerWithSession = async (): Promise<void> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    console.error('No user id found in session. Could not delete employer');
    throw Error('No userId found in session. Could not delete employer');
  }
  try {
    await deleteEmployer(userId);
  } catch (error: any) {
    console.error('Error deleting employer with session:', error);
    throw error;
  }
};



export async function getAllCompanies() {
    const res = await prisma.companies.findMany();
    return res;
}


export async function getAllTechAreas(){
    const res = await prisma.technology_areas.findMany();
    return res;
}

export async function getAllIndustrySectors() {
    const res = await prisma.industry_sectors.findMany();
    return res;
}