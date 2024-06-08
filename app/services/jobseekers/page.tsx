import Tabs from "@/app/ui/components/Tabs";
import PageBanner from "@/app/ui/components/PageBannner";
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";

//job seeker landing page
export default function Page() {
  const tabs = [
    {
      label: "Discover Our Services",
      content: <div>content</div>,
    },
    {
      label: "Build Your Skills",
      content: 
        <div  className="justify-center space-y-20 md:space-x-10 md:space-y-0 md:columns-2">
          <GreyBackgroundBulletPointListBlock title = "Technical skills development" bulletPoints = {["Cloud Computing", "Cyber Security", "Data Analyst", "IT Support",
                                                                                                      "Project Management", "Software Development", "Web Development", "UX Design"]}/>
          <GreyBackgroundBulletPointListBlock title = "Professional skills development" bulletPoints={["Leadership", "Teamwork", "Communication", "Problem Solving"]} singleColumn/>
        </div>,
    },
    {
      label: "Career Services",
      content: <div>content</div>,
    },
    {
      label: "Showcase Your Work",
      content: <div>content</div>,
    },
    {
      label: "Gain Experience",
      content: <div>content</div>,
    },
    {
      label: "Earn College Credit",
      content: <div>content</div>,
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
