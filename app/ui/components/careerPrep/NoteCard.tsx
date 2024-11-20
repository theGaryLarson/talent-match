'use client'
import { NoteDTO } from "@/app/lib/admin/careerPrep";
import { useRouter } from "next/navigation";
export default function NoteCard(props:NoteDTO){
    const router = useRouter();
    return(
        <div className="border">
            <h3 className="text-sm text-gray-600">Author: {props.authorName} Posted: {props.updatedAt} <button onClick={()=>{
                fetch('/api/admin/career-prep/delete-student-notes/'+props.id, {
            method: 'DELETE', 
              headers: {
                'Content-Type': 'application/json'
              },
            });
            router.refresh();
            }
            }>delete</button></h3>
            <hr/>
        <div dangerouslySetInnerHTML={{__html:props.noteContent}}></div>
        </div>
   );
}