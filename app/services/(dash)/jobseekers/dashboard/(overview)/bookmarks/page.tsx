import { getJobSeekerBookmarkedJobs } from "@/app/lib/joblistings";
import JobListingCardView from "@/app/ui/components/jobPostings/JobListingCardView";
import Link from "next/link";

export default async function page() {
  const myBookMarkedJobs = await getJobSeekerBookmarkedJobs();
  if (myBookMarkedJobs === undefined || myBookMarkedJobs.length == 0) {
    return (
      <div>
        <p>
          No Saved Job Posts Found:{" "}
          <Link href={"/services/joblistings"} className="LINK">
            Find Job Listings here
          </Link>
        </p>
      </div>
    );
  }
  return (
    <main className="mb-0 flex-1 pt-8 phone:m-4 phone:p-6 sm-tablet:m-6 laptop:px-[200px]">
      <h1 className="mb-4 text-2xl font-bold">Bookmarked Jobs</h1>
      <div className="space-y-4">
        {myBookMarkedJobs.map((job) => (
          <div key={job.job_posting_id}>
            <JobListingCardView joblisting={{ ...job }} />
          </div>
        ))}
      </div>
    </main>
  );
}
