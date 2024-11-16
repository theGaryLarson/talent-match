import { addCareerPrepStudentNotes, CreateNoteDTO, NoteDTO } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body:CreateNoteDTO = await req.json()
    addCareerPrepStudentNotes(body.jobseekerId,body.noteContent,body.noteType)
    return NextResponse.json({});
}