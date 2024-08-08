import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    PostCompanyTestimonialsDTO,
    ReadCompanyTestimonialsDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function GET(request: Request, {params}: {params: {companyId: string}}) {
    try {
        const companyId = params.companyId;

        if (!companyId ) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400})
        }
        const companyTestimonial = await prisma.company_testimonials.findMany({
            where: {
                company_id: companyId,
            },

        });


        const result: ReadCompanyTestimonialsDTO[] = companyTestimonial.map(t => ({
            testimonyId: t.testimonial_id,
            companyId: t.company_id,
            employerId: t.employer_id,
            text: t.text,
            author: t.author,
        }));


        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error creating company testimonial:', e.message);
        return NextResponse.json({error: `Failed to create company testimonial.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}