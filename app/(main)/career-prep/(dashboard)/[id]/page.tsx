import { getCareerPrepStudentDetailView, getCareerPrepStudentNotes, NoteDTO, NoteType } from "@/app/lib/admin/careerPrep";
import NoteCard from "@/app/ui/components/careerPrep/NoteCard";
import MarkDownEditor from "@/app/ui/components/mdEditor/MarkDownEditor";
import Tabs from "@/app/ui/components/Tabs";
import { ReactNode } from "react";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id)
    return(
        <main className="space-y-3 pr-[200px] w-full">
            <h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1>
            <h2>Status: {client.data?.prepEnrollmentStatus}</h2>
            <h2>Assessment Date:{client.data?.assessmentDate}</h2>
            <h2>Highest Level of Education: {client.data?.education}</h2>
            <h2>Email address: {client.data?.emailAddress}</h2>
            <h2>Pool: {client.data?.poolAssignment}</h2>
            <h2>Linkedin:{client.data?.linkedin}</h2>
            <h2>Pathway: {client.data?.pathway}</h2>
            <h2>Technical Certificates: {client.data?.technicalCertificates.map((c)=>`${c.name}, `)}</h2>
            <div>
                <Tabs tabs={
                [
                {label:"General Notes",content:<><MarkDownEditor title={"This is a title"} noteType={NoteType.GENERAL} jobseekerId={params.id}/>{notes.generalNotes.map((n)=><NoteCard key={n.id} {...n}/>)}</>},
                {label:"Meeting Notes",content:<><MarkDownEditor title={"This is a title"} noteType={NoteType.MEETING} jobseekerId={params.id}/>{notes.meetingNotes.map((n)=><NoteCard key={n.id} {...n}/>)} </>},
                {label:"Follow Up Notes",content:<><MarkDownEditor title={"This is a title"} noteType={NoteType.FOLLOWUP} jobseekerId={params.id}/>{notes.followUpNotes.map((n)=><NoteCard key={n.id} {...n}/>)}</>}
                ]}/>
            </div> 
            
        </main>
    );
}




