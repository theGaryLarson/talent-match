'use client'

import React from 'react';
import { useRouter } from "next/navigation";
import { useQuill } from 'react-quilljs';
//https://github.com/gtgalone/react-quilljs#readme
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { CreateNoteDTO, NoteType, UpdateNoteDTO } from '@/app/lib/admin/careerPrep';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
export default function MarkDownEditor (props:{title:string, noteType:NoteType, jobseekerId:string, noteid?:string, starterContent?:string, setEdit?:Function}){
  const theme = 'snow';
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
  
      [{ list: 'ordered'}],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
  
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const placeholder = 'Compose an epic...';

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ];
    const { quill, quillRef } = useQuill();;
    const router = useRouter();
    React.useEffect(() => {
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(props.starterContent??'');
        quill.on('text-change', (delta, oldDelta, source) => {
          console.log('Text change!');
          console.log(quill.getText()); // Get text only
          console.log(quill.getContents()); // Get delta contents
          console.log(quill.root.innerHTML); // Get innerHTML using quill
          console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        });
      }
    }, [quill]);
    const ClearNote = ()=>{
      quill?.setContents([])
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = quill?.root.innerHTML; // Get editor content as HTML
        const req:CreateNoteDTO = {
          jobseekerId: props.jobseekerId,
          noteType: props.noteType,
          noteContent: content ??''
        }
        try {
          const response = await fetch('/api/admin/career-prep/add-student-notes', {//still needs backend api
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
          });
    
          if (response.ok) {
            console.log('Content submitted successfully');
            ClearNote();
            router.refresh();
          } else {
            console.error('Error submitting content');
          }
        } catch (error) {
          console.error('Request failed', error);
        }
      };
      const deleteNote = ()=>{
        fetch('/api/admin/career-prep/delete-student-notes/'+(props.noteid??''), {
    method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    router.refresh();
    }
    const handleUpdate = async (e:React.FormEvent) =>{
      e.preventDefault();
        const content = quill?.root.innerHTML; // Get editor content as HTML
        const req:UpdateNoteDTO = {
          noteId: props.noteid??'',
          noteType: props.noteType,
          noteContent: content ??''
        }
        try {
          if(props.setEdit == undefined){
            return
          }
          const response = await fetch('/api/admin/career-prep/update-student-notes', {//still needs backend api
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
          });
    
          if (response.ok) {
            console.log('Content submitted successfully');
            props.setEdit(false)
            router.refresh();
          } else {
            console.error('Error submitting content');
          }
        } catch (error) {
          console.error('Request failed', error);
        }
    }
    return (
        <div className='h-[500px]'>
      <div  className='w-[800px] h-[300px]'>
        <div ref={quillRef} />
        {props.noteid?
        <>
        <button className='border w-[400px] h-[60px] bg-gray-200' onClick={deleteNote}>Delete Note</button>
        <button className='border w-[400px] h-[60px] bg-blue-background text-white' onClick={handleUpdate}>Update Note</button>
        </>
        :
        <>
        <button className='border w-[400px] h-[60px] bg-gray-200' onClick={ClearNote}>Clear Note</button>
        <button className='border w-[400px] h-[60px] bg-blue-background text-white' onClick={handleSubmit}>Add Note</button>
        </>}
      </div>
      </div>
    );
  };