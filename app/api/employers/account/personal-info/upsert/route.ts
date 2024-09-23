import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
import {
  PostEmployerPersonalDTO,
  ReadEmployerPersonalDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { formatPhoneE164 } from '@/app/lib/utils';
import { Role } from '@/data/dtos/UserInfoDTO';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
  try {
    const body: PostEmployerPersonalDTO = await request.json();
    const {
      userId,
      firstName,
      lastName,
      birthDate,
      email,
      phoneCountryCode,
      phone,
      photoUrl,
    } = body;

    const formattedPhone = formatPhoneE164(phoneCountryCode, phone);
    const upsertedUser = await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        first_name: firstName,
        last_name: lastName,
        birthdate: new Date(birthDate).toISOString(),
        email: email,
        phone: formattedPhone,
        photo_url: photoUrl,
        updatedAt: new Date(),
      },
      create: {
        id: userId,
        role: Role.EMPLOYER,
        first_name: firstName,
        last_name: lastName,
        birthdate: new Date(birthDate).toISOString(),
        email: email,
        phone: formattedPhone,
        gender: undefined,
        race: undefined,
        photo_url: photoUrl,
        createdAt: new Date(),
        is_marked_deletion: new Date().setDate(Date.now()+30).toString(),
      },
    });

    const result: ReadEmployerPersonalDTO = {
      userId: upsertedUser.id,
      firstName: upsertedUser.first_name,
      lastName: upsertedUser.last_name,
      birthDate: upsertedUser?.birthdate?.toISOString(),
      email: upsertedUser.email,
      phoneCountryCode: upsertedUser?.phone
        ? parsePhoneNumberFromString(upsertedUser.phone)?.countryCallingCode
        : null,
      phone: upsertedUser?.phone
        ? parsePhoneNumberFromString(upsertedUser.phone)?.number
        : null,
      gender: upsertedUser.gender,
      race: upsertedUser.race,
      photoUrl: upsertedUser.photo_url,
    };
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error('Error upserting employer:', e.message);
    return NextResponse.json(
      {
        error: `Failed to upsert employer personal information.\n${e.message}`,
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
