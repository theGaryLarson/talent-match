import { deleteJobListing, getMyJobListings } from "@/app/lib/joblistings";
import { getJobseekerBookmarkByCompany } from "@/app/lib/prisma";
import { mapToEnumOrThrow } from "@/app/lib/utils";
import JobPostingCard from "@/app/ui/components/jobPostings/JobPostingCard";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";
import { ProgramEnrollmentStatus } from "@/data/dtos/JobSeekerProfileCreationDTOs";
export default async function Page(){
    const jobseekers = await getJobseekerBookmarkByCompany();
return(
<main className="m-2 phone:m-4 sm-tablet:m-6 mb-0 phone:p-6 laptop:px-[200px] pt-8 w-full">
    <h1 className="text-2xl font-medium">
        My Dashboard
      </h1>
    
    <div className="space-y-4">
    {jobseekers?.map((jobseeker)=>{
return(
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
            jobseeker_education: jobseeker.jobseeker.jobseeker_education,//TODO needs fixing to match dtos 
            jobseeker_has_skills: jobseeker.jobseeker.jobseeker_has_skills
        }}/>
);})}
    </div>
</main>
    );
}
