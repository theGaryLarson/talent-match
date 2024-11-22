import { deleteCareerPrepStudentNotes } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id:string } },
  ) {
    console.log("Delete: ", params.id)
    
    return NextResponse.json(await deleteCareerPrepStudentNotes(params.id));
}