import { getAllJobPosts } from "@/app/lib/joblistings";
import JobTrackingTable from "@/app/ui/components/careerPrep/JobTrackingTable";
import { auth } from "@/auth";
import { sendWelcomeEmail } from "@/lib/smtp/send-welcome-email";
import * as React from "react";

export default async function Page() {
    const jobposts = await getAllJobPosts();
    console.log(JSON.stringify(jobposts,null,4))
    const session = await auth();
    // if(session?.user.email && session.user.name){
    //     await sendWelcomeEmail({
    //         name:session.user.name,
    //         recipient:session.user.email
    //     });
    // }
    if(!jobposts){
        return <></>
    }
    return(
        <main className="flex flex-col">
        <h1>job tracking</h1>
        <JobTrackingTable data={jobposts} />
        </main>
    );
}

