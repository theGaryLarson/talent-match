import Tabs from "@/app/ui/components/Tabs";
import PageBanner from "@/app/ui/components/PageBannner";
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";
import VideoBlock from "@/app/ui/components/VideoBlock";
import Image from "next/image"
import SimpleCard from "@/app/ui/components/SimpleCard";
import PhotoCardWithTitle from "@/app/ui/components/PhotoCardWithTitle";
import LargeRoundedButtonCard from "@/app/ui/components/LargeRoundedButtonCard";
import CFAPortalCard from "@/app/ui/components/CFAPortalCard";

//job seeker landing page
export default function Page() {
  const tabs = [
    {
      label: "Career Portal",
      content: <CFAPortalCard/>,
    },
    {
      label: "Career Prep",
      content: 
        <div className = "text-center">
          <br/>
          <strong >Enhance Your Technical Skills And Workplace Success Strategies</strong>
          <br/><br/>
          <div className="grid justify-center space-y-10 lg:space-x-10 lg:space-y-0 lg:grid-cols-2">
            <GreyBackgroundBulletPointListBlock title = "Durable & Interpersonal Skills"
                                                bulletPoints = {["Metacognition", "Critical Thinking", "Character", "Creativity", "Growth Mindset", "Fortitude", "Communication", "Conflict Resolution", "Customer Service", "Mindfulness", "Collaboration", "Leadership"]}/>
            <GreyBackgroundBulletPointListBlock title = "Employability Skills" 
                                                bulletPoints={[["Personal Brand", "Resume & Cover Letter", "LinkedIn & Social Media"], ["Interviewing", "Behavioral & Technical", "Preperation & Follow-Up"], ["Networking", "Building connections",  "Navigating Events"], ["Navigating the Job Market", "Job Search Strategies", "Thriving in the workplace"]]}/>
          </div>
        </div>,
    },
    {
      label: "Events",
      content: 
      <div className="text-center">
        <br/>
        <strong >Get The Guidance To Help You Make Better Informed Decisions</strong>
        <br/><br/>
        <TextImageSlide title="Portfolio showcase" 
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac. Aliquet risus feugiat in ante metus dictum at tempor commodo."
                        list = {[
                          "Resume optimization and review.",
                          "Interview preperation tips and mock interviews.",
                          "Career counseling and navigation tools.",
                          "Job search strategies and networking advice."
                        ]}
                        paragraph2="Still have questions? Join an information session today"
                        image = "stock/people-using-digital-device-while-meeting 2.png"/>
      </div>,
    },
    {
      label: "Resource Library",
      content: 
      <div className="text-center">
        <br/>
        <strong >Get The Guidance To Help You Make Better Informed Decisions</strong>
        <br/><br/>
        <TextImageSlide title="Job Experience" 
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac. Aliquet risus feugiat in ante metus dictum at tempor commodo."
                        list = {[
                          "Resume optimization and review.",
                          "Interview preperation tips and mock interviews.",
                          "Career counseling and navigation tools.",
                          "Job search strategies and networking advice."
                        ]}
                        paragraph2="Still have questions? Join an information session today"
                        image = "stock/people-using-digital-device-while-meeting 2.png"
                        imageLeft/>
      </div>,
    },
    {
      label: "Job Board",
      content: 
      <div className="text-center">
        <br/>
        <strong >Get The Guidance To Help You Make Better Informed Decisions</strong>
        <br/><br/>
        <TextImageSlide title="College Credit" 
                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac. Aliquet risus feugiat in ante metus dictum at tempor commodo."
                        list = {[
                          "Resume optimization and review.",
                          "Interview preperation tips and mock interviews.",
                          "Career counseling and navigation tools.",
                          "Job search strategies and networking advice."
                        ]}
                        paragraph2="Still have questions? Join an information session today"
                        image = "stock/people-using-digital-device-while-meeting 2.png"/>
      </div>,
    },
  ];

  return (
    <>
      <PageBanner title = {"About joing CFA (Placeholder)"} bg ="bg-employer-hero-1"/>
      <div className="px-6 md:px-12 lg:px-24 py-16 space-y-8 container mx-auto">
        <div className="space-y-6 px-4">
          <p className = "text-2xl">Unlock your potential with CFA Career Services</p>
          <p>CFA Career Services is your central hub for launching or advancing your tech career, no matter where you are on your journey. 
            Bridge the skills gap with our programs, combining technical training and career readiness. 
            Showcase your TechReady talents on our Career Portal, connect with top employers, and land your dream tech job.
            </p>
          <br></br>
          <strong>Limited access is available through the Green Jobs Challenge grant and the Washington Jobs Initiative.</strong>
        </div>
        
        <br/>
        <div className = "px-8">
          <Tabs tabs = {tabs}/>
        </div>
        <LargeRoundedButtonCard
          title={'Schedule an Info Session Today'}
          blurb={
            'Book a FREE 30-minute info session to learn more about how CFA Career Services can help you unlock your full potential and chieve your tech career goals.'
          }
          buttonContent={'Register Now'}
        />
        <div className="space-y-6">
          <p className="text-2xl">CFA meets you where you are</p>
          <p>We offer a range of programs to help aspiring tech professionals at all stages of their journey. Explore our programs and find the perfect fit for you.</p>
          <p>Access diverse opportunties in the tech industry, including:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 flex-wrap">
          <PhotoCardWithTitle title = "Pre-Apprenticeship Program" article = "WA residents, between the ages of 16-24 years old and in need of financial assistance, can apply for our Full Stack Web Development Pre-Apprenticeship program! Master in-demand coding skills & earn a certificate in 1.5 years." 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"
                              callToAction="Learn more & Apply"/>
          <PhotoCardWithTitle title = "Project Factory" article = "Stuck between textbooks and your dream job? Project Factory bridges the gap! Our platform lets college students tackle real-world projects mentored by industry pros. Gain hands-on experience, refine in-demand skills, and build a portfolio that grabs attention. Get instant feedback, develop on real cloud infrastructure, and launch your career!" 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"
                              callToAction="Coming Soon"/>
          <PhotoCardWithTitle title = "Career Prep" article = "Whether you are an experienced professional or a recent graduate, our Career Prep program helps you reach your full potential, no matter your experience level. We create personalized plans to guide you, with learning modules to hone your professional skills and career readiness. Complete milestones and impress employers by showcasing your achievements with TechReady badges on your Career Portal profile." 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"
                              callToAction="Coming Soon"/>
        </div>
      </div>
      <BlockQuote text = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
          author={"The Lorem Ipsum"} 
          imgSrc={"/cfa_images/stock/Mask Group.png"}/>
      <div className="px-6 md:px-12 lg:px-24 py-16 space-y-8 container mx-auto">
        <div className="space-y-6 px-4">
          <p className="text-2xl">Your path to a thriving tech career starts here!</p>
          <ul className="list-decimal leading-8">
            <li><strong>Create Your Profile: </strong>Highlight your strengths, experience, and achievements on our Career Portal. Build a strong foundation that gets you noticed!</li>
            <li><strong>Build Skills & Earn Badges: </strong>Master in-demand skills through our comprehensive programs. Earn badges along the way to validate your expertise.</li>
            <li><strong>Showcase Your Talents: </strong>Utilize your Career Portal profile to showcase your TechReady skills and impress top employers.</li>
            <li><strong>Confidently Navigate the Job Market: </strong>Gain the knowledge and skills you need to confidently navigate the job market and land your dream job.</li>
          </ul>

        </div>
        <div className="flex justify-evenly gap-4 flex-wrap">
          <SimpleCard title={"Host a Job Fair"} content={"Host a job fair with Computing for All. Get to know candidates ahead of the interview process."} href={"/#"}/>
          <SimpleCard title={"Run a Job Readiness Workshop"} content={"Conduct a workshop on general career prep or get to know students through mock interviews."} href={"/#"}/>
        </div>
      </div>
    </>
  );
}

function TextImageSlide({title, paragraph, list, paragraph2, image, imageLeft = false}:
    {title:string, paragraph:string, list:Array<string>, paragraph2:string, image:string, imageLeft?:boolean}){
  let listElements = [];
  for (let el of list){
    listElements.push(<li>{el}</li>)
  }
  let imgEl = <div className="self-center"><Image width ={1000} height={1000} src={`/cfa_images/${image}`} alt = ""/></div>;
  return (
    <div className="flex flex-col lg:flex-row gap-4 text-left">
      {imageLeft && imgEl}
      <div>
        <strong >{title}</strong>
        <br/><br/>
        <p>{paragraph}</p>
        <br/>
        <ul className="list-disc list-inside font-bold pl-10">
          {...listElements}
        </ul>
        <br/><br/>
        <p>{paragraph2}</p>
      </div>
      {!imageLeft && imgEl}
    </div>);
}
