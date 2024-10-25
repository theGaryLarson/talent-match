import { deleteJobListing, getMyJobListings } from "@/app/lib/joblistings";
import { getJobseekerBookmarkByCompany } from "@/app/lib/prisma";
import JobPostingCard from "@/app/ui/components/jobPostings/JobPostingCard";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";
import { ProgramEnrollmentStatus } from "@/data/dtos/JobSeekerProfileCreationDTOs";
export default async function Page(){
    const jobseekers = await getJobseekerBookmarkByCompany();
return(
<div>
    {jobseekers?.map((jobseeker)=>{
return(
    <div className="space-y-4">
<JobSeekerCardView jobseeker={{
            jobseeker_id: jobseeker.jobseekerId,
            user_id: jobseeker.jobseeker.user_id,
            BookmarkedJobseeker: jobseeker.jobseeker.BookmarkedJobseeker,
            intro_headline: jobseeker.jobseeker.intro_headline,
            years_work_exp: jobseeker.jobseeker.years_work_exp,
            highest_level_of_study_completed: jobseeker.jobseeker.highest_level_of_study_completed,
            pathways: jobseeker.jobseeker.pathways,
            work_experiences: jobseeker.jobseeker.work_experiences,
            users: jobseeker.jobseeker.users,
            jobseeker_education:null,// jobseeker.jobseeker.jobseeker_education,//TODO needs fixing to match dtos 
            jobseeker_has_skills: jobseeker.jobseeker.jobseeker_has_skills
        }}/>
        </div>
);})}
    
</div>
    );
}
