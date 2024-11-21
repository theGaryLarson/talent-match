'use client'
import { NoteDTO } from "@/app/lib/admin/careerPrep";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MarkDownEditor from "../mdEditor/MarkDownEditor";
export default function NoteCard(props:NoteDTO){
    const router = useRouter();
    const [editMode, setEditMode] = useState<boolean>(false);
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
      setEditMode(!editMode);
    }
    if(editMode){
      return(
        <div>
          <h3 className="text-sm text-gray-600">Author: {props.authorName} Posted: {props.updatedAt} <button onClick={deleteNote}>delete</button> <button onClick={toggleEditMode}>edit</button></h3>
          <hr/>
          <MarkDownEditor title={""} noteType={props.noteType} jobseekerId={props.jobseekerId} noteid={props.id} starterContent={props.noteContent} setEdit={setEditMode}/>
        </div>
      );
    }
    return(
        <div >
            <h3 className="text-sm text-gray-600">Author: {props.authorName} Posted: {props.updatedAt} <button onClick={deleteNote}>delete</button><button onClick={toggleEditMode}>edit</button></h3>
            <hr/>
        <div className="ql-editor border" dangerouslySetInnerHTML={{__html:props.noteContent}}></div>
        </div>
   );
}