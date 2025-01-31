"use client";
import { CareerPrepStatus } from "@/app/lib/admin/careerPrep";
import { useRouter } from "next/navigation";

export default function EnrollmentStatusDropDown(props: {
  careerPrepEnrollmentStatus: CareerPrepStatus;
  jobseekerId: string;
}) {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //todo add fetch call here to update status
    const newStatus = event.target.value as CareerPrepStatus;
    console.log("change detected: ", props.jobseekerId);
    fetch("/api/admin/career-prep/update-card/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobseekerId: props.jobseekerId,
        status: newStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          event.target.value = props.careerPrepEnrollmentStatus;
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated successfully:", data);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  return (
    <select
      onChange={handleChange}
      defaultValue={props.careerPrepEnrollmentStatus}
    >
      {props.careerPrepEnrollmentStatus == undefined ? (
        <option>Unknown</option>
      ) : (
        ""
      )}
      {Object.values(CareerPrepStatus).map((stat) => (
        <option
          key={stat}
          value={stat}
          //   selected={stat == props.careerPrepEnrollmentStatus}
        >
          {stat}
        </option>
      ))}
    </select>
  );
}
