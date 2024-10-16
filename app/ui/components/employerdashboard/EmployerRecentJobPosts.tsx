import { getMyJobListings } from "@/app/lib/joblistings";

export default async function EmployerRecentJobPosts() {
    //TODO add in dynamic data
    let jobPostings = await getMyJobListings();
  return <div>
    <div className="text-xl font-medium leading-relaxed text-black/90">
        Recent Job Posts
      </div>
    <div className="p-4 bg-white rounded-[10px] shadow gap-2 divide-y">
      {jobPostings.map((job)=>{
        return <SingleJobPost jobtitle={job.job_title} key={job.job_posting_id}/>
      })}
    </div>
  </div>;
}

function SingleJobPost(props:{jobtitle:string}) {
  return (
    <div className="flex items-center justify-between bg-white p-2">
      <div className="flex h-[17px] items-center justify-start gap-2">
        <div className="font-['Roboto'] text-sm font-semibold leading-[16.80px] tracking-tight text-[#047f9c]">
          {props.jobtitle}
        </div>
        <div className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
          |
        </div>
        <div className="font-['Roboto'] text-sm font-normal leading-[16.80px] tracking-tight text-[#181818]">
          Cloud Operations + Innovation (CO+I)
        </div>
        <div className="font-['Roboto'] text-xs font-normal leading-[14.40px] tracking-tight text-[#797979]">
          Posted 1 day ago
        </div>
      </div>
      <div className="flex h-5 w-5 items-center justify-center">
        <div className="inline-flex h-5 w-5 items-center justify-center">
          <div className="inline-flex h-5 w-5 items-center justify-center">
            <div className="relative flex h-5 w-5 flex-col items-start justify-start" />
          </div>
        </div>
      </div>
    </div>
  );
}
