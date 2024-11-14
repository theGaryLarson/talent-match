import { getCareerPrepStudentDetailView, getCareerPrepStudentNotes } from "@/app/lib/admin/careerPrep";
import MarkDownEditor from "@/app/ui/components/mdEditor/MarkDownEditor";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const notes = await getCareerPrepStudentNotes(params.id)
    /**
     * TODO:
     * seperate note types into sections (styling)
     * add a add note button: when clicked a MarkDowneditorshould appear and when makrdown editor is submited it should go away and the list of notes updated
     * allow edit/delete of prevous notes
     */
    return(
        <main className="space-y-3 pr-[200px]">
            <h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1>
            <h2>Status: {client.data?.prepEnrollmentStatus}</h2>
            <h2>Email Adress: {client.data?.emailAddress}</h2>
            <h2>Pool: {client.data?.poolAssignment}</h2>
            <div>
            <h3>Follow Up Notes:</h3>
            {notes.followUpNotes.map((n)=><p>{n.noteContent}</p>)}
            </div>
            <div>
            <h3>General Notes: </h3>
            {notes.followUpNotes.map((n)=><p>{n.noteContent}</p>)}
            </div>
            <div>
            <h3>Meeting Notes: </h3>
            {notes.meetingNotes.map((n)=><p>{n.noteContent}</p>)}
            </div>
            <MarkDownEditor title={"This is a title"}/>
        </main>
    );
}