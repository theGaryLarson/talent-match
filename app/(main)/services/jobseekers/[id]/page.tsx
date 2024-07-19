import { getJobSeekerEmployerView } from "@/app/lib/prisma";
import Avatar from "@/app/ui/components/Avatar";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default async function page({params}:{params: {id:string}}){
    let jobseeker = await getJobSeekerEmployerView(params.id)
    console.log(jobseeker)
    return(
        <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
           
            <div className="border w-[750px] h-[200px] flex items-center">
                <div className="flex items-center gap-5 p-4">
                <Avatar imgsrc={jobseeker?.contacts.photo_url} scale={3}></Avatar>
                <div>
                    <h1 className="font-bold text-2xl">{jobseeker?.contacts.first_name + ' ' + jobseeker?.contacts.last_name}</h1>
                    <h2>{jobseeker?.pathways?.pathway_title}</h2>
                    <h2>{jobseeker?.edu_institutions?.name}</h2>
                </div>
                </div>

            </div>

            <div className="border w-[750px] p-4 space-y-4">
                <h1 className="font-bold text-2xl">Work Experence</h1>
                {jobseeker?.work_experiences.map((experence)=>
                    <div className="border p-4">
                        <h2 className="font-bold text-xl">{experence.company} | {experence.job_title}</h2>
                        <p>{experence.responsibilities}</p>
                    </div>
                )}
                
            </div>
            <div className="border w-[750px] p-4 space-y-4">
                <h1 className="font-bold text-2xl">Education</h1>
                <div className="border p-4">
                <h2 className="font-bold text-xl">{jobseeker?.edu_institutions?.name}</h2>
                </div>
            </div>
            <div className="border w-[750px] p-4 space-y-4">
                <h1 className="font-bold text-2xl">Projects</h1>
    
                    {
                        jobseeker?.project_experiences.map((experence)=>
                        <div className="border p-4">
                        <h2 className="text-xl">{experence.project_title}</h2>
                        <p className="text-sm">{experence.start_date.toLocaleDateString()+" - "+experence.completion_date.toLocaleDateString()}</p>
                        <p>{experence.problem_solved_description}</p>
                        {experence.demo_url?<a target="_blank" href={experence.demo_url}>{experence.demo_url}</a>:''}
                        </div>
                        
                        )
                    }
            </div>
        </main>
    );
}
