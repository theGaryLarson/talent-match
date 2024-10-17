import { deleteJobListing } from "@/app/lib/joblistings";
import { createJobListingWithSkills } from "@/app/lib/joblistings";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id:string } },
  ) {
    console.log("Delete: ", params.id)
    return NextResponse.json(await deleteJobListing(params.id));
}