import { NextResponse } from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import { ReadCompanyTestimonialsDTO } from "@/data/dtos/EmployerProfileCreationDTOs";
import { auth } from "@/auth";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(
  request: Request,
  props: { params: Promise<{ testimonialId: string }> },
) {
  const params = await props.params;
  try {
    // Get essentials from session, not the request
    const session = await auth();
    const employerId: string = session?.user.employerId!;
    const companyId: string | null | undefined = session?.user.companyId;

    const testimonialId = params.testimonialId;

    if (!companyId || !testimonialId) {
      return NextResponse.json(
        {
          success: false,
          error: `A uuidv4 companyId and testimonialId is required.`,
        },
        { status: 400 },
      );
    }
    if (!session?.user.employeeIsApproved) {
      return NextResponse.json(
        {
          success: false,
          error: `Employee needs to be approved to edit this company.`,
        },
        { status: 401 },
      );
    }

    const deletedTestimonial = await prisma.company_testimonials.delete({
      where: {
        testimonial_id: testimonialId,
        company_id: companyId,
        employer_id: employerId,
      },
    });

    const result: ReadCompanyTestimonialsDTO = {
      testimonyId: deletedTestimonial.testimonial_id,
      companyId: deletedTestimonial.company_id,
      employerId: deletedTestimonial.employer_id,
      text: deletedTestimonial.text,
      author: deletedTestimonial.author,
    };
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error("Error deleting company testimonial:", e.message);
    return NextResponse.json(
      { error: `Failed to delete company testimonial.\n${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
