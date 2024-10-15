'use client'
import { deleteJobListing } from "@/app/lib/joblistings";
import { MouseEventHandler } from "react";

export default function JobPostingCard(params:{
    jobTitle:string,
    jobDescription:string,
    jobPostingId:string
    remove:(a: string) => void
}){

    return(
        <div className="border">
            <h1 className="text-xl font-bold">{params.jobTitle}</h1>
            <p>
                {params.jobDescription}
            </p>
            <button onClick={()=>{params.remove(params.jobPostingId)}}>Delete</button>
        </div>
    );
}

