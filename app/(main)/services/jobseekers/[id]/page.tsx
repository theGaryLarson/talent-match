import { getJobSeekerEmployerView } from "@/app/lib/prisma";
import Avatar from "@/app/ui/components/Avatar";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default async function page({params}:{params: {id:string}}){
    let jobseeker = await getJobSeekerEmployerView(params.id)
    return(
        <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
           
            <div className="border w-[500px] h-[200px] flex items-center">
                <div className="flex items-center gap-5 p-4">
                <Avatar imgsrc={jobseeker?.contacts.photo_url} scale={3}></Avatar>
                <div>
                    <h1 className="font-bold text-2xl">{jobseeker?.contacts.first_name + ' ' + jobseeker?.contacts.last_name}</h1>
                    <h2>{jobseeker?.pathways?.pathway_title}</h2>
                    <h2>{jobseeker?.edu_institutions?.name}</h2>
                </div>
                </div>

            </div>
           
            
        <p>Student id is:{params.id}</p>
        </main>
    );
}