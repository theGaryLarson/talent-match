import { CareerPrepJobseekerCardViewDTO } from "@/app/lib/admin/careerPrep";
import Link from "next/link";

export default function CareerPrepStudentsCard(props:CareerPrepJobseekerCardViewDTO){
    return (
        <div className="w-full rounded-lg border border-2 border-cyan-600 p-2 phone:p-4">
            <h3 className="text-xl">
                {props.firstName} {props.lastName} ({props.pronouns})
            </h3>
            <p>
                {props.careerPrepTrack}
            </p>
            <p>
                {props.assignedPool}
            </p>
            <p>
                {props.careerPrepEnrollmentStatus}
            </p>
            <p>
                {props.careerPrepExpectedEndDate?.toDateString()}
            </p>
            <Link href={'/career-prep/'+props.jobseekerId} className="LINK">
            View Details 
            </Link>
        </div>
    );
}