"use client";
import Avatar from "../Avatar";
import Skills from "../Skills";
import { useSession } from "next-auth/react";
import { Role } from "@/data/dtos/UserInfoDTO";
import Bookmark from "../Bookmark";
import PillButton from "@/app/ui/components/PillButton";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";
import { Card, Grid2, Stack, Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";
import ApplyToJobButton from "./ApplyToJobButton";

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
  const company_name: string = joblisting.companies.company_name;
  const company_image: string | undefined =
    joblisting.companies.company_logo_url ?? undefined;
  const skills: SkillDTO[] = joblisting.skills ?? [];
  const salary_range: string = joblisting?.salary_range ?? "";
  const description: string = extractTextFromHTML(
    joblisting?.job_description ?? "",
  );
  const isBookmarked = joblisting?.isBookmarked ?? false;
  const isJobseeker = session?.user.roles.includes(Role.JOBSEEKER);

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "12px",
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
          {company_image && (
            <div className="shrink-0">{<Avatar imgsrc={company_image} />}</div>
          )}
          <Typography sx={{ color: "rgba(25, 25, 25, 0.60)", fontWeight: 500 }}>
            {company_name}
          </Typography>
        </Stack>
        {isJobseeker ? (
          <Bookmark
            bookmarked={isBookmarked}
            addUrl={
              "/api/joblistings/bookmark/add/" + joblisting.job_posting_id
            }
            removeUrl={
              "/api/joblistings/bookmark/remove/" + joblisting.job_posting_id
            }
          />
        ) : (
          ""
        )}
      </Stack>
      <Typography variant="h5" sx={{ my: 1 }}>
        {job_title}
      </Typography>
      <Grid2 container columnSpacing={2} sx={{ alignItems: "center" }}>
        <Typography>{joblisting?.location}</Typography>
        <Circle sx={{ fontSize: 8 }} />
        <Typography>{joblisting?.employment_type}</Typography>
        <Circle sx={{ fontSize: 8 }} />
        <Typography>
          {joblisting?.company_addresses?.locationData.city}
        </Typography>
        <Circle sx={{ fontSize: 8 }} />
        <Typography>{joblisting?.is_paid ? salary_range : "unpaid"}</Typography>
        <Circle sx={{ fontSize: 8 }} />
        <Typography>
          Deadline:{" "}
          {joblisting?.unpublish_date?.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Grid2>
      <Typography sx={{ mt: 1 }}>{description}</Typography>
      {skills.length > 0 && (
        <Grid2 container sx={{ mt: 1 }}>
          <Skills skillsList={skills} maxNumSkills={5} />
        </Grid2>
      )}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 2, justifyContent: "flex-end" }}
      >
        <PillButton
          href={`/services/joblistings/${joblisting.job_posting_id}`}
          target="_blank"
          variant="outlined"
        >
          View job posting
        </PillButton>
        <ApplyToJobButton
          id={joblisting.job_posting_id}
          appliedStatus={joblisting.jobStatus}
        />
      </Stack>
    </Card>
  );
}
