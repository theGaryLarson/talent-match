import Tabs from "@/app/ui/components/Tabs";
import PageBanner from "@/app/ui/components/PageBannner";
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";
import VideoBlock from "@/app/ui/components/VideoBlock";
import Image from "next/image"

//job seeker landing page
export default function Page() {
  const tabs = [
    {
      label: "Discover Our Services",
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
          <div className="justify-center text-left space-y-20 md:space-x-10 md:space-y-0 md:columns-2">
            <GreyBackgroundBulletPointListBlock title = "Technical skills development" bulletPoints = {["Cloud Computing", "Cyber Security", "Data Analyst", "IT Support",
                                                                                                        "Project Management", "Software Development", "Web Development", "UX Design"]}/>
            <GreyBackgroundBulletPointListBlock title = "Professional skills development" bulletPoints={["Leadership", "Teamwork", "Communication", "Problem Solving"]} singleColumn/>
          </div>
        </div>,
    },
    {
      label: "Career Services",
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
                          image = "stock/placeholder.jpg"/>
        </div>,
    },
    {
      label: "Showcase Your Work",
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
                        image = "stock/placeholder.jpg"/>
      </div>,
    },
    {
      label: "Gain Experience",
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
                        image = "stock/placeholder.jpg"/>
      </div>,
    },
    {
      label: "Earn College Credit",
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
                        image = "stock/placeholder.jpg"/>
      </div>,
    },
  ];

  return (
    <>
      <PageBanner title = {"About joing CFA (Placeholder)"} bg ="bg-employer-hero-1"/>
      <main className="px-6 md:px-12 lg:px-24 py-16 space-y-8">
        <strong>Become a Lorem Ipsum</strong>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <br/>
        <div className = "container mx-auto" >
          <Tabs tabs = {tabs}/>
        </div>
        <BlockQuote text = {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
          author={"The Lorem Ipsum"} 
          imgSrc={"/cfa_images/stock/Mask Group.png"}/>
        
      </main>
    </>
  );
}

function TextImageSlide({title, paragraph, list, paragraph2, image}:
    {title:string, paragraph:string, list:Array<string>, paragraph2:string, image:string}){
  let listElements = [];
  for (let el of list){
    listElements.push(<li>{el}</li>)
  }
  return (
    <div className="grid grid-cols-2 gap-4 text-left">
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
      <Image width ={500} height={500} objectFit="contain" src={`/cfa_images/${image}`} alt = ""/>
    </div>);
}
