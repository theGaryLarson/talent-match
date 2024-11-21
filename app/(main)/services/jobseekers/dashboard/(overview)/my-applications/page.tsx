import { getJobSeekerAppliedJobs } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const myAppliedJobs = await getJobSeekerAppliedJobs();
    return(
<main>
<h1 className="font-bold text-xl">
      Applied Jobs
    </h1>
    <div>
      {
        myAppliedJobs?.appliedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
</main>
    );
}