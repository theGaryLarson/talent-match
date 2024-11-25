import { CategorizedNotes, getCareerPrepStudentDetailView, getCareerPrepStudentNotes, NoteDTO, NoteType } from "@/app/lib/admin/careerPrep";
import NoteCard from "@/app/ui/components/careerPrep/NoteCard";
import MarkDownEditor from "@/app/ui/components/mdEditor/MarkDownEditor";
import NoteContainer from "@/app/ui/components/careerPrep/NoteContainer";
import Tabs from "@/app/ui/components/Tabs";
import { ReactNode } from "react";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id)
    return(
        <main className="space-y-3 pr-[100px] w-full">
            <h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1>
            <h2>Status: {client.data?.prepEnrollmentStatus}</h2>
            <h2>Assessment Date:{client.data?.assessmentDate}</h2>
            <h2>Highest Level of Education: {client.data?.education}</h2>
            <h2>Email address: {client.data?.emailAddress}</h2>
            <h2>Pool: {client.data?.poolAssignment}</h2>
            <h2>Linkedin:{client.data?.linkedin}</h2>
            <h2>Pathway: {client.data?.pathway}</h2>
            <h2>Technical Certificates: {client.data?.technicalCertificates.map((c)=>`${c.name}, `)}</h2>
            {
            //TODO fix bug where if you have a note selected to update and swap tabs it will add it to the new tab
            }
            <div className="">
                <Tabs tabs={
                [
                {label:"General Notes",content:<NoteContainer key="Gen" noteType={NoteType.GENERAL} jsId={params.id} notes={notes.generalNotes}/>},
                {label:"Meeting Notes",content:<NoteContainer key="Meet" noteType={NoteType.MEETING} jsId={params.id} notes={notes.meetingNotes}/>},
                {label:"Follow Up Notes",content:<NoteContainer key="Follow" noteType={NoteType.FOLLOWUP} jsId={params.id} notes={notes.followUpNotes}/> }
                ]}/>
            </div> 
        </main>
    );
}




