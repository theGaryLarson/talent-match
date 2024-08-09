import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    ReadCompanyTestimonialsDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: { params: { testimonialId: string } }) {
    try {
        const testimonialId = params.testimonialId;

        if (!testimonialId) {
            return NextResponse.json({success: false, error: `A uuidv4 testimonialId is required.`}, {status: 400})
        }
        const deletedTestimonial = await prisma.company_testimonials.delete({
            where: {
                testimonial_id: testimonialId,
            }
        });


        const result: ReadCompanyTestimonialsDTO = {
            testimonyId: deletedTestimonial.testimonial_id,
            companyId: deletedTestimonial.company_id,
            employerId: deletedTestimonial.employer_id,
            text: deletedTestimonial.text,
            author: deletedTestimonial.author,
        }
        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error deleting company testimonial:', e.message);
        return NextResponse.json({error: `Failed to delete company testimonial.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}