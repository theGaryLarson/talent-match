'use client'

import { useState } from "react";
import React, { MouseEvent } from 'react';
export default function ApplyToJobButton(params: {id:string}){
  const [hasApplied, setHasApplied] = useState<boolean>(false)
    const save = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            setHasApplied(true)
            const response = await fetch(`/api/joblistings/apply/${params.id}`, {
              method: 'POST', // or 'PUT', depending on the behavior of your API
              headers: {
                'Content-Type': 'application/json'
              },
            });
        
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Job post saved successfully:', data);
            return data;
          } catch (error) {
            console.error('Error saving job post:', error);
          }
    }
return <button className="box-border w-fit rounded-full bg-blue-background px-10 py-3 text-white hover:bg-blue-400" disabled={hasApplied} onClick={save}>{hasApplied?'Applied':'Apply'}</button>
}