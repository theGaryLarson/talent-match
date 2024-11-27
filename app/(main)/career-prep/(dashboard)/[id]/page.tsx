import {getCareerPrepStudentDetailView, getCareerPrepStudentNotes, NoteType } from "@/app/lib/admin/careerPrep";
import NoteContainer from "@/app/ui/components/careerPrep/NoteContainer";
import Tabs from "@/app/ui/components/Tabs";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id)
    return(
        <main className="space-y-3 pr-[100px] w-full">
            <h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1>
            <h2><b>Status:</b> {client.data?.prepEnrollmentStatus}</h2>
            <h2><b>Assessment Date:</b>{client.data?.assessmentDate}</h2>
            <h2><b>Highest Level of Education:</b> {client.data?.education}</h2>
            <h2><b>Email address:</b> {client.data?.emailAddress}</h2>
            <h2><b>Pool:</b> {client.data?.poolAssignment}</h2>
            <h2><b>Linkedin:</b><a href={client.data?.linkedin}></a>{client.data?.linkedin}</h2>
            <h2><b>Pathway:</b> {client.data?.pathway}</h2>
            <h2><b>Technical Certificates:</b> {client.data?.technicalCertificates.map((c)=>`${c.name}, `)}</h2>
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




