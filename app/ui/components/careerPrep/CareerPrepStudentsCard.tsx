import { CareerPrepJobseekerCardViewDTO } from "@/app/lib/admin/careerPrep";

export default function CareerPrepStudentsCard(props:CareerPrepJobseekerCardViewDTO){
    return (
        <div className="w-full rounded-lg border border-2 border-cyan-600 p-2 phone:p-4">
            <h3>
                {props.firstName} {props.lastName}
            </h3>
        </div>
    );
}