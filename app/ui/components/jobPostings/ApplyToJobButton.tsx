'use client'

import { useState } from "react";
import React, { MouseEvent } from 'react';
export default function ApplyToJobButton({ id }:{id:string}){
  const [fetchIsHappening, setFetchIsHappening] = useState<boolean>(false);
  const [hasApplied, setHasApplied] = useState<boolean>(false);

  const handleApplicationClick = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log('test',id);
    try {
      setFetchIsHappening(true);
      if (!hasApplied) {
        const response = await fetch(`/api/joblistings/apply/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('error',response);
          throw new Error('Failed to update application status. ');
        }
        setHasApplied(true);
      }
      else {
        const response = await fetch(`/api/joblistings/withdraw/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update application status');
        }
        setHasApplied(false);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setFetchIsHappening(false);
    }
  }

  return <button className="box-border w-fit rounded-full bg-blue-background px-10 py-3 text-white hover:bg-blue-400" disabled={fetchIsHappening} onClick={handleApplicationClick}>{hasApplied?'Withdraw Application':'Apply'}</button>
}