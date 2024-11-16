import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = getPrismaClient();
export async function numOfJobseekers() {
    return await prisma.jobseekers.count();
}
export async function numOfIndividualEmployers() {
    return await prisma.employers.count();
}