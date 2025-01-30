"use client";
import Avatar from "../Avatar";
import Skills from "../Skills";
import { useSession } from "next-auth/react";
import { Role } from "@/data/dtos/UserInfoDTO";
import Bookmark from "../Bookmark";
import PillButton from "@/app/ui/components/PillButton";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";
import { Chip, Stack } from "@mui/material";
import "quill/dist/quill.snow.css";

function extractTextFromHTML(htmlString: string) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;

  // Add spaces between block-level elements
  const blockElements = tempElement.querySelectorAll(
    "p, div, h1, h2, h3, h4, h5, h6, li",
  );
  blockElements.forEach((element) => {
    element.insertAdjacentText("afterend", " ");
  });

  // Get the text content and normalize spaces
  let text = tempElement.textContent || tempElement.innerText || "";

  // Replace multiple spaces, newlines, and tabs with a single space
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

export default function JobListingCardView({
  joblisting,
}: {
  joblisting: JobListingCardViewDTO;
}) {
  const { data: session } = useSession();

  const job_title: string = joblisting?.job_title;
  const employment_type: string = joblisting.employment_type ?? "";
  const company_name: string = joblisting.companies.company_name;
  const company_image: string = joblisting.companies.company_logo_url ?? "";
  const skills: SkillDTO[] = joblisting.skills ?? [];
  const salary_range: string = joblisting?.salary_range ?? "";
  const description: string = extractTextFromHTML(
    joblisting?.job_description ?? "",
  );
  const location: string =
    joblisting?.location +
    ", " +
    joblisting?.company_addresses?.locationData?.city +
    ", " +
    joblisting?.zip;
  const isBookmarked = joblisting?.isBookmarked ?? false;
  const isJobseeker = session?.user.roles.includes(Role.JOBSEEKER);

  console.log(joblisting?.job_description);
  return (
    <>
      <div className="w-full rounded-lg border-2 border-cyan-600 p-2 phone:p-4">
        {/* top row */}
        <div className="flex flex-row items-center">
          {/* picture */}
          <div className="shrink-0">{<Avatar imgsrc={company_image} />}</div>
          {/* name and location */}
          {/* TODO: This should link to the company's page so the jobseeker or whoever can see other postings by that company and other details */}
          <div className="grow pl-2 sm-tablet:pl-4">
            <p className="text-wrap font-bold">{job_title}</p>
            <p className="text-wrap text-sm sm-tablet:text-base">
              {company_name}
            </p>
            <p className="text-wrap text-sm text-slate-400 sm-tablet:text-base">
              {location}
            </p>
          </div>

          {/* view and bookmark */}
          <div className="flex flex-col">
            <div className="h-min w-max">
              <PillButton
                // onClick={() => handleModalChange(true)}
                href={`/services/joblistings/${joblisting.job_posting_id}`}
                target="_blank"
                variant="outlined"
              >
                <strong>View Job</strong>
              </PillButton>
            </div>
            <div className="mr-2 mt-2 flex flex-row place-self-end text-cyan-600">
              {isJobseeker ? (
                <Bookmark
                  bookmarked={isBookmarked}
                  addUrl={
                    "/api/joblistings/bookmark/add/" + joblisting.job_posting_id
                  }
                  removeUrl={
                    "/api/joblistings/bookmark/remove/" +
                    joblisting.job_posting_id
                  }
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-2">
          {/* job description */}

          <p className="ql-editor line-clamp-3 break-words">{description}</p>

          {/* skills */}
          <div className="mt-2 flex grow text-sm tablet:text-base">
            <Skills
              skillsList={skills}
              maxNumSkills={5}
              jobseekerID={undefined}
            />
          </div>

          {/* employment type, salary, and job status */}
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <div>
              <h4 className="mt-2 text-sm italic text-slate-400">
                {employment_type}
              </h4>
              <h4 className="mt-2 text-sm italic text-slate-400">
                {salary_range}
              </h4>
            </div>
            {isJobseeker && (
              <Chip
                variant="outlined"
                color="primary"
                sx={{ alignSelf: "end" }}
                label={
                  joblisting.jobStatus == undefined ||
                  joblisting.jobStatus.toString() == ""
                    ? "Not Applied"
                    : joblisting.jobStatus
                }
              />
            )}
          </Stack>
        </div>
      </div>
    </>
  );
}
