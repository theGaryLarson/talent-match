"use client";

import PillButton from "../PillButton";
import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import NewJobForm from "./NewJobForm";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";

export default function NewJobFormButton({
  onJobCreated,
}: {
  onJobCreated?: (job: JobPostCreationDTO) => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleJobCreated = (newJob: JobPostCreationDTO) => {
    if (onJobCreated) {
      onJobCreated(newJob);
    }
    handleClose();
  };

  return (
    <>
      <PillButton color="secondary" startIcon={<Add />} onClick={handleOpen}>
        Post a New Job
      </PillButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ px: 2, pt: 2 }}>
          New Job Form
          <PillButton
            color="inherit"
            aria-label="close"
            startIcon={<Close />}
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 16,
              color: "secondary.main",
            }}
          >
            Close
          </PillButton>
        </DialogTitle>
        <DialogContent>
          <NewJobForm job_posting={undefined} onJobUpdated={handleJobCreated} />
        </DialogContent>
      </Dialog>
    </>
  );
}
