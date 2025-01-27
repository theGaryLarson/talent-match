import { addCareerPrepStudentNotes, CreateNoteDTO } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body:CreateNoteDTO = await req.json()
    return NextResponse.json(await addCareerPrepStudentNotes(body.jobseekerId,body.noteContent,body.noteType, body.updatedDate??new Date()));
}