"use client";

import React, { useState } from "react";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import PillButton from "../PillButton";
import { Add, Clear } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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
  const [hasApplied, setHasApplied] = useState<boolean>(
    appliedStatus == JobStatus.Applied ||
      appliedStatus == JobStatus.Contacted ||
      appliedStatus == JobStatus.ScreeningScheduled ||
      appliedStatus == JobStatus.Screened ||
      appliedStatus == JobStatus.Recommended ||
      appliedStatus == JobStatus.Interviewing ||
      appliedStatus == JobStatus.Negotiating ||
      appliedStatus == JobStatus.Accepted ||
      appliedStatus == JobStatus.NoResponse ||
      appliedStatus == JobStatus.NotSelected,
  );
  const [openConfirm, setOpenConfirm] = useState(false);

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
        setOpenConfirm(true);
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  async function handleConfirmWithdraw() {
    setOpenConfirm(false);
    setHasApplied(false);
    try {
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
    } catch (error) {
      console.error("Error updating application:", error);
    }
  }

  function handleCancelWithdraw() {
    setOpenConfirm(false);
  }

  return (
    <>
      {hasApplied ? (
        <PillButton
          color="error"
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
          onClick={handleApplicationClick}
        >
          Withdraw Consideration
        </PillButton>
      ) : (
        <PillButton
          color="secondary"
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
          onClick={handleApplicationClick}
        >
          Be Considered
        </PillButton>
      )}
      <Dialog
        open={openConfirm}
        onClose={handleCancelWithdraw}
        slotProps={{
          paper: { sx: { borderRadius: "16px", width: "290px", m: 0 } },
        }}
      >
        <DialogTitle sx={{ m: 2, p: 0 }}>
          Are you sure you want to withdraw your consideration for this job?
        </DialogTitle>
        <DialogContent sx={{ mx: 2, mb: 2, p: 0 }}>
          Withdrawing means you will no longer be considered for this specific
          role. You can re-apply if the position is still open.
        </DialogContent>
        <DialogActions
          disableSpacing
          sx={{ m: 2, p: 0, justifyContent: "center", gap: 2 }}
        >
          <PillButton
            size="small"
            color="inherit"
            variant="contained"
            onClick={handleCancelWithdraw}
            sx={{ color: "secondary.main" }}
          >
            No, Cancel
          </PillButton>
          <PillButton
            size="small"
            color="inherit"
            sx={{
              color: "neutral.black",
              bgcolor: "error.light",
              "&:hover": {
                backgroundColor: "#dfbebd",
              },
            }}
            onClick={handleConfirmWithdraw}
          >
            Yes, Withdraw
          </PillButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
