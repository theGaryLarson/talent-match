"use client";
import Link from "next/link";
import DeleteJobPostingButton from "../jobPostings/DeleteJobPostingButton";
import { useEffect, useState } from "react";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";

const getDaysSince = (dateStr: string | Date): number => {
  try {
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) {
      console.error("Invalid date:", dateStr);
      return 0;
    }
    return Math.floor((Date.now() - d.getTime()) / 86400000);
  } catch (error) {
    console.error("Error calculating days since:", error);
    return 0;
  }
};

async function fetchMyJobListings(): Promise<any> {
  const response = await fetch("/api/joblistings/getmyjoblistings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default function EmployerRecentJobPosts() {
  const [joblistings, setJobListings] = useState<JobListingCardViewDTO[]>([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const myJobListings = await fetchMyJobListings();
        setJobListings(myJobListings);
      } catch (error) {
        console.error("Error fetching bookmarked jobs:", error);
      }
    };
    fetchJobListings();
  }, []);

  return (
    <div>
      <div className="text-xl font-medium leading-relaxed text-black/90">
        Recent Job Posts
      </div>
      <div className="gap-2 divide-y rounded-[10px] bg-white p-4 shadow">
        {joblistings.map((job) => (
          <SingleJobPost
            key={job.job_posting_id}
            job={job}
            days={getDaysSince(job.publish_date)}
          />
        ))}
        <AddJobLink />
      </div>
    </div>
  );
}

function SingleJobPost({
  job,
  days,
}: {
  job: JobListingCardViewDTO;
  days: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let dayPostedText: string;
  switch (days) {
    case 0:
      dayPostedText = "Posted Today";
      break;
    case 1:
      dayPostedText = "Posted Yesterday";
      break;
    default:
      dayPostedText = `Posted ${days} Days Ago`;
  }
  return (
    <div className="flex justify-between px-2">
      <Link
        className="flex items-center"
        href={`/services/joblistings/${job.job_posting_id}`}
        target="_blank"
      >
        <span className="flex items-center justify-start gap-2">
          <span className="font-['Roboto'] text-sm font-semibold leading-[16.80px] tracking-tight text-[#047f9c]">
            {job.job_title}
          </span>
          <span className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
            |
          </span>
          <span className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
            {job.industry_sectors?.sector_title}
          </span>
          <span className="font-['Roboto'] text-xs font-normal leading-[14.40px] tracking-tight text-[#797979]">
            {dayPostedText}
          </span>
        </span>
      </Link>
      <DeleteJobPostingButton id={job.job_posting_id} />
    </div>
  );
}
function AddJobLink() {
  return (
    <div className="flex items-center bg-white p-2">
      <div className="flex h-[17px]">
        {/*<Link href={'/services/employers/dashboard/postjob'}className="text-sm font-semibold text-[#047f9c] flex items-center gap-1">*/}
        {/*Post a Job*/}
        {/*  <PlusCircleIcon width={20}/>*/}
        {/*</Link>*/}
      </div>
    </div>
  );
}
