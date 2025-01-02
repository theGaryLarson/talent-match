import { deleteCareerPrepStudentNotes } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, props: { params: Promise<{ id:string }> }) {
  const params = await props.params;
  console.log("Delete: ", params.id)

  return NextResponse.json(await deleteCareerPrepStudentNotes(params.id));
}