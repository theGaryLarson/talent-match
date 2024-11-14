import { getCareerPrepStudentDetailView, getCareerPrepStudentNotes } from "@/app/lib/admin/careerPrep";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id)
    return(
        <main>
            <h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName}</h1>


            <h3>Follow Up Notes:</h3>
            {notes.followUpNotes.map((n)=><p>{n.noteContent}</p>)}
            <h3>General Notes: </h3>
            {notes.followUpNotes.map((n)=><p>{n.noteContent}</p>)}
            <h3>Meeting Notes: </h3>
            {notes.meetingNotes.map((n)=><p>{n.noteContent}</p>)}
        </main>
    );
}