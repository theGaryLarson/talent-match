"use client";

import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import PillButton from "../PillButton";
import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { Box, Dialog, DialogTitle, Grid2 } from "@mui/material";
import NewJobForm from "./NewJobForm";

export default function NewJobFormButton({
  job_posting,
}: {
  job_posting?: JobPostCreationDTO;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PillButton color="secondary" startIcon={<Add />} onClick={handleOpen}>
        Post a New Job
      </PillButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ px: 2, pt: 2 }}>
          <Grid2 container sx={{ justifyContent: "flex-end" }}>
            <PillButton
              color="inherit"
              aria-label="close"
              startIcon={<Close />}
              onClick={handleClose}
              sx={{
                color: "secondary.main",
              }}
            >
              Close
            </PillButton>
          </Grid2>
        </DialogTitle>
        <Box sx={{ p: 2 }}>
          <NewJobForm job_posting={job_posting} />
        </Box>
      </Dialog>
    </>
  );
}
