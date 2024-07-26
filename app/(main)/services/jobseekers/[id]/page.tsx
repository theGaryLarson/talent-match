import { getJobSeekerEmployerView } from "@/app/lib/prisma";
import Avatar from "@/app/ui/components/Avatar";
import Pill from "@/app/ui/components/Pill";
import Toggle from "@/app/ui/components/Toggle";
export default async function page({params}:{params: {id:string}}){
    let jobseeker = await getJobSeekerEmployerView(params.id)
    return(
        <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
           <Toggle/>
            <div className="border w-[750px] h-[200px] flex items-center rounded-md">
                <div className="flex items-center gap-5 p-4">
                <Avatar imgsrc={jobseeker?.contacts.photo_url} scale={3}></Avatar>
                <div>
                    <h1 className="font-bold text-2xl">{jobseeker?.contacts.first_name + ' ' + jobseeker?.contacts.last_name}</h1>
                    <h2>{jobseeker?.pathways?.pathway_title}</h2>
                    <h2>{jobseeker?.jobseeker_education[0]?.eduInstitutions?.name}</h2>
                </div>
                </div>

            </div>

            <div className="border w-[750px] p-4 space-y-4">
                <h1 className="font-bold text-2xl">Work Experience</h1>
                {jobseeker?.work_experiences.map((experience)=>
                    <div key={experience.workId} className="border p-4">
                        <h2 className="font-bold text-xl">{experience.company} | {experience.jobTitle}</h2>
                        <p>{experience.responsibilities}</p>
                    </div>
                )}
                
            </div>
            <div className="border w-[750px] p-4 space-y-4 rounded-md">
                <h1 className="font-bold text-2xl">Education</h1>
                <div className="border p-4">
                <h2 className="font-bold text-xl">{jobseeker?.jobseeker_education[0]?.eduInstitutions?.name}</h2>
                </div>
            </div>
            <div className="border w-[750px] p-4 space-y-4 rounded-md">
                <h1 className="font-bold text-2xl ">Projects</h1>
    
                    {
                        jobseeker?.project_experiences.map((experence)=>
                        <div className="border p-4 rounded-md" key={experence.projectId}>
                        <h2 className="text-xl">{experence.projTitle}</h2>
                        <p className="text-sm">{experence.startDate.toLocaleDateString()+" - "+experence.completionDate.toLocaleDateString()}</p>
                        <p>{experence.problemSolvedDescription}</p>
                        {experence.demoUrl?<a target="_blank" href={experence.demoUrl}>{experence.demoUrl}</a>:''}
                        </div>
                        
                        )
                    }
            </div>
            
            <div className="border w-[750px] p-4 space-y-4 rounded-md">
                <h1 className="font-bold text-2xl">Skills</h1>
                    <div className="flex flex-wrap gap-4">
                {jobseeker?.jobseeker_has_skills.map(
                    (skill)=> 
                        <Pill text={skill.skills.skill_name} href={skill.skills.skill_info_url} key={skill.skills.skill_id}/>
                )}
                </div>
            </div>
            <div className="border w-[750px] p-4 space-y-4 rounded-md">
                <h1 className="font-bold text-2xl">Resume</h1>
                {jobseeker?.resume_url?<a href={jobseeker?.resume_url}>View Resume</a>:''}
            </div>
            <div className="border w-[750px] p-4 space-y-4 rounded-md">
                <h1 className="font-bold text-2xl">Portfolio</h1>
                {jobseeker?.portfolio_url?<a href={jobseeker?.portfolio_url}>{jobseeker?.portfolio_url}</a>:''}
            </div>


        </main>
    );
}
