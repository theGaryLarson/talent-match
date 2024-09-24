// src/app/services/userService.ts
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO, ReadUserInfoDTO, Role } from '@/data/dtos/UserInfoDTO';
import { v4 as uuidv4 } from 'uuid';
import getPrismaClient from '@/app/lib/prismaClient.mjs';

const prisma: PrismaClient = getPrismaClient();

export async function createUser(
  userData: CreateUserDTO,
): Promise<ReadUserInfoDTO | null> {
  try {
    const { email, firstName, lastName, roles } = userData;

    const data = await prisma.user.create({
      data: {
        id: uuidv4(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: roles[0].toUpperCase().trim(), // fixme: modify database to handle multiple roles.
        createdAt: new Date(),
        is_marked_deletion: new Date(
          new Date().setDate(new Date().getDate() + 30),
        ), // marked for deletion 30 days from now
      },
      select: {
        id: true,
        role: true,
        first_name: true,
        last_name: true,
        email: true,
        photo_url: true,
        is_marked_deletion: true,
        jobseekers: {
          select: {
            jobseeker_id: true,
          },
        },
        employers: {
          select: {
            employer_id: true,
            company_id: true,
            is_verified_employee: true,
            companies: {
              select: {
                is_approved: true,
              },
            },
          },
        },
      },
    });

    if (!data?.id) {
      return null;
    }

    const responseRoles: Role[] = [];
    responseRoles.push(data.role.toUpperCase() as Role);

    const result: ReadUserInfoDTO = {
      userId: data.id,
      roles: responseRoles,
      firstName: data.first_name,
      lastName: data.last_name,
      email: email,
      image: data.photo_url || undefined,
      jobseekerId: data.jobseekers?.[0]?.jobseeker_id || null,
      employerId: data.employers?.[0]?.employer_id || null,
      companyId: data.employers?.[0]?.company_id || null,
      companyIsApproved: data.employers?.[0]?.companies?.is_approved || false,
      employeeIsApproved: data.employers?.[0]?.is_verified_employee || false,
      isMarkedDeletion: data.is_marked_deletion,
    };

    return result;
  } catch (e: any) {
    throw new Error(`Failed to create user record. ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserByEmail(
  email: string,
): Promise<ReadUserInfoDTO | null> {
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true,
        photo_url: true,
        is_marked_deletion: true,
        jobseekers: {
          select: {
            jobseeker_id: true,
          },
        },
        employers: {
          select: {
            employer_id: true,
            company_id: true,
            is_verified_employee: true,
            companies: {
              select: {
                is_approved: true,
              },
            },
          },
        },
      },
    });

    if (!data?.id) {
      return null;
    }

    const roles: Role[] = [];
    roles.push(data.role.toUpperCase() as Role);

    const result: ReadUserInfoDTO = {
      userId: data.id,
      roles: roles,
      firstName: data.first_name,
      lastName: data.last_name,
      email: email,
      image: data?.photo_url || undefined,
      jobseekerId: data.jobseekers?.[0]?.jobseeker_id || null,
      employerId: data.employers?.[0]?.employer_id || null,
      companyId: data.employers?.[0]?.company_id || null,
      companyIsApproved: data.employers?.[0]?.companies?.is_approved || false,
      employeeIsApproved: data.employers?.[0]?.is_verified_employee || false,
      isMarkedDeletion: data.is_marked_deletion,
    };

    return result;
  } catch (e: any) {
    throw new Error(`Failed to read jobseeker skills: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function clearUserDeletionFlag(
  userId: string,
): Promise<ReadUserInfoDTO | null> {
  // TODO: how to get session data server side
  //  ensure terms have been agreed to as well
  try {
    const data = await prisma.user.update({
      where: { id: userId },
      data: {
        updatedAt: new Date(),
        is_marked_deletion: null,// no longer marked for deletion
      },
      select: {
        id: true,
        role: true,
        first_name: true,
        last_name: true,
        email: true,
        photo_url: true,
        is_marked_deletion: true,
        jobseekers: {
          select: {
            jobseeker_id: true,
          },
        },
        employers: {
          select: {
            employer_id: true,
            company_id: true,
            is_verified_employee: true,
            companies: {
              select: {
                is_approved: true,
              },
            },
          },
        },
      },
    });

    if (!data?.id) {
      return null;
    }

    const responseRoles: Role[] = [];
    responseRoles.push(data.role.toUpperCase() as Role);

    const result: ReadUserInfoDTO = {
      userId: data.id,
      roles: responseRoles,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      image: data.photo_url || undefined,
      isMarkedDeletion: data.is_marked_deletion,
      jobseekerId: data.jobseekers?.[0]?.jobseeker_id || null,
      employerId: data.employers?.[0]?.employer_id || null,
      companyId: data.employers?.[0]?.company_id || null,
      companyIsApproved: data.employers?.[0]?.companies?.is_approved || false,
      employeeIsApproved: data.employers?.[0]?.is_verified_employee || false,
    };

    return result;
  } catch (e: any) {
    throw new Error(`Failed to create user record. ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
