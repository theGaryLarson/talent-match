import { getictjobs } from "@/app/lib/EmployerFeedback";
import EmployerFeedbackForm from "@/app/ui/components/feedback-forms/EmployerFeedbackForm";

export default async function page() {
  const jobs = await getictjobs();
  return (
    <>
      {
        jobs.length > 0?<EmployerFeedbackForm jobroles={jobs} jobroleId={jobs[0].id} />:''
      }

      
    </>
  );
}
