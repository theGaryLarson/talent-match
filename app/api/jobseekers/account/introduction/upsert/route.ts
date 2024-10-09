import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  JsIntroDTO,
  JsIntroPostDTO,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { auth } from '@/auth';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
  try {
    // Get essentials from session, not the request
    let session = await auth();
    const userId: string = session?.user.id!;
    const jobseekerId: string = session?.user.jobseekerId!;

    const body: JsIntroPostDTO = await request.json();

    // Destructure the DTO
    const {
      photoUrl,
      firstName,
      lastName,
      birthDate,
      phoneCountryCode,
      phone,
      zipCode,
      email,
      introHeadline,
      currentJobTitle,
      resumeUrl,
    } = body;

    // const formattedPhone = formatPhoneE164(phoneCountryCode, phone);

    const result = await prisma.$transaction(async (prisma) => {
      // Upsert user
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {
          first_name: firstName,
          last_name: lastName,
          birthdate: birthDate ?? undefined,
          phoneCountryCode: phoneCountryCode,
          phone: phone,
          email: email,
          photo_url: photoUrl,
          locationData: {
            connect: {
              zip: zipCode,
            },
          },
          updatedAt: new Date(),
        },
        create: {
          id: userId,
          role: 'Jobseeker',
          first_name: firstName,
          last_name: lastName,
          birthdate: birthDate ?? undefined,
          phoneCountryCode: phoneCountryCode,
          phone: phone ?? undefined,
          email: email,
          gender: undefined,
          race: undefined,
          photo_url: photoUrl,
          createdAt: new Date(),
          updatedAt: undefined,
          emailVerified: undefined,
        },
        include: {
          locationData: true,
        },
      });

      // Upsert jobseeker
      // Find the jobseeker_id or generate a new one
      const js = await prisma.jobseekers.findUnique({
        where: { user_id: userId },
        select: {
          jobseeker_id: true,
          targeted_pathway: true,
          is_enrolled_ed_program: true,
        },
      });

      const isEnrolledInCollege = js?.is_enrolled_ed_program || false;

      const jobseeker = await prisma.jobseekers.upsert({
        where: { user_id: user.id },
        update: {
          intro_headline: introHeadline,
          current_job_title: currentJobTitle,
          resume_url: resumeUrl,
          users: {
            connect: {
              id: userId,
            },
          },
        },
        create: {
          jobseeker_id: jobseekerId,
          users: {
            connect: {
              id: userId,
            },
          },
          targeted_pathway: undefined,
          is_enrolled_ed_program: isEnrolledInCollege,
          highest_level_of_study_completed: undefined,
          current_grade_level: undefined,
          current_enrolled_ed_program: undefined,
          intern_hours_required: undefined,
          intro_headline: introHeadline, // TODO: remove and add to Showcase route
          current_job_title: currentJobTitle,
          resume_url: resumeUrl,
          years_work_exp: undefined,
          portfolio_url: undefined,
          video_url: undefined,
          employment_type_sought: undefined,
        },
      });

      const loadIntroPage: JsIntroDTO = {
        userId: user.id,
        photoUrl: user.photo_url,
        firstName: user.first_name,
        lastName: user.last_name,
        birthDate: user.birthdate,
        phoneCountryCode: user.phoneCountryCode,
        phone: user.phone ?? '',
        zipCode: user.locationData?.zip,
        state: user.locationData?.stateCode,
        city: user.locationData?.city,
        county: user.locationData?.county,
        email: user.email,
        introHeadline: jobseeker.intro_headline,
        currentJobTitle: jobseeker.current_job_title,
        resumeUrl: jobseeker?.resume_url ?? null,
      };

      const meta = {
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        pathwayId: jobseeker.targeted_pathway,
        jobseekerId: jobseeker.jobseeker_id,
        isMarkedDeletion: jobseeker.is_marked_deletion,
      };
      return { loadIntroPage, meta };
    });
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
