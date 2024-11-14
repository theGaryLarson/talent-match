'use client'

import React from 'react';

import { useQuill } from 'react-quilljs';
//https://github.com/gtgalone/react-quilljs#readme
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
export default (props:{title:string}) => {
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = quill?.root.innerHTML; // Get editor content as HTML
    
        try {
          const response = await fetch('', {//still needs backend api
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
    
          if (response.ok) {
            console.log('Content submitted successfully');
          } else {
            console.error('Error submitting content');
          }
        } catch (error) {
          console.error('Request failed', error);
        }
      };
    return (
        <div className='h-[500px]'>
    <h1 className='font-bold text-xl'>{props.title}</h1>
      <div  className='w-[750px] h-[300px]'>
        <div ref={quillRef} />
        <button onClick={handleSubmit}>Click Me</button>
      </div>
      </div>
    );
  };