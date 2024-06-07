//employer landing page
import BlockQuote from "@/app/ui/components/BlockQuote";
import GreyBackgroundBulletPointListBlock from "@/app/ui/components/GreyBackgroundBulletPointListBlock";
import PageBanner from "@/app/ui/components/PageBannner"
import PhotoCardWithTitle from "@/app/ui/components/PhotoCardWithTitle";
import Tabs from "@/app/ui/components/Tabs";
import VideoBlock from "@/app/ui/components/VideoBlock";


export default function Page(){
    const tabs = [
        {
          label: 'Why Join',
          content: <VideoBlock/>,
        },
        {
          label: 'Training & Development',
          content: <div className="flex space-x-20"><GreyBackgroundBulletPointListBlock/><GreyBackgroundBulletPointListBlock/></div>,
        },
        {
          label: 'Candidates',
          content: <div>Content of Tab 3</div>,
        },
        {
            label: 'Mentor',
            content: <div>Content of Tab 4</div>,
        },
        {
            label: 'Post Jobs',
            content: <div>Content of Tab 5</div>,
        },
        {
          label: 'Company Presence',
          content: <div>Content of Tab 6</div>,
      },
      ];

    return(
        <>
        <PageBanner title={"About Becoming a partner"} bg="bg-employer-hero-1"/>
        <main className="px-6 md:px-12 py-16 lg:px-24 space-y-8">
            <strong>Become a partner</strong>
            <p>
            Computing for All partners with Washington state community and technical colleges and training providers to source diverse students and job seekers for tech careers. We also train candidates in professional skill development to ensure they are career-ready.
            </p> 
            <div className="container mx-auto">
              <Tabs tabs={tabs} />
              
            </div>
            <BlockQuote text={"This program provided top-notch training with state-of-the-art equipment, truly preparing me for the real world. A big thank you to the team!"} author={"James Lee"} imgSrc={"/cfa_images/stock/Mask group.png"}/>
            <p>
            <strong>Hire the right candidate</strong>
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
            <div className="flex flex-wrap justify-around">
            <PhotoCardWithTitle title={"Canidates"} article={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}/>
            <PhotoCardWithTitle title={"Interns"} article={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}/>
            <PhotoCardWithTitle title={"Apprentice"} article={"Here is a b unch of random information that will be replaced yada yada radda radda"}/>
            </div>
            

        </main>
        </>
        
    );
}







