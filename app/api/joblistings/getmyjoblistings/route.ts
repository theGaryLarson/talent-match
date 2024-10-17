import { createJobListingWithSkills, getMyJobListings } from "@/app/lib/joblistings";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    let results = await getMyJobListings()
  return NextResponse.json(results);;
}