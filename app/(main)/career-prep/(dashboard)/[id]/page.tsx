import {getCareerPrepStudentDetailView, getCareerPrepStudentNotes, getMeetingByJobSeeker, NoteType } from "@/app/lib/admin/careerPrep";
import AddMeetingModal from "@/app/ui/components/careerPrep/AddMeetingModal";
import BasicModal from "@/app/ui/components/careerPrep/BasicModal";
import EnrollmentStatusDropDown from "@/app/ui/components/careerPrep/EnrollmentStatusDropDown";
import NoteContainer from "@/app/ui/components/careerPrep/NoteContainer";
import Tabs from "@/app/ui/components/Tabs";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id);
    const meetings = await getMeetingByJobSeeker(params.id);
    if(!client.data){
        return <div><h1>ERROR</h1></div>
    }
    return(
        <main className="space-y-3 pr-[100px] w-full">
            <div className="inline-flex"><h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1><AddMeetingModal jsId={params.id}/></div>
            <h2><b>Status:</b><EnrollmentStatusDropDown careerPrepEnrollmentStatus={client.data?.prepEnrollmentStatus} jobseekerId={params.id}/></h2>
            
            {/* <BasicModal buttonText="Add Meeting info"><p>texter</p></BasicModal> */}
            <h2><b>Assessment Date:</b>{client.data?.assessmentDate}</h2>
            <h2><b>Highest Level of Education:</b> {client.data?.education}</h2>
            <h2><b>Email address:</b> {client.data?.emailAddress}</h2>
            <h2><b>Pool:</b> {client.data?.poolAssignment}</h2>
            <h2><b>Linkedin:</b><a href={client.data?.linkedin}></a>{client.data?.linkedin}</h2>
            <h2><b>Pathway:</b> {client.data?.pathway}</h2>
            <h2><b>Technical Certificates:</b> {client.data?.technicalCertificates.map((c)=>`${c.name}, `)}</h2>
            <h2><b>Meetings:</b></h2>
            {meetings?.map((meeting)=>(<p key={meeting.id}>{meeting.title} {meeting.meetingDate.toLocaleString()}</p>))}
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




