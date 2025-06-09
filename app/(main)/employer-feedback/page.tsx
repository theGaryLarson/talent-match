import { getictjobs, getictjobsById } from "@/app/lib/EmployerFeedback";
import EmployerFeedbackForm from "@/app/ui/components/feedback-forms/EmployerFeedbackForm";

export default async function page() {
  const jobs = await getictjobs();
  if (jobs.length < 1) {
    return <></>;
  }
  const job = await getictjobsById(jobs[0].id ?? "");
  return <>{job != null ? <EmployerFeedbackForm jobroleId={job.id} /> : ""}</>;
}
