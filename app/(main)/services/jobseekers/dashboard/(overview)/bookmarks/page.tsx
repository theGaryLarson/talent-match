import {getJobSeekerBookmarkedJobs } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const myBookMarkedJobs = await getJobSeekerBookmarkedJobs();
    if(myBookMarkedJobs === undefined || myBookMarkedJobs.length == 0){
      return (
        <div><p>No Saved Job Posts Found: <Link href={'/services/jobseekers/dashboard/jobsearch'} className='LINK'>Find Job Listings here</Link></p></div>
      );
    }
    return(
<main>
<h1 className="font-bold text-xl">BookMarked Jobs</h1>
    <div>
      {
        myBookMarkedJobs.map((job)=><div key={job.job_posting.job_posting_id}><Link href={`/services/joblistings/${job.job_posting.job_posting_id}`}>{job.job_posting.job_title}</Link></div>)
      }
    </div>
</main>
    );
}