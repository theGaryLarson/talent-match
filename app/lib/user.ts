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
      },
      select: {
        id: true,
        role: true,
        first_name: true,
        last_name: true,
        email: true,
        photo_url: true,
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
    };

    return result;
  } catch (e: any) {
    throw new Error(`Failed to read jobseeker skills: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
