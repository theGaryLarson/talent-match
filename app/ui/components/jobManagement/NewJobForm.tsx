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
import { EmploymentType, OccupationCode } from "@/app/lib/admin/jobTracking";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import TagsWithAutocomplete from "../mui/TagsWithAutocomplete";
import SingleSelectCheckmarks from "../mui/SingleSelectFilter";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import { TechnologyAreaDropdownDTO } from "@/data/dtos/TechnologyAreaDropdownDTO";

const steps = [
  "Job Information",
  "Employment Information",
  "Qualifications",
  "Publish",
];

export default function NewJobForm({
  job_posting,
}: {
  job_posting?: JobPostCreationDTO;
}) {
  // let job_posting_id;
  const [activeStep, setActiveStep] = useState(0);

  // Step 0: Job Information state
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [techArea, setTechArea] = useState("");
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
  const [employmentDuration, setEmploymentDuration] = useState("");
  const [employmentIsPermanent, setEmploymentIsPermanent] =
    useState("permanent");
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [startingPayRange, setStartingPayRange] = useState("");
  const [endingPayRange, setEndingPayRange] = useState("");
  const [compensationType, setCompensationType] = useState("");

  // Step 2: Qualifications state
  const [requiredSkills, setRequiredSkills] = useState<SkillDTO[]>([]);
  const [trainingRequirements, setTrainingRequirements] = useState("");
  const [requiredCertifications, setRequiredCertifications] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  if (job_posting) {
    // Set states and job_posting_id
  }

  const isStepValid = () => {
    if (activeStep === 0) {
      return (
        jobTitle.trim() !== "" &&
        jobDescription.trim() !== "" &&
        occupationCode.trim() !== "" &&
        applicationDeadline
      );
    }
    if (activeStep === 1) {
      const basicValid =
        employmentType.trim() !== "" &&
        location.trim() !== "" &&
        workEnvironment.trim() !== "";
      const durationValid =
        employmentIsPermanent === "permanent" ||
        (employmentIsPermanent === "temporary" &&
          employmentDuration.trim() !== "");
      const compensationValid =
        !paidPosition ||
        (startingPayRange.trim() !== "" &&
          endingPayRange.trim() !== "" &&
          compensationType.trim() !== "");
      return basicValid && durationValid && compensationValid;
    }
    if (activeStep === 2) {
      return requiredSkills.length > 0;
    }
    return true;
  };

  const handlePublish = async () => {
    const jobListingData: JobPostCreationDTO = {
      job_title: jobTitle,
      job_post_url: jobUrl,
      job_description: jobDescription,
      sector_id: industry,
      tech_area_id: techArea,
      occupation_code: occupationCode,
      unpublish_date: applicationDeadline,
      employment_type: employmentType,
      location: workEnvironment,
      zip: location,
      is_paid: paidPosition,
      salary_range:
        "$" +
        startingPayRange +
        " - $" +
        endingPayRange +
        (compensationType === "hourly" ? " / hr" : " / year"),
      skillIds: requiredSkills.map((skill) => skill.skill_id),
      is_apprenticeship: apprenticeship,
      relocation_services: relocation,
      visa_sponsorship: visaSponsor,
    };
    try {
      const response = await fetch("/api/joblistings/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobListingData),
      });

      if (!response.ok) {
        console.error("Failed to create job listing");
        return;
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error creating job listing:", error);
    }
    console.log("Publishing job with data: ", jobListingData);
  };

  const handleUpdate = async () => {};

  function handleNext() {
    if (isStepValid()) {
      setActiveStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    setActiveStep((prev) => prev - 1);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stepper
        activeStep={activeStep}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                {label == "Publish"
                  ? job_posting
                    ? "Update"
                    : "Publish"
                  : "Publish"}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography
        sx={{ justifySelf: "center", display: { xs: "flex", sm: "none" } }}
      >
        {activeStep + 1} / {steps.length}
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {steps[activeStep]}
      </Typography>
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
              <SingleSelectFilterAutoload<IndustrySectorDropdownDTO>
                id="newjobform-Industry"
                label=""
                apiAutoloadRoute="/api/employers/industry-sectors"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                getOptionLabel={(option: IndustrySectorDropdownDTO) =>
                  option.sector_title
                }
                getOptionValue={(option: IndustrySectorDropdownDTO) =>
                  option.industry_sector_id
                }
              />
              <FormHelperText>
                Select the industry that best fits this role
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Tech Area</FormLabel>
              <SingleSelectFilterAutoload<TechnologyAreaDropdownDTO>
                id="newjobform-tech-area"
                label=""
                apiAutoloadRoute="/api/employers/technology-areas"
                value={techArea}
                onChange={(e) => setTechArea(e.target.value)}
                getOptionLabel={(option: TechnologyAreaDropdownDTO) =>
                  option.title
                }
                getOptionValue={(option: TechnologyAreaDropdownDTO) =>
                  option.id
                }
              />
              <FormHelperText>
                Select the technology area that best fits this role
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
              <FormLabel required>Employment Duration</FormLabel>
              <Grid2 container direction="row" spacing={2}>
                <TextField
                  required
                  disabled={employmentIsPermanent === "permanent"}
                  placeholder="3 Months"
                  value={employmentDuration}
                  onChange={(e) => setEmploymentDuration(e.target.value)}
                  helperText="Expected duration of employment"
                />
                <RadioGroup
                  value={employmentIsPermanent}
                  onChange={(e) => setEmploymentIsPermanent(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="permanent"
                    control={<Radio />}
                    label="Permanent"
                  />
                  <FormControlLabel
                    value="temporary"
                    control={<Radio />}
                    label="Temporary"
                  />
                </RadioGroup>
              </Grid2>
            </FormControl>

            <FormControl fullWidth>
              <Grid2 container direction="row" spacing={2}>
                <div>
                  <FormLabel required>Location</FormLabel>
                  <TextField
                    fullWidth
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></TextField>
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
            <div>
              <FormControl>
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
            </div>
            <FormControl fullWidth disabled={!paidPosition}>
              <FormLabel required>Compensation</FormLabel>
              <Grid2 container direction="row" spacing={2}>
                <TextField
                  required
                  disabled={!paidPosition}
                  placeholder="40,000"
                  value={startingPayRange}
                  onChange={(e) => setStartingPayRange(e.target.value)}
                  helperText="Start range"
                />
                <TextField
                  required
                  disabled={!paidPosition}
                  placeholder="80,000"
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
                  setRequiredSkills(val);
                }}
                initialTags={requiredSkills.map((skill) => skill.skill_name)}
                searchPlaceholder="Skill (ex: Java)"
                getTagLabel={(option: SkillDTO) => option.skill_name}
                getTagLink={(option: SkillDTO) => option.skill_info_url}
              />
              <FormHelperText>
                Enter five required skills needed for this role. Start typing to
                see suggestions and select multiple skill
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Training Requirements</FormLabel>
              <TextField
                value={trainingRequirements}
                onChange={(e) => setTrainingRequirements(e.target.value)}
                helperText="Enter required training"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Required Certifications</FormLabel>
              <TextField
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
                <strong>Tech Area:</strong> {techArea}
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
                <strong>Required Skills:</strong>{" "}
                {requiredSkills.map((skill) => skill.skill_name)}
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
          <PillButton
            color="secondary"
            disabled={activeStep == 0}
            onClick={handleBack}
          >
            Back
          </PillButton>
          {activeStep !== 3 ? (
            <PillButton
              color="secondary"
              startIcon={<ArrowCircleRightOutlined />}
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Continue
            </PillButton>
          ) : (
            <PillButton
              color="secondary"
              startIcon={<FileUploadOutlined />}
              onClick={job_posting ? handleUpdate : handlePublish}
              disabled={!isStepValid()}
            >
              {job_posting ? "Update" : "Publish"}
            </PillButton>
          )}
        </Grid2>
      </Stack>
    </LocalizationProvider>
  );
}
