import { getJobSeekerEmployerView } from "@/app/lib/prisma";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default async function page({params}:{params: {id:string}}){
    let jobseeker = await getJobSeekerEmployerView(params.id)
    return(
        <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
            <h1>Job Seeker profile</h1>
            <p>Student id is:{params.id}</p>
            <p>
                {
                    jobseeker?.contacts.first_name
                }
            </p>
            <JobSeekerCardView isLarge={false} name={jobseeker?.contacts.first_name + ' ' + jobseeker?.contacts.last_name} school={jobseeker?.edu_institutions?.name} pathway={jobseeker?.pathways.pathway_title} skillsList={[]} aboutMe={jobseeker?.intro_headline ? jobseeker?.intro_headline : ''} id={params.id}/>
        </main>
    );
}