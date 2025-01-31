import { selfAssignAsCaseManager } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: { jobseekerId: string } = await req.json();
  await selfAssignAsCaseManager(body.jobseekerId);
  return NextResponse.json({});
}
