import { NextResponse } from "next/server";
import {
    CareerPrepSkillsAssessmentDTO,
    submitCareerPrepAssessmentWithSession,
} from "@/app/lib/admin/careerPrep";


export async function POST(request: Request) {
    const body: CareerPrepSkillsAssessmentDTO = await request.json()

    const result = await submitCareerPrepAssessmentWithSession(body);
    return NextResponse.json(result);
}