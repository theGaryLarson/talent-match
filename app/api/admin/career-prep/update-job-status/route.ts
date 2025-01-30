import { updateJobStatus } from "@/app/lib/admin/careerPrep";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import { NextResponse } from "next/server";
interface updateJobStatusData {
  newJobStatus: JobStatus;
  joinTableId: string;
}
export async function PATCH(req: Request) {
  const body: updateJobStatusData = await req.json();
  console.log("ded");
  const result = await updateJobStatus(body.newJobStatus, body.joinTableId);
  return NextResponse.json(result);
}
