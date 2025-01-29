import { NextResponse } from "next/server";
import { createJobseeker } from "@/app/lib/jobseeker";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const userId: string = session?.user.id!;
    const jobseekerData = await createJobseeker(userId);
    return NextResponse.json(
      {
        success: true,
        message: "Jobseeker created successfully.",
        jobseekerData,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create jobseeker." },
      { status: 500 },
    );
  }
}
