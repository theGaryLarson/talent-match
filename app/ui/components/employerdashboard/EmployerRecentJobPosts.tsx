import { getMyJobListings } from "@/app/lib/joblistings";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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
    <Link className="flex items-center bg-white p-2" href={"/services/joblistings/"+props.joblistingId}>
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
      <div className="flex h-5 w-5 items-center justify-center">
        <div className="inline-flex h-5 w-5 items-center justify-center">
          <div className="inline-flex h-5 w-5 items-center justify-center">
            <div className="relative flex h-5 w-5 flex-col items-start justify-start" />
          </div>
        </div>
      </div>
    </Link>
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