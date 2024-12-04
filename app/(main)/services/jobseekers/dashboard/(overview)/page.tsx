import { CareerPrepStatus, getCareerPrepStatus, getMeetingByJobSeeker } from "@/app/lib/admin/careerPrep";
import { getCareerPrepAssementStatus, getPoolWithSession } from "@/app/lib/jobseeker";
import { CareerPrepTrack, PoolCategories } from "@/app/lib/poolAssignment";
import Avatar from "@/app/ui/components/Avatar";
import { auth } from "@/auth";
import { WarningAmberOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

//job seeker dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const session = await auth();
  const pool = await getPoolWithSession();
  const AssementInfo = await getCareerPrepAssementStatus();
  const carrerPrepEnrollment = await getCareerPrepStatus(session?.user.jobseekerId??'')
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
      <CareerPrep enrollmentStatus={carrerPrepEnrollment?.enrollment} track={carrerPrepEnrollment?.Track} jobseekerId={session?.user.jobseekerId??''} caseManager={`${carrerPrepEnrollment?.CaseManger?.first_name??'Our'} ${carrerPrepEnrollment?.CaseManger?.last_name??'Carrer Navigator'}`}/>
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
          </Link>
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

async function CareerPrep(props:{
  enrollmentStatus: CareerPrepStatus|undefined, 
  track:CareerPrepTrack|undefined, 
  jobseekerId:string, 
  caseManager:string
}){
  console.log("Enrollment Status: ",props.enrollmentStatus)
  const Meetings = await getMeetingByJobSeeker(props.jobseekerId)

  let copy: { headline: string; body:ReactNode; button: string; buttonLink: string };
  switch (props.enrollmentStatus) {
    case undefined:
      copy = {
        headline: "Your Journey Starts Here",
        body: <div>
          Once you complete the skills assessment, you’ll be on your way to:
        <ul className="space-y-3 py-3">
          <li>A personalized Professional Development Plan</li>
          <li>A virtual meeting with our Career Navigator</li>
        </ul>
        </div>,
        button: "Take the Career Prep Skills Assessment",
        buttonLink:'/services/jobseekers/career-prep/skill-assessment'
      };
      break;
      case CareerPrepStatus.Applied:
      case CareerPrepStatus.CreatingPlan:
          copy = {
            headline: "Thank You for Taking the Skills Assessment",
            body: `We’re currently crafting a personalized Professional Development Plan just for you. Within 3-5 business days, you'll receive an email to schedule your first meeting with a dedicated Career Navigator.`,
            button: "Learn More",
            buttonLink: "/about-us", // TODO: onces there's an info page for carreer prep replace this
          };
          break;

      case CareerPrepStatus.PlanCreated:
      copy = {
        headline: "Your Personalized Plan is Ready!",
        body: "Your Professional Development Plan is ready for your review. Click below to schedule a meeting with our Career Navigator:",
        button: "Schedule a Meeting",
        buttonLink: "https://outlook.office365.com/owa/calendar/CFACareerServices@computingforall.org/bookings/", // Replace with the actual Bookings page link
      };
      break;

      case CareerPrepStatus.MeetingScheduled:
        copy = {
          headline: "Your Next Steps",
          body: <div>You have an upcoming meeting(s) with {props.caseManager} scheduled for:
                <ul>
                  {Meetings.map((m)=><li key={m.id}>{`${m.meetingDate}`}</li>)}
                </ul>
                </div>, // Replace placeholders with actual data
          button: "Reschedule Meeting",
          buttonLink: "https://outlook.office365.com/owa/calendar/CFACareerServices@computingforall.org/bookings/", // Replace with the actual Reschedule page link
        };
        break;

        case CareerPrepStatus.MetCareerNavigator:
          copy = {
            headline: "Complete Your Enrollment",
            body: `To officially join the program and access your Canvas training, please complete the enrollment form.`,
            button: "Enroll Now",
            buttonLink: "/services/jobseekers/career-prep/enrollment", 
          };
          break;
    case CareerPrepStatus.Completed:
    case CareerPrepStatus.Enrolled:
            copy = {
              headline: "Welcome to Career Prep!",
              body: "You've officially joined the program! You can now access the Canvas training and begin your journey.",
              button: "Access Canvas Training",
              buttonLink: props.track == CareerPrepTrack.ACCELERATED? 'https://computingforall.instructure.com/enroll/JKT9EF':'https://computingforall.instructure.com/enroll/B33XD4'
            };
            break;
    

    //TODO ask for copy for these Statuses
    case CareerPrepStatus.Rejected:
      copy = { headline: "Application Rejected", body: "Unfortunately, your application was not approved.", button: "Contact Us", buttonLink:'/services/jobseekers/career-prep/skill-assessment' };
      break;

    case CareerPrepStatus.Withdrawn:
      copy = { headline: "Application Withdrawn", body: "You have withdrawn from the program.", button: "Reapply", buttonLink:'/services/jobseekers/career-prep/skill-assessment' };
      break;

    default:
      copy = { headline: "Status Unknown", body: "We are unable to determine your status.", button: "Contact Support", buttonLink:'https://github.com/Computing-For-All/nextjs-issue-tracker/issues/new?assignees=&labels=uat&projects=Computing-For-All%2Fnextjs-issue-tracker&template=application.yml' };
      break;
  }






  return(
  <div className="space-y-3 w-[1080px]">
      <div className="w-full justify-between items-center flex">
        <h2 className="text-black/90 text-xl font-medium">Career Prep</h2>
          {/* <Link href='/services/jobseekers/career-prep/enrollment' className="px-6 py-2 rounded-full font-medium border border-[#047f9c] text-[#047f9c] hover:text-white hover:bg-[#047f9c]">
            See More
          </Link> */}
      </div>



<div className="w-[1079px] h-[299.16px] p-4 bg-[#f6f6f6] rounded-2xl shadow flex-col justify-center items-center gap-3 inline-flex">
    <div className="self-stretch px-[50px] justify-center items-center gap-6 inline-flex">
        <Image className="rounded-2xl" width={400} height={267} src='/images/stock/careerAssesment.jfif' alt=""/>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch h-[188px] flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch text-[#014260] text-[32px] font-normal  leading-[38.40px]">{copy.headline}</div>
                <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-[#047f9c]  font-semibold leading-none tracking-wider">Career Prep Program</div>
                </div>
                    <div className="text-[#191919]/60  font-normal  leading-tight">{copy.body}</div>
            </div>
           <br className="h-4"/>
            <Link href={copy.buttonLink} className="px-5 py-3 bg-[#047f9c] rounded-full text-white font-medium border border-[#047f9c] hover:text-[#047f9c] hover:bg-white">
                {copy.button}
            </Link>
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
          <Link href={'/services/jobseekers/career-prep/skill-assessment'} className="font-normal underline">Take the Career Prep Skills Assessment.</Link>
        </div>
      </div>
  );
}