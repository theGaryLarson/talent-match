import { getAllJobPosts } from "@/app/lib/joblistings";
import { auth } from "@/auth";
import { sendWelcomeEmail } from "@/lib/smtp/send-welcome-email";

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
    return(
        <>
        <h1>job tracking</h1>
        </>
    );
}