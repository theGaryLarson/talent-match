"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function SelfAssignCaseButton(props: { jobseekerId: string }) {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const response = await fetch("/api/admin/career-prep/self-assign-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobseekerId: props.jobseekerId }),
      });

      if (!response.ok) {
        console.error("Failed to self-assign case:", await response.text());
      } else {
        console.log("Successfully self-assigned case");
        router.refresh();
      }
    } catch (error) {
      console.error("Error while self-assigning case:", error);
    }
  };
  return <Button onClick={handleClick}>Claim</Button>;
}
