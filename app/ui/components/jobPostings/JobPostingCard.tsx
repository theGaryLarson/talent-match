'use client'
import { deleteJobListing } from "@/app/lib/joblistings";
import { MouseEventHandler, useState } from "react";

export default function JobPostingCard(params:{
    jobTitle:string,
    jobDescription:string,
    jobPostingId:string
}){
    const [isDeleted, setIsDeleted] = useState(false);
const removeJob = async ()=>{
        try {
            const response = await fetch(`/api/joblistings/delete/${params.jobPostingId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('Item deleted successfully: ',response);
            setIsDeleted(true)
          } catch (error) {
            console.error('There was a problem with the delete request:', error);
          }
        }
    if(isDeleted){
        return
    }
        

    return(
        <div className="border">
            <h1 className="text-xl font-bold">{params.jobTitle}</h1>
            <p>
                {params.jobDescription}
            </p>
            <button onClick={removeJob}>Delete</button>
        </div>
    );
}

