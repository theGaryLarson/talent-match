import { setPresreenedStatus } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: { jobseekerId: string; prescreened: boolean } = await req.json();
  const res = await setPresreenedStatus(body.jobseekerId, body.prescreened);
  if (res) {
    return NextResponse.json(res);
  } else {
    return NextResponse.json({ Message: "failed" }, { status: 500 });
  }
}
