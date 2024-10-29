import { getMyJobListings } from "@/app/lib/joblistings";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteJobPostingButton from "../jobPostings/DeleteJobPostingButton";
const getDaysSince= (d:Date)=> {
      return Math.floor((Date.now() - d.getTime()) / 86400000)
    }
export default async function EmployerRecentJobPosts() {
    //TODO add in dynamic data
    let jobPostings = await getMyJobListings();
    

  return <div>
    <div className="text-xl font-medium leading-relaxed text-black/90">
        Recent Job Posts
      </div>
    <div className="p-4 bg-white rounded-[10px] shadow gap-2 divide-y">
      {
      (jobPostings.length > 0)?jobPostings.map((job)=>{
        return <SingleJobPost jobtitle={job.job_title} joblistingId={job.job_posting_id} days={getDaysSince(job.publish_date)} key={job.job_posting_id} industry={job.industry_sectors?.sector_title??''}/>
      }):<AddJobLink/>
      }
    </div>
  </div>;
}

function SingleJobPost(props:{jobtitle:string, industry:string, days:number, joblistingId:string}) {
  let dayPostedText:string;
  switch (props.days) {
    case 0:
      dayPostedText = 'Posted Today'
      break
    case 1:
      dayPostedText = 'Posted Yesterday'
      break
    default:
      dayPostedText =  `Posted ${props.days} Ago`
  }
  return (
    <div className="flex justify-between px-2">
    <Link className="flex items-center" href={"/services/joblistings/"+props.joblistingId}>
      <div className="flex h-[17px] items-center justify-start gap-2">
        <div className="font-['Roboto'] text-sm font-semibold leading-[16.80px] tracking-tight text-[#047f9c]">
          {props.jobtitle}
        </div>
        <div className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
          |
        </div>
        <div className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
          {props.industry}
        </div>
        <div className="font-['Roboto'] text-xs font-normal leading-[14.40px] tracking-tight text-[#797979]">
          {dayPostedText}
        </div>
      </div>
    </Link>
    <DeleteJobPostingButton id={props.joblistingId}/>
    </div>
  );
}
function AddJobLink(){
  return(
    <div className="flex items-center bg-white p-2">
      <div className="flex h-[17px]">
        <Link href={'/services/employers/dashboard/postjob'}className="text-sm font-semibold text-[#047f9c] flex items-center gap-1">
        Post a Job
          <PlusCircleIcon width={20}/>
        </Link>
      </div>
    </div>
  );
}