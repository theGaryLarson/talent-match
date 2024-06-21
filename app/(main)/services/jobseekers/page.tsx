import Tabs from "@/app/ui/components/Tabs";
import PageBanner from "@/app/ui/components/PageBannner";
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";
import VideoBlock from "@/app/ui/components/VideoBlock";
import Image from "next/image"
import SimpleCard from "@/app/ui/components/SimpleCard";
import PhotoCardWithTitle from "@/app/ui/components/PhotoCardWithTitle";
import LargeRoundedButtonCard from "@/app/ui/components/LargeRoundedButtonCard";

//job seeker landing page
export default function Page() {
  const tabs = [
    {
      label: "Career Portal",
      content: 
      <VideoBlock/>,
    },
    {
      label: "Build Your Skills",
      content: 
        <div className = "text-center">
          <br/>
          <strong >Enhance Your Technical Skills And Workplace Success Strategies</strong>
          <br/><br/>
          <div className="grid justify-center space-y-10 lg:space-x-10 lg:space-y-0 lg:grid-cols-2">
            <GreyBackgroundBulletPointListBlock title = "Durable & Interpersonal Skills"
                                                bulletPoints = {["Metacognition", "Critical Thinking", "Character", "Creativity", "Growth Mindset", "Fortitude", "Communication", "Conflict Resolution", "Customer Service", "Mindfulness", "Collaboration", "Leadership"]}/>
            <GreyBackgroundBulletPointListBlock title = "Employability Skills" 
                                                bulletPoints={[["Personal Brand", "Resume & Cover Letter", "LinkedIn & Social Media"], ["Interviewing", "Behavioral & Technical Interviews", "Preperation & Follow-Up"], ["Networking", "Building connections",  "Navigating Events"], ["Navigating the Job Market", "Job Search Strategies", "Thriving in the workplace"]]} singleColumn/>
          </div>
        </div>,
    },
    {
      label: "Career Prep",
      content: 
        <div className="text-center">
          <br/>
          <strong >Get The Guidance To Help You Make Better Informed Decisions</strong>
          <br/><br/>
          <TextImageSlide title="Career  Services" 
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
          title={'Join an Info Session to Get Started'}
          blurb={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
          }
          buttonContent={'Register Now'}
        />
        <div className="space-y-6">
          <p className="text-2xl">Get the Experience You Need</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Mi tempus imperdiet nulla malesuada pellentesque. Id aliquet lectus proin nibh. 
            Mi ipsum faucibus vitae aliquet nec ullamcorper. Sed elementum tempus egestas sed sed risus pretium. 
            Nisl purus in mollis nunc sed id. Neque viverra justo nec ultrices dui sapien eget mi proin. 
            Vulputate sapien nec sagittis aliquam. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. 
            Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. 
            Commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Nunc aliquet bibendum enim facilisis gravida. 
          </p>
          <p>Access diverse opportunties in the tech industry, including:</p>
        </div>
        <div className="flex justify-center flex-row gap-4 [&>*]:flex-grow">
          <PhotoCardWithTitle title = "Apprentice" article = "lalalalala alalla lorem ipsum" 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"/>
          <PhotoCardWithTitle title = "Apprentice" article = "lalalalala alalla lorem ipsum" 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"/>
          <PhotoCardWithTitle title = "Apprentice" article = "lalalalala alalla lorem ipsum" 
                              imgSrc="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png"/>
        </div>
      </div>
      <BlockQuote text = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
          author={"The Lorem Ipsum"} 
          imgSrc={"/cfa_images/stock/Mask Group.png"}/>
      <div className="px-6 md:px-12 lg:px-24 py-16 space-y-8 container mx-auto">
        <div className="space-y-6 px-4">
          <p className="text-2xl">Ready to get started, here are our steps:</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Mi tempus imperdiet nulla malesuada pellentesque. Id aliquet lectus proin nibh. 
            Mi ipsum faucibus vitae aliquet nec ullamcorper. Sed elementum tempus egestas sed sed risus pretium. 
            Nisl purus in mollis nunc sed id. Neque viverra justo nec ultrices dui sapien eget mi proin. 
            Vulputate sapien nec sagittis aliquam. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. 
            Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. 
            Commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Nunc aliquet bibendum enim facilisis gravida. 
          </p>

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
