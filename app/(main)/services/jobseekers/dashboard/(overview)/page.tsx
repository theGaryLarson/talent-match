import { getCareerPrepAssementStatus, getPoolWithSession } from "@/app/lib/jobseeker";
import { PoolCategories } from "@/app/lib/poolAssignment";
import Avatar from "@/app/ui/components/Avatar";
import { auth } from "@/auth";
import { WarningAmberOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

//job seeker dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const session = await auth();
  const pool = await getPoolWithSession();
  const AssementInfo = await getCareerPrepAssementStatus();
  let hasTakenTest = false;
  if(AssementInfo != undefined){
    hasTakenTest = AssementInfo.CareerPrepAssessment.length >0;
  }
  return (
    <div className="space-y-3 py-[20px]">
      {hasTakenTest?'':<CallTOActionBanner pool={pool?.assignedPool as PoolCategories}/>}
      <h1 className="text-black/90 text-[32px]">My Dashboard</h1> 
      <NameTitleTag name={session?.user.name} pfp={session?.user.image??undefined}/>
      <WorkShops/>
      <CareerPrep hastakentest={hasTakenTest}/>
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


function WorkShops(){
  return(
<>
<div className="text-black/90 text-xl font-medium">Workshops & Events</div>
      <div className="text-lg flex h-[76px] p-[16px] w-full items-center rounded-lg border p-4 rounded-[10px] shadow grow laptop:min-w-[600px]">
        <h3>Coming Soon...</h3>
      </div>
</>
  );
}

function CareerPrep(props:{hastakentest:boolean}){
  return(
    <div className="space-y-3 w-[1080px]">
      <div className="w-full h-10 rounded justify-end items-center gap-1 inline-flex">
    <div className="text-black/90 text-xl font-medium">Career Prep</div>
    <div className="grow shrink basis-0 flex-col justify-start items-end gap-1 inline-flex">
        <Link href='/services/jobseekers/career-prep/enrollment' className="px-6 py-2 rounded-full font-medium border border-[#047f9c] text-[#047f9c] hover:text-white hover:bg-[#047f9c]">
            See More
        </Link>
    </div>
</div>




<div className="w-[1079px] h-[299.16px] p-4 bg-[#f6f6f6] rounded-2xl shadow flex-col justify-center items-center gap-3 inline-flex">
    <div className="self-stretch px-[50px] justify-center items-center gap-6 inline-flex">
        <Image className="rounded-2xl" width={400} height={267} src='/images/stock/careerAssesment.jfif' alt=""/>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch h-[188px] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch text-[#014260] text-[32px] font-normal  leading-[38.40px]">Complete the Skills Assessment to begin the Career Prep Program</div>
                <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-[#047f9c] text-base font-semibold  uppercase leading-none tracking-wider">Career Prep Program</div>
                </div>
                <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                    <div className="text-[#191919]/60 text-base font-normal  leading-tight">Once you complete the skills assessment, you’ll be on your way to:  <br/><br/>A personalized Professional Development Plan <br/>A virtual meeting with our Career Navigator </div>
                </div>
            </div>
            <div className="flex-col justify-start items-start flex">
                <div className="w-px h-4 relative" />
            </div>
            {props.hastakentest?
            <Link href='/services/jobseekers/career-prep/skill-assessment' className="px-5 py-3 bg-[#047f9c] rounded-full text-white font-medium border border-[#047f9c] hover:text-[#047f9c] hover:bg-white">
            Take The Skills Assessment
        </Link>
            :
            <Link href='/services/jobseekers/career-prep/skill-assessment' className="px-5 py-3 bg-[#047f9c] rounded-full text-white font-medium border border-[#047f9c] hover:text-[#047f9c] hover:bg-white">
                Take The Skills Assessment
            </Link>}
        </div>
    </div>
</div>
    </div>
  );
}



function CallTOActionBanner({pool}:{pool:PoolCategories}){
  let background = ''
  let copy = 'Elevate your profile and stand out to Employers by completing your Career Prep track.'
  if(pool === PoolCategories.NotJobReady || pool === PoolCategories.None){
    copy = 'Your profile is currently not visible to employers based on your education and work experience. Complete Career Prep to become visible to employers.'
    background = 'bg-[#da2627]'
  }else if(pool === PoolCategories.JobReady){
    background = 'bg-[#DF9C19]'
  }else if(PoolCategories.Recommended){
    background = 'bg-[#DF9C19]'
  }

  return(
    <div className={`w-full rounded-[10px] ${background} text-white text-lg flex items-center p-[20px] gap-3`} >
        <WarningAmberOutlined />
        <div>
          <span className="font-bold">Attention </span>
          <span>{copy} </span>
          <Link href={'/services/jobseekers/career-prep/skill-assessment'} className="font-normal underline">Take the Career Prep Assessment.</Link>
        </div>
      </div>
  );
}