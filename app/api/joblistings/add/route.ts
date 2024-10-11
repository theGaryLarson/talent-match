import { createJobListingWithSkills } from "@/app/lib/joblistings";
import { JobListingDTO } from "@/data/dtos/JobListingDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body: JobListingDTO = await req.json();

    // Log the parsed body
    console.log('Request body:', body);
    let result = await createJobListingWithSkills(body)
  return NextResponse.json(result);
}