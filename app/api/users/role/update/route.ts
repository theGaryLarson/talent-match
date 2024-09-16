import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { devLog, mapToEnum } from '@/app/lib/utils';
import { Role } from '@/data/dtos/UserInfoDTO';

const prisma: PrismaClient = getPrismaClient();

export async function PATCH(request: Request) {
  try {
    const body: { userId: string; role: Role } = await request.json();

    // Destructure the DTO
    const { userId, role } = body;

    const result = await prisma.$transaction(async (prisma) => {
      // Upsert user
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          role: mapToEnum(role, Role),
        },
      });

      return user;
    });
    devLog('ss-result', result);
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('Error creating job seeker intro:', error);
    return NextResponse.json(
      { error: 'Failed to create job seeker intro' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
