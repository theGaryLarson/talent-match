import {getJobSeekerBookmarkedJobs } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const myBookMarkedJobs = await getJobSeekerBookmarkedJobs();
    return(
<main>
<h1 className="font-bold text-xl">BookMarked Jobs</h1>
    
    
    <div>
      {
        myBookMarkedJobs?.BookmarkedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
</main>
    );
}