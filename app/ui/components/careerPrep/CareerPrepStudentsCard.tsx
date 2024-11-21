import { CareerPrepJobseekerCardViewDTO, CareerPrepStatus } from "@/app/lib/admin/careerPrep";
import { ProgramEnrollmentStatus } from "@/data/dtos/JobSeekerProfileCreationDTOs";
import Link from "next/link";
import EnrollmentStatusDropDown from "./EnrollmentStatusDropDown";

export default function CareerPrepStudentsCard(props:CareerPrepJobseekerCardViewDTO){
    console.log(props.careerPrepEnrollmentStatus)
    return (
        <div className="w-full rounded-lg border border-2 border-cyan-600 p-2 phone:p-4">
            <h3 className="text-xl">
                {props.firstName} {props.lastName} ({props.pronouns})
            </h3>
            <p>
                Track: {props.careerPrepTrack}
            </p>
            <p>
                Assigned Pool: {props.assignedPool}
            </p>
            <p>
                Enrollment Status: <EnrollmentStatusDropDown careerPrepEnrollmentStatus={props.careerPrepEnrollmentStatus} jobseekerId={props.jobseekerId}/>
            </p>
            <p>
                Expected End Date: {props.careerPrepExpectedEndDate?.toDateString()}
            </p>
            <Link href={'/career-prep/'+props.jobseekerId} className="LINK">
            View Details 
            </Link>
            
            
        </div>
    );
}