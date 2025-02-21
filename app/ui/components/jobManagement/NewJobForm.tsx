"use client";

import {
  Stepper,
  FormControl,
  FormLabel,
  TextField,
  Step,
  StepLabel,
  Typography,
  Select,
  FormHelperText,
  Stack,
  Grid2,
  Box,
  Link,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import PillButton from "../PillButton";
import {
  ArrowCircleRightOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import SingleSelectFilterAutoload from "../mui/SingleSelectFilterAutoload";
import { IndustrySectorDropdownDTO } from "@/data/dtos/IndustrySectorDropdownDTO";
import { CareerPrepPathways } from "@/app/lib/admin/careerPrep";
import { EmploymentType, OccupationCode } from "@/app/lib/admin/jobTracking";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import TagsWithAutocomplete from "../mui/TagsWithAutocomplete";
import SingleSelectCheckmarks from "../mui/SingleSelectFilter";

const steps = [
  "Job Information",
  "Employment Information",
  "Qualifications",
  "Publish",
];

export default function NewJobForm() {
  const [activeStep, setActiveStep] = useState(0);

  // Step 0: Job Information state
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [techPathway, setTechPathway] = useState("");
  const [occupationCode, setOccupationCode] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState<any>(null);

  // Step 1: Employment Information state
  const [employmentType, setEmploymentType] = useState("");
  const [paidPosition, setPaidPosition] = useState(false);
  const [internship, setInternship] = useState(false);
  const [apprenticeship, setApprenticeship] = useState(false);
  const [location, setLocation] = useState("");
  const [relocation, setRelocation] = useState(false);
  const [visaSponsor, setVisaSponsor] = useState(false);
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [startingPayRange, setStartingPayRange] = useState("");
  const [endingPayRange, setEndingPayRange] = useState("");
  const [compensationType, setCompensationType] = useState("");

  // Step 2: Qualifications state
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [trainingRequirements, setTrainingRequirements] = useState("");
  const [requiredCertifications, setRequiredCertifications] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  const handlePublish = () => {
    const formData = {
      jobTitle,
      jobUrl,
      jobDescription,
      industry,
      techPathway,
      occupationCode,
      applicationDeadline: applicationDeadline
        ? applicationDeadline.format("MM/DD/YYYY")
        : "",
      employmentType,
      location,
      workEnvironment,
      startingPayRange,
      endingPayRange,
      requiredSkills,
      trainingRequirements,
      requiredCertifications,
      educationLevel,
    };
    console.log("Publishing job with data: ", formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
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
        {activeStep === 0 && (
          <Stack spacing={3}>
            <FormControl fullWidth>
              <FormLabel required>Job Title</FormLabel>
              <TextField
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                helperText="Enter a clear and concise job title (e.g., Senior Software Engineer, Marketing Manager)"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Job URL</FormLabel>
              <TextField
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                helperText="Enter a URL to the job post, if applicable"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Job Description</FormLabel>
              <TextField
                multiline
                rows={5}
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                helperText="Provide a detailed description of the job responsibilities, requirements, and qualifications."
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Industry</FormLabel>
              <SingleSelectFilterAutoload
                id="newjobform-Industry"
                apiAutoloadRoute="/api/employers/industry-sectors"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                getOptionLabel={(options: IndustrySectorDropdownDTO) =>
                  options.sector_title
                }
              />
              <FormHelperText>
                Select the industry that best fits this role
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Tech Pathway</FormLabel>
              <Select
                required
                value={techPathway}
                onChange={(e) => setTechPathway(e.target.value)}
              >
                {Object.values(CareerPrepPathways).map((code) => (
                  <MenuItem key={code + 1} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Choose the specific pathway for this role
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Occupation Code (NAICS)</FormLabel>
              <Select
                required
                value={occupationCode}
                onChange={(e) => setOccupationCode(e.target.value)}
              >
                {Object.values(OccupationCode).map((code) => (
                  <MenuItem key={code + 1} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select an occupation code</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Application Deadline</FormLabel>
              <DatePicker
                disablePast
                value={applicationDeadline}
                onChange={(newValue) => setApplicationDeadline(newValue)}
              />
              <FormHelperText>
                Select the deadline for applications
              </FormHelperText>
            </FormControl>
          </Stack>
        )}

        {activeStep === 1 && (
          <Stack spacing={3}>
            <FormControl fullWidth>
              <Grid2 container direction="row" spacing={2}>
                <div>
                  <FormLabel required>Employment Type</FormLabel>
                  <Select
                    fullWidth
                    required
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                  >
                    {Object.values(EmploymentType).map((code) => (
                      <MenuItem key={code + 1} value={code}>
                        {code}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Select the employment type for this role
                  </FormHelperText>
                </div>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paidPosition}
                        onChange={(e) => setPaidPosition(e.target.checked)}
                        name="paid-position"
                      />
                    }
                    label="Paid Position"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={internship}
                        onChange={(e) => setInternship(e.target.checked)}
                        name="internship"
                      />
                    }
                    label="Internship"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={apprenticeship}
                        onChange={(e) => setApprenticeship(e.target.checked)}
                        name="apprenticeship"
                      />
                    }
                    label="Apprenticeship"
                  />
                </FormGroup>
              </Grid2>
            </FormControl>

            <FormControl fullWidth>
              <Grid2 container direction="row" spacing={2}>
                <div>
                  <FormLabel required>Location</FormLabel>
                  <Select
                    fullWidth
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></Select>
                  <FormHelperText>
                    Enter the location of the role
                  </FormHelperText>
                </div>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={relocation}
                        onChange={(e) => setRelocation(e.target.checked)}
                        name="relocation"
                      />
                    }
                    label="Relocation Assistance"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={visaSponsor}
                        onChange={(e) => setVisaSponsor(e.target.checked)}
                        name="visaSponsor"
                      />
                    }
                    label="H1B Visa Sponsorship"
                  />
                </FormGroup>
              </Grid2>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Work Environment</FormLabel>
              <Select
                required
                value={workEnvironment}
                onChange={(e) => setWorkEnvironment(e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
                <MenuItem value="on-site">On-Site</MenuItem>
              </Select>
              <FormHelperText>Enter the work environment</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Compensation</FormLabel>
              <Grid2 container direction="row" spacing={2}>
                <TextField
                  required
                  placeholder="40000"
                  value={startingPayRange}
                  onChange={(e) => setStartingPayRange(e.target.value)}
                  helperText="Start range"
                />
                <TextField
                  required
                  placeholder="80000"
                  value={endingPayRange}
                  onChange={(e) => setEndingPayRange(e.target.value)}
                  helperText="End range"
                />
                <RadioGroup
                  value={compensationType}
                  onChange={(e) => setCompensationType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="hourly"
                    control={<Radio />}
                    label="Hourly"
                  />
                  <FormControlLabel
                    value="annual"
                    control={<Radio />}
                    label="Annual"
                  />
                </RadioGroup>
              </Grid2>
            </FormControl>
          </Stack>
        )}

        {activeStep === 2 && (
          <Stack spacing={3}>
            <FormControl fullWidth>
              <FormLabel required>Top 5 required skills</FormLabel>
              <TagsWithAutocomplete
                fieldLabel=""
                apiSearchRoute="/api/skills/search/"
                id="employer-jobpost-skills"
                maxTags={5}
                searchingText="Searching..."
                noResultsText="No skills found..."
                onChange={(event: any, val: any) => {
                  const newVal = (val as SkillDTO[]).map(
                    (skill) => skill.skill_name,
                  );
                  setRequiredSkills(newVal);
                }}
                searchPlaceholder="Skill (ex: Java)"
                getTagLabel={(option: SkillDTO) => option.skill_name}
                getTagLink={(option: SkillDTO) => option.skill_info_url}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Training Requirements</FormLabel>
              <TextField
                required
                value={trainingRequirements}
                onChange={(e) => setTrainingRequirements(e.target.value)}
                helperText="Enter required training"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Required Certifications</FormLabel>
              <TextField
                required
                value={requiredCertifications}
                onChange={(e) => setRequiredCertifications(e.target.value)}
                helperText="Enter required certifications"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Minimum Level of Education</FormLabel>
              <SingleSelectCheckmarks
                id="jobpost-edulevel"
                label=""
                value={[educationLevel]}
                onChange={(event) => {
                  setEducationLevel(event.target.value as string);
                }}
                options={[
                  { label: "Any", value: "" },
                  { label: "Doctorate", value: "Doctorate" },
                  { label: "Master's Degree", value: "Master's Degree" },
                  { label: "Bachelor's Degree", value: "Bachelor's Degree" },
                  { label: "Associate's Degree", value: "Associates's Degree" },
                  {
                    label: "Vocational Qualification / Certification",
                    value: "Certificate (less than two years)",
                  },
                  {
                    label: "Post High School",
                    value: "Some training or study post high school",
                  },
                  {
                    label: "High School Diploma",
                    value: "High School Diploma",
                  },
                  { label: "GED", value: "GED" },
                  {
                    label: "No Formal Education",
                    value: "Not yet completed High School",
                  },
                ]}
              />
              <FormHelperText>Select education level</FormHelperText>
            </FormControl>
          </Stack>
        )}

        {activeStep === 3 && (
          <Box>
            <Typography>
              Please review the information below before publishing your job
              posting. You can edit any section by clicking the "Edit" link next
              to it.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="h6">Job Information</Typography>
                <Link component="button" onClick={() => setActiveStep(0)}>
                  Edit
                </Link>
              </Stack>
              <Typography>
                <strong>Job Title:</strong> {jobTitle}
              </Typography>
              <Typography>
                <strong>Job URL:</strong> {jobUrl}
              </Typography>
              <Typography>
                <strong>Description:</strong> {jobDescription}
              </Typography>
              <Typography>
                <strong>Industry:</strong> {industry}
              </Typography>
              <Typography>
                <strong>Tech Pathway:</strong> {techPathway}
              </Typography>
              <Typography>
                <strong>Occupation Code:</strong> {occupationCode}
              </Typography>
              <Typography>
                <strong>Application Deadline:</strong>{" "}
                {applicationDeadline
                  ? applicationDeadline.format("MM/DD/YYYY")
                  : ""}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="h6">Employment Information</Typography>
                <Link component="button" onClick={() => setActiveStep(1)}>
                  Edit
                </Link>
              </Stack>
              <Typography>
                <strong>Employment Type:</strong> {employmentType}
              </Typography>
              <Typography>
                <strong>Paid Position:</strong> {paidPosition.toString()}
              </Typography>
              <Typography>
                <strong>Internship:</strong> {internship.toString()}
              </Typography>
              <Typography>
                <strong>Apprenticeship:</strong> {apprenticeship.toString()}
              </Typography>
              <Typography>
                <strong>Location:</strong> {location}
              </Typography>
              <Typography>
                <strong>Relocation Assistance:</strong> {relocation.toString()}
              </Typography>
              <Typography>
                <strong>H1B Visa Sponsorship:</strong> {visaSponsor.toString()}
              </Typography>
              <Typography>
                <strong>Work Environment:</strong> {workEnvironment}
              </Typography>
              <Typography>
                <strong>Compensation:</strong> ${startingPayRange} - $
                {endingPayRange}
              </Typography>
              <Typography>
                <strong>Compensation Type:</strong> {compensationType}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="h6">Qualifications</Typography>
                <Link component="button" onClick={() => setActiveStep(2)}>
                  Edit
                </Link>
              </Stack>
              <Typography>
                <strong>Required Skills:</strong> {requiredSkills}
              </Typography>
              <Typography>
                <strong>Training Requirements:</strong> {trainingRequirements}
              </Typography>
              <Typography>
                <strong>Certifications:</strong> {requiredCertifications}
              </Typography>
              <Typography>
                <strong>Education Level:</strong> {educationLevel}
              </Typography>
            </Box>
          </Box>
        )}

        <Grid2 container sx={{ justifyContent: "space-between", mt: 3 }}>
          {activeStep > 0 ? (
            <PillButton
              color="secondary"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </PillButton>
          ) : (
            <div />
          )}
          {activeStep !== 3 ? (
            <PillButton
              color="secondary"
              startIcon={<ArrowCircleRightOutlined />}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Continue
            </PillButton>
          ) : (
            <PillButton
              color="secondary"
              startIcon={<FileUploadOutlined />}
              onClick={handlePublish}
            >
              Publish
            </PillButton>
          )}
        </Grid2>
      </Stack>
    </LocalizationProvider>
  );
}
