import { getictjobs } from "@/app/lib/EmployerFeedback";
import EmployerFeedbackForm from "@/app/ui/components/feedback-forms/EmployerFeedbackForm";

export default async function page() {
  const jobs = await getictjobs();
  return (
    <>
      <EmployerFeedbackForm jobroles={jobs} />
    </>
  );
}
