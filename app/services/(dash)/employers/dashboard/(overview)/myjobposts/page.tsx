import EmployerRecentJobPosts from "@/app/ui/components/employerdashboard/EmployerRecentJobPosts";

export default async function Page(){
    return(
<main className="w-full m-2 mb-0 w-full space-y-4 pt-8 phone:m-4 phone:p-6 sm-tablet:m-6 laptop:px-[200px]">
<EmployerRecentJobPosts/>
</main>
    );
}


