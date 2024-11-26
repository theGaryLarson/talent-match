import { getAllJobPosts } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const jobPosts = await getAllJobPosts();

    //TODO style this to look good
    return(
        <main>
            <h1 className="text-xl REPLACE-BEFORE-RELEASE">NOTE THIS IS UNSTYLED AND JUST LINKS TO EVERY JOB</h1>
            {
                jobPosts?.map((jobpost)=>{
                    return (
                        <div className="border" key={jobpost.job_posting_id}>
                            <Link href={`/services/joblistings/${jobpost.job_posting_id}`}>{jobpost.job_title}</Link>
                        </div>
                    );
                })
            }
        </main>
    );
}