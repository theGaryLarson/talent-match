import { deleteJobListing, getMyJobListings } from "@/app/lib/joblistings";
import JobPostingCard from "@/app/ui/components/jobPostings/JobPostingCard";

export default async function Page(){
    let jobPostings = await getMyJobListings();
    console.log(jobPostings)
const deleteJob = async(id:string)=> {
    "use server"
    await deleteJobListing(id)
}
    return(
<div>
{jobPostings.length > 0 ? (
                jobPostings.map((job) => (
                    <JobPostingCard
                        key={job.job_posting_id}
                        jobTitle={job.job_title}
                        jobDescription={job.job_description} // Fixed typo here
                        jobPostingId={job.job_posting_id}
                        remove={deleteJob}
                    />
                ))
            ) : (
                <p>No job postings available.</p>
            )}
</div>
    );
}


