//employer landing page
import PageBanner from "@/app/ui/components/PageBannner"
import Tabs from "@/app/ui/components/Tabs";
import VideoBlock from "@/app/ui/components/VideoBlock";


export default function Page(){
    const tabs = [
        {
          label: 'Why Join',
          content: <VideoBlock/>,
        },
        {
          label: 'Candidates',
          content: <div>Content of Tab 2</div>,
        },
        {
          label: 'Mentor',
          content: <div>Content of Tab 3</div>,
        },
        {
            label: 'Post Jobs',
            content: <div>Content of Tab 4</div>,
        },
        {
            label: 'Company Presence',
            content: <div>Content of Tab 5</div>,
        },
      ];

    return(
        <>
        <PageBanner title={"About Becoming a partner"}/>
        <main className="px-6 md:px-12 py-16 lg:px-24 space-y-8">
            <strong>Become a partner</strong>
            <p>
            Computing for All partners with Washington state community and technical colleges and training providers to source diverse students and job seekers for tech careers. We also train candidates in professional skill development to ensure they are career-ready.
            </p> 
            <div className="container mx-auto">
              <Tabs tabs={tabs} />
            </div>
        </main>
        </>
        
    );
}







