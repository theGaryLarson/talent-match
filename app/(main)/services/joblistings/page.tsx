import { getAllJobPosts } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const jobPosts = await getAllJobPosts();
    return(
        <main>
            <p>
                this is the list view of job listings
            </p>
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