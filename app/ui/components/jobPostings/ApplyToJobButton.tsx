"use client";

import React, { useState } from "react";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import PillButton from "../PillButton";
import { Add, Clear } from "@mui/icons-material";

interface Props {
  id: string;
  appliedStatus?: string;
  unPublishDate?: Date;
}

export default function ApplyToJobButton({
  id,
  appliedStatus = "",
  unPublishDate,
}: Props) {
  // Initial state based on appliedStatus
  const [hasApplied, setHasApplied] = useState<boolean>(
    appliedStatus == JobStatus.Screened ||
      appliedStatus == JobStatus.Applied ||
      appliedStatus == JobStatus.Interviewing ||
      appliedStatus == JobStatus.Negotiating ||
      appliedStatus == JobStatus.Accepted ||
      appliedStatus == JobStatus.NoResponse ||
      appliedStatus == JobStatus.NotSelected,
  );

  const session = useSession();
  const pathname = usePathname();

  const handleApplicationClick = async () => {
    if (!session?.data?.user) {
      const base = window.location.origin;
      const signInUrl = new URL("/signin", base);
      const callbackUrlValue = pathname;
      signInUrl.searchParams.set("callbackUrl", callbackUrlValue);
      redirect(signInUrl.toString());
    }
    try {
      if (!hasApplied) {
        setHasApplied(true);
        const response = await fetch(`/api/joblistings/apply/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setHasApplied(false);
          throw new Error("Failed to update application status.");
        }
      } else {
        setHasApplied(false);
        const response = await fetch(`/api/joblistings/withdraw/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setHasApplied(true);
          throw new Error("Failed to update application status");
        }
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return hasApplied ? (
    <PillButton
      startIcon={<Clear />}
      disabled={
        (unPublishDate && unPublishDate <= new Date()) ||
        appliedStatus == JobStatus.Screened ||
        appliedStatus == JobStatus.Interviewing ||
        appliedStatus == JobStatus.Negotiating ||
        appliedStatus == JobStatus.Accepted ||
        appliedStatus == JobStatus.NoResponse ||
        appliedStatus == JobStatus.NotSelected
      }
      disableElevation
      sx={{
        bgcolor: "error.bg",
        "&:hover": { bgcolor: "#ED251C" },
        "&:selected": { bgcolor: "#ED251C" },
      }}
      onClick={handleApplicationClick}
    >
      Withdraw Consideration
    </PillButton>
  ) : (
    <PillButton
      startIcon={<Add />}
      disabled={
        (unPublishDate && unPublishDate <= new Date()) ||
        appliedStatus == JobStatus.Screened ||
        appliedStatus == JobStatus.Interviewing ||
        appliedStatus == JobStatus.Negotiating ||
        appliedStatus == JobStatus.Accepted ||
        appliedStatus == JobStatus.NoResponse ||
        appliedStatus == JobStatus.NotSelected
      }
      disableElevation
      sx={{ bgcolor: "secondary.main" }}
      onClick={handleApplicationClick}
    >
      Be Considered
    </PillButton>
  );
}
