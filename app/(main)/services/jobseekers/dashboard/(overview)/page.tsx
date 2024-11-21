import { getJobSeekerAppliedJobs, getJobSeekerBookmarkedJobs } from "@/app/lib/joblistings";
import Avatar from "@/app/ui/components/Avatar";
import EmployerNameTitleTag from "@/app/ui/components/employerdashboard/EmployerNameTitleTag";
import { auth } from "@/auth";
import Link from "next/link";

//job seeker dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const session = await auth();
  const myBookMarkedJobs = await getJobSeekerBookmarkedJobs();
  const myAppliedJobs = await getJobSeekerAppliedJobs();
  return (
    <div >
      <h1 className="text-black/90 text-[32px]">My Dashboard</h1> 
      <NameTitleTag name={session?.user.name} pfp={session?.user.image??undefined}/>
      <h1 className="font-bold text-xl">BookMarked Jobs</h1>
    
    
    <div>
      {
        myBookMarkedJobs?.BookmarkedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
    
    <h1 className="font-bold text-xl">
      Applied Jobs
    </h1>
    <div>
      {
        myAppliedJobs?.appliedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
    <div>

    </div>
    
    
    
    </div>
  );
}

function NameTitleTag(props: {
  name: string | null | undefined;
  pfp: string | undefined;
}) {
  return (
    <div className="flex h-[76px] p-[16px] w-full items-center rounded-lg border p-4 bg-white rounded-[10px] shadow grow laptop:min-w-[600px]" >
      <Avatar imgsrc={props.pfp} scale={0.69} />
      <div className="flex w-full flex-wrap items-center justify-between p-4">
        <h2 className="font-bold">
          {props.name}
        </h2>
        <p>
          <Link
            className="LINK"
            href="/edit-profile/jobseeker/introduction"
          >
            Edit My Profile
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}





