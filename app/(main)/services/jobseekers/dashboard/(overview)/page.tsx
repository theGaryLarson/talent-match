import { getJobSeekerAppliedJobs, getJobSeekerBookmarkedJobs } from "@/app/lib/joblistings";
import Link from "next/link";

//job seeker dashboard
export default async function Page() {
  const myBookMarkedJobs = await getJobSeekerBookmarkedJobs();
  const myAppliedJobs = await getJobSeekerAppliedJobs();
  return (
    <div >
      <h1 className="REPLACE-BEFORE-RELEASE">Jobseeker dashboard! Allegedly.</h1>   
      <h1 className="font-bold text-xl">BookMarked Jobs</h1>
    <div>
      {
        myBookMarkedJobs?.BookmarkedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
    
    <h1 className="font-bold text-xl">
      Applied Jobs
    </h1>
    <div>
      {
        myAppliedJobs?.appliedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
    <div>

    </div>
    
    
    
    </div>
  );
}
