import { addMeeting, CreateMeetingDTO } from "@/app/lib/admin/careerPrep";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body:CreateMeetingDTO = await request.json();
    let result = await addMeeting(body);
    return NextResponse.json(result);
}