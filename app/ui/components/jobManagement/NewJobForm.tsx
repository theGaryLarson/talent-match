"use client";

import { Stepper, FormControl, FormLabel, TextField, Step, StepLabel, Typography, Select, FormHelperText, Stack, Grid2, Box, Link } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import PillButton from "../PillButton";
import { ArrowCircleRightOutlined, FileUploadOutlined } from "@mui/icons-material";

const steps = ['Job Information', 'Employment Information', 'Qualifications', 'Publish'];

export default function NewJobForm() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography variant="h5">{steps[activeStep]}</Typography>
      <Stack>
        {activeStep === 0 && <FormControl>
          <FormLabel required>Job Title</FormLabel>
          <TextField required helperText="Enter a clear and concise job title (e.g., Senior Software Engineer, Marketing Manager)" />

          <FormLabel>Job URL</FormLabel>
          <TextField helperText="Enter a URL to the job post, if applicable" />

          <FormLabel required>Job Description</FormLabel>
          <TextField
            required
            helperText="Provide a detailed description of the job responsibilities, requirements, and qualifications. Use formatting tools to structure your description for better readability"
            multiline
            rows={5}
          />

          <FormLabel required>Industry</FormLabel>
          <Select required />
          <FormHelperText>Select the industry that best fits this role (e.g., Information Technology, Healthcare, Finance)</FormHelperText>

          <FormLabel required>Tech Pathway</FormLabel>
          <Select required />
          <FormHelperText>Choose the specific pathway that aligns with this role (e.g., Software Engineering, Data Science, Cybersecurity)</FormHelperText>

          <FormLabel required>Occupation Code (NAICS)</FormLabel>
          <Select required />
          <FormHelperText>Select an occupation code that best fits this role (e.g., Software Developers 15-1252, Data Scientists 15-2051)</FormHelperText>

          <FormLabel required>Application Deadline</FormLabel>
          <DatePicker disablePast />
          <FormHelperText>Select the deadline for applications. Applicants received after this date will not be considered</FormHelperText>
        </FormControl>}
        {activeStep === 1 && <FormControl>
          <FormLabel required>Employment Type</FormLabel>
          <TextField required helperText="Select the employment type for this role" />

          <FormLabel required>Location</FormLabel>
          <Select required />
          <FormHelperText>Enter the location of the role. You can start typing to see suggestions</FormHelperText>

          <FormLabel required>Work Environment</FormLabel>
          <Select required />
          <FormHelperText>Enter the work environment of the role. (e.g., Remote, Hybrid, In Person)</FormHelperText>

          <FormLabel required>Compensation</FormLabel>
          <TextField required helperText="Enter the starting pay range" />
          <TextField required helperText="Enter the ending pay range" />
        </FormControl>
        }
        {activeStep === 2 && <FormControl>
          <FormLabel required>Top 5 required skills</FormLabel>
          <TextField required helperText="Enter five required skills needed for this role. Start typing to see suggestions and select multiple skills" />

          <FormLabel required>Training Requirements</FormLabel>
          <TextField required helperText="Enter the required training needed for this role. Start typing to see suggestions and select multiple skills" />

          <FormLabel required>Required Certifications</FormLabel>
          <TextField required helperText="Enter the required certifications needed for this role. Start typing to see suggestions and select multiple skills" />

          <FormLabel required>Minimum Level of Education</FormLabel>
          <Select required />
          <FormHelperText>Select the minimum level of education for this role (e.g., High School, Some College, Bachelor’s Degree)</FormHelperText>
          <FormLabel required>Minimum years of Experience</FormLabel>
          <Select required />
          <FormHelperText>Select the minimum level of experience for this role</FormHelperText>
        </FormControl>
        }
        {activeStep === 3 && <Box>
          <Typography>Please review the information below before publishing your job posting. You can edit any section by clicking the "Edit" link next to it.</Typography>
          <Box>
            <Stack spacing={2} direction="row">
              <Typography variant="h6">{steps[0]}</Typography>
              <Link component="button" onClick={() => setActiveStep(0)}>Edit</Link>
            </Stack>
            {/* Previous information entered in activeStep == 0 */}
          </Box>
          <Box>
            <Stack spacing={2} direction="row">
              <Typography variant="h6">{steps[1]}</Typography>
              <Link component="button" onClick={() => setActiveStep(1)}>Edit</Link>
            </Stack>
            {/* Previous information entered in activeStep == 1 */}
          </Box>
          <Box>
            <Stack spacing={2} direction="row">
              <Typography variant="h6">{steps[2]}</Typography>
              <Link component="button" onClick={() => setActiveStep(2)}>Edit</Link>
            </Stack>
            {/* Previous information entered in activeStep == 2 */}
          </Box>
        </Box>}

        <Grid2 container sx={{ justifyContent: "space-between" }}>
          <div></div>
          {activeStep !== 3 &&
           <PillButton color="secondary" startIcon={<ArrowCircleRightOutlined />} onClick={() => setActiveStep(activeStep => activeStep + 1)} >Continue</PillButton>}
          {activeStep === 3 && 
            <PillButton /*onSubmit={}*/ color="secondary" startIcon={<FileUploadOutlined />}>Publish</PillButton>
          }
        </Grid2>
      </Stack>
    </LocalizationProvider>
  );
}
