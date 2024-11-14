import { NextResponse } from "next/server";
import {
    CareerPrepSkillsAssessmentDTO,
    submitCareerPrepAssessmentWithSession,
} from "@/app/lib/admin/careerPrep";
import { auth } from '@/auth';


export async function POST(request: Request) {
    const body: CareerPrepSkillsAssessmentDTO = await request.json()

    const data = await submitCareerPrepAssessmentWithSession(body);
    return NextResponse.json(data);
}