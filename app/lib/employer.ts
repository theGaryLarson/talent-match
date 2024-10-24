import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { Role } from '@/data/dtos/UserInfoDTO'; // Adjust the import path for your Role enum

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
            const newRolesArray = userRolesArray.filter((role) => role !== Role.EMPLOYER);

            if (newRolesArray.length === 0) {
                // Delete the user if no roles are left
                await prisma.user.delete({ where: { id: userId } });
            } else {
                // Update the user's roles
                await prisma.user.update({
                    where: { id: userId },
                    data: { role: newRolesArray.join(',') },
                });
            }
        });
    } catch (error) {
        console.error('Error deleting employer:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

