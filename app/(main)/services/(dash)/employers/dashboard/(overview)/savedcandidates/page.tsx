import { deleteJobListing, getMyJobListings } from "@/app/lib/joblistings";
import { getJobseekerBookmarkByCompany } from "@/app/lib/prisma";
import JobPostingCard from "@/app/ui/components/jobPostings/JobPostingCard";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";
//TODO make  jobseekers map to JobSeekerCards
export default async function Page(){
    const jobseekers = await getJobseekerBookmarkByCompany();
   console.log( JSON.stringify(jobseekers))//beacuase of deep nesting need to stringify before loging
return(
<div>
    {jobseekers?.map((js)=> js.jobseeker.users.first_name)}
</div>
    );
}
