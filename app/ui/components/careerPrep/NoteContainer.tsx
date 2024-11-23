'use client'
import { NoteType, NoteDTO } from "@/app/lib/admin/careerPrep";
import MarkDownEditor from "../mdEditor/MarkDownEditor";
import NoteCard from "./NoteCard";
import { useEffect, useState } from "react";
import { AddBoxOutlined, AddOutlined } from "@mui/icons-material";

export default function NoteContainer(params:{noteType:NoteType, jsId:string, notes:NoteDTO[] }){
    const [selectedNoteId, setSelectedNoteId] = useState<string>('')
    const [starterContent, setStarterContent] = useState<string>('')
    const handleNoteSelection = (noteId: string, noteContent: string) => {
        setSelectedNoteId(noteId);
        setStarterContent(noteContent);
    };
    const NewNote = ()=>{
        setSelectedNoteId('')
        setStarterContent('')
    }
    return(
<div className="flex">
<MarkDownEditor
                key={selectedNoteId || params.noteType as string} // Ensure a unique key for each selection
                noteType={params.noteType} // Use dynamic noteType from params
                jobseekerId={params.jsId}
                noteid={selectedNoteId}
                starterContent={starterContent}
            />
    <div className="h-[500px] overflow-auto">
        <button className='border w-[750px] h-[60px] bg-blue-background text-white' onClick={NewNote}>New Note <AddOutlined/></button>
        {params.notes.map((n)=><NoteCard UpdateSelectedId={handleNoteSelection} key={n.id} {...n}/>)}
    </div>
        
</div>
    );
}