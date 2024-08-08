import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    PostCompanyTestimonialsDTO,
    ReadCompanyTestimonialsDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: PostCompanyTestimonialsDTO = await request.json();
        const {
            companyId,
            employerId,
            text,
            author,
        } = body;

        if (!companyId || !employerId) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId and employerId is required.`}, {status: 400})
        }
        const companyTestimonial = await prisma.company_testimonials.create({
            data: {
                testimonial_id: uuidv4(),
                company_id: companyId,
                employer_id: employerId,
                text: text,
                author: author
            }
        });


        const result: ReadCompanyTestimonialsDTO = {
            testimonyId: companyTestimonial.testimonial_id,
            companyId: companyTestimonial.company_id,
            employerId: companyTestimonial.employer_id,
            text: companyTestimonial.text,
            author: companyTestimonial.author,
        }
        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error creating company testimonial:', e.message);
        return NextResponse.json({error: `Failed to create company testimonial.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}