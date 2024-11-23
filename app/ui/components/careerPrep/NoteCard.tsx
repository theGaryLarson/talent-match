'use client'
import { NoteDTO } from "@/app/lib/admin/careerPrep";
import { useRouter } from "next/navigation";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
export default function NoteCard(props:NoteDTO&{UpdateSelectedId:(a:string, b:string)=> void}){
    const router = useRouter();
    const deleteNote = ()=>{
                fetch('/api/admin/career-prep/delete-student-notes/'+props.id, {
            method: 'DELETE', 
              headers: {
                'Content-Type': 'application/json'
              },
            });
            router.refresh();
            }
    const toggleEditMode = ()=>{
      props.UpdateSelectedId(props.id, props.noteContent)
    }
    return(
        <div >
          <span className="flex items-center justify-between">
            <h3 className="text-sm text-gray-600">Posted: {props.updatedAt}</h3>
            <span className="flex gap-3 px-3">
            <button onClick={deleteNote}><DeleteForeverOutlinedIcon/>Delete</button>
            <button onClick={toggleEditMode}><EditOutlinedIcon/>Edit</button>
            </span>
            </span>
            <hr/>
        <div className="ql-editor border w-[750]" dangerouslySetInnerHTML={{__html:props.noteContent}}></div>
        </div>
   );
}