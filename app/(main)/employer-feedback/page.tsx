import { getictjobs } from "@/app/lib/EmployerFeedback";
import EmployerFeedbackForm from "@/app/ui/components/feedback-forms/EmployerFeedbackForm";

export default function page(){
    const jobs = getictjobs();
    return<>
    <EmployerFeedbackForm/>
    </>
}