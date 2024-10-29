import { deleteJobListing, getMyJobListings } from "@/app/lib/joblistings";
import EmployerRecentJobPosts from "@/app/ui/components/employerdashboard/EmployerRecentJobPosts";
import JobPostingCard from "@/app/ui/components/jobPostings/JobPostingCard";

export default function Page(){
    return(
<main className="w-full">
<EmployerRecentJobPosts/>
</main>
    );
}


