import { deleteJobListing } from "@/app/lib/joblistings";
import { createJobListingWithSkills } from "@/app/lib/joblistings";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  console.log("Delete: ", params.id);
  return NextResponse.json(await deleteJobListing(params.id));
}
