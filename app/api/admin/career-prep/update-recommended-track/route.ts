import { updateAssignedTrack } from "@/app/lib/admin/careerPrep";
import { CareerPrepTrack } from "@/app/lib/poolAssignment";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body: { jobseekerId: string; track: CareerPrepTrack } =
    await request.json();
  if (!body.jobseekerId) {
    return NextResponse.json(
      { error: "jobseekerId is required." },
      { status: 400 },
    );
  }
  const data = await updateAssignedTrack(body.jobseekerId, body.track);
  return NextResponse.json(data);
}
