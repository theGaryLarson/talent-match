'use client'

import React from 'react';

import { useQuill } from 'react-quilljs';
//https://github.com/gtgalone/react-quilljs#readme
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { CreateNoteDTO, NoteType } from '@/app/lib/admin/careerPrep';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
export default (props:{title:string, noteType:NoteType, jobseekerId:string}) => {
    const { quill, quillRef } = useQuill();
  
    React.useEffect(() => {
      if (quill) {
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
          } else {
            console.error('Error submitting content');
          }
        } catch (error) {
          console.error('Request failed', error);
        }
      };
    
    return (
        <div className='h-[500px]'>
      <div  className='w-[800px] h-[300px]'>
        <div ref={quillRef} />
        <button className='border w-[400px] h-[60px] bg-gray-200' onClick={ClearNote}>Clear Note</button>
        <button className='border w-[400px] h-[60px] bg-blue-background text-white' onClick={handleSubmit}>Add Note</button>
      </div>
      </div>
    );
  };