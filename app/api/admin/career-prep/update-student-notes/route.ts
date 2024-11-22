import { addCareerPrepStudentNotes, CreateNoteDTO, updateCareerPrepStudentNotes, UpdateNoteDTO } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";
//
export async function POST(req:Request){
    const body:UpdateNoteDTO = await req.json()
    return NextResponse.json(await updateCareerPrepStudentNotes(body.noteId,body.noteContent,body.noteType,));
}