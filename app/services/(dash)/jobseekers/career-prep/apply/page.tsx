"use client";
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import PillButton from "@/app/ui/components/PillButton";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import Confetti from "@/app/ui/components/Confetti";
import "@/app/ui/profile-creation.css";

// dnd-kit: React API
import { DragDropProvider, PointerSensor } from "@dnd-kit/react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/helpers";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isWAResident: boolean;

  pathway: string;
  highestEducation: string;
  currentlyEnrolledDegree: boolean;
  degreeCompletionWindow: string;

  collegeName: string;
  degreeProgram: string;

  hasTrainingProgram: boolean;
  trainingProvider?: string;

  hasCertifications: boolean;
  certifications: string[];

  weekdayAvailabilityRank: string[];
  timeblockAvailabilityRank: string[];
}

const PATHWAYS = [
  "Software Development",
  "Infrastructure and Operations",
  "Cybersecurity",
  "Data Science",
] as const;

const HIGHEST_ED = [
  "High School or GED",
  "Some College",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate / PhD",
  "Bootcamp / Certificate",
  "Other",
] as const;

const DEGREE_WINDOW = [
  "N/A",
  "0-3 months",
  "3-6 months",
  "6-9 months",
  "9-12 months",
  "12+ months",
] as const;

const CERTIFICATION_OPTIONS = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified Developer",
  "AWS Certified Solutions Architect",
  "Cardiopulmonary Resuscitation (CPR) Certification",
  "Certified Ethical Hacker",
  "Certified Information Systems Security Professional",
  "Certified Scrum Master",
  "Cisco Certified Network Associate",
  "CompTIA A+",
  "CompTIA Certification",
  "CompTIA Network+",
  "CompTIA Security+",
  "CompTIA Security+ CE",
  "Enterprise Desktop Administrator (Microsoft  Certified IT Professional)",
  "GIAC Certifications",
  "Google Data Analytics Certificate",
  "Microsoft Certified: Azure Fundamentals",
  "Microsoft Certified Professional",
  "Oracle Java Certification",
  "Project Management Professional Certificate",
  "SAS Certification",
  "Security Clearance",
  "Six Sigma Green Belt",
  "Software Development Engineer in Test",
  "Other",
] as const;

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const TIMEBLOCKS = [
  "Morning (9-11am)",
  "Afternoon (1-3pm)",
  "Mid-day (11am-1pm)",
  "Late-afternoon (3-5pm)",
  "Evening (5-7pm)",
] as const;

function SortableRow({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      sx={{
        px: 2,
        py: 1.25,
        mb: 1,
        border: "1px solid",
        borderColor: isDragging ? "primary.main" : "divider",
        borderRadius: 2,
        bgcolor: isDragging ? "action.hover" : "background.paper",
        boxShadow: isDragging ? 2 : 0,
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {id}
    </Box>
  );
}


function SortableList({
                        items,
                        onChange,
                        label,
                      }: {
  items: string[];
  onChange: (next: string[]) => void;
  label: string;
}) {
  // Infer the exact event type from DragDropProvider’s prop
  type DragEndParams = Parameters<
    NonNullable<React.ComponentProps<typeof DragDropProvider>["onDragEnd"]>
  >;

  const handleDragEnd = (event: DragEndParams[0]) => {
    const { source, target } = event.operation;
    if (!target || source?.id === target.id) return;

    const oldIndex = items.indexOf(String(source?.id));
    const newIndex = items.indexOf(String(target.id));
    if (oldIndex < 0 || newIndex < 0) return;

    onChange(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <FormControl component="fieldset" sx={{ mb: 2, width: "100%" }}>
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
      <DragDropProvider sensors={[PointerSensor]} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Box>
            {items.map((id) => (
              <SortableRow key={id} id={id} />
            ))}
          </Box>
        </SortableContext>
      </DragDropProvider>
    </FormControl>
  );
}

export default function Page() {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isWAResident: false,

    pathway: "",
    highestEducation: "",
    currentlyEnrolledDegree: false,
    degreeCompletionWindow: "",

    collegeName: "",
    degreeProgram: "",

    hasTrainingProgram: false,
    trainingProvider: "",

    hasCertifications: false,
    certifications: [],

    weekdayAvailabilityRank: [...WEEKDAYS],
    timeblockAvailabilityRank: [...TIMEBLOCKS],
  });

  const [successfullySubmitted, setSuccessfullySubmitted] = useState<boolean>();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (status !== "authenticated") return;
    const u = session?.user as any;
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || u?.first_name || "",
      lastName: prev.lastName || u?.last_name || "",
      email: prev.email || u?.email || "",
    }));
  }, [status, session?.user]);

  const handleCertToggle = (cert: string) => {
    setFormData((prev) => {
      const set = new Set(prev.certifications);
      set.has(cert) ? set.delete(cert) : set.add(cert);
      return { ...prev, certifications: Array.from(set) };
    });
  };

  const validate = (): string | null => {
    const r = formData;
    const req = [
      ["firstName", r.firstName],
      ["lastName", r.lastName],
      ["email", r.email],
      ["phone", r.phone],
      ["pathway", r.pathway],
      ["highestEducation", r.highestEducation],
      ["degreeCompletionWindow", r.degreeCompletionWindow],
      ["collegeName", r.collegeName],
      ["degreeProgram", r.degreeProgram],
    ] as const;
    for (const [k, v] of req) if (!String(v || "").trim()) return `${k} is required`;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email)) return "Invalid email address";
    if (r.hasTrainingProgram && !r.trainingProvider) return "Training provider is required";
    if (r.hasCertifications && r.certifications.length === 0) return "Select at least one certification";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setSnackbar({ open: true, message: err, severity: "error" });
      return;
    }

    const payload = {
      basicInformation: { pronouns: "", expectedEduCompletion: formData.degreeCompletionWindow },
      technicalSelfAssessment: { interestPathway: formData.pathway, skillRatings: {} },
      workExperienceAndMaterials: {
        hasWorkExperience: false,
        hasResume: false,
        hasPortfolio: false,
        hasCoverLetter: false,
        hasLinkedInProfile: false,
        experienceWithApplying: false,
        experienceWithInterviewing: false,
      },
      durableSkills: {},
      professionalBrandingAndJobMarketReadiness: {},
      contact: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        isWAResident: formData.isWAResident,
      },
      education: {
        highestEducation: formData.highestEducation,
        currentlyEnrolledDegree: formData.currentlyEnrolledDegree,
        collegeName: formData.collegeName,
        degreeProgram: formData.degreeProgram,
        hasTrainingProgram: formData.hasTrainingProgram,
        trainingProvider: formData.trainingProvider,
      },
      certifications: formData.hasCertifications ? formData.certifications : [],
      availability: {
        weekday: formData.weekdayAvailabilityRank,
        timeblocks: formData.timeblockAvailabilityRank,
      },
    };

    try {
      const res = await fetch("/api/jobseekers/career-prep/application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccessfullySubmitted(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch {
      setSuccessfullySubmitted(false);
      setSnackbar({ open: true, message: "Submission failed. Please try again.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  return (
    <>
      {successfullySubmitted ? (
        <Box className="flex justify-center">
          <Box style={{ height: "100vh" }} className="profile-form-section main-content">
            <Confetti />
            <h1>Next Steps</h1>
            <Typography sx={{ pt: 3, mb: 3 }}>
              You’re all set! Thanks for applying to Career Prep. Return to your dashboard to view your status and next steps.
            </Typography>
            <Grid container>
              <PillButton href="/services/jobseekers/dashboard">Go to Dashboard</PillButton>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Paper elevation={0} sx={{ p: 3, maxWidth: "75%", mx: "auto", my: 4 }}>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Career Prep Application
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            CFA Career Prep Application
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Provided by Computing For All (CFA), Career Prep is a complimentary career readiness program that is designed to equip Washington State residents,
            who have recently completed or are nearing completion of a technology degree, with the essential skills to successfully enter the job market and
            initiate their tech career.
          </Typography>
          <Typography sx={{ mb: 1, fontWeight: 700 }}>Duration:</Typography>
          <Typography sx={{ mb: 2 }}>
            This program will run in 8 monthly cohorts beginning the first week of July 2025.
            <strong> The next cohort begins on Monday, August 4th, 2025.</strong>
          </Typography>
          <Typography sx={{ mb: 1, fontWeight: 700 }}>Eligibility Criteria:</Typography>
          <ul style={{ marginTop: 0, marginBottom: 16 }}>
            <li>Washington State resident</li>
            <li>Currently enrolled in or recently graduated from a tech degree program</li>
            <li>Actively seeking employment</li>
          </ul>
          <Typography sx={{ mb: 1, fontWeight: 700 }}>Benefits:</Typography>
          <ul style={{ marginTop: 0, marginBottom: 16 }}>
            <li>Career Readiness Support</li>
            <li>Networking Opportunities</li>
            <li>Job Placement Assistance</li>
          </ul>
          <Typography sx={{ mb: 1, fontWeight: 700 }}>Training:</Typography>
          <ul style={{ marginTop: 0, marginBottom: 16 }}>
            <li>
              <strong>5 Workshops:</strong>
              <ul style={{ marginTop: 8 }}>
                <li>Delivered weekly (two date &amp; time slots to accommodate participant schedules):</li>
                <li>Building Your Brand</li>
                <li>Expanding Your Network</li>
                <li>Finding Opportunities</li>
                <li>Tailoring Your Application</li>
                <li>Interviewing Successfully</li>
              </ul>
            </li>
            <li>
              <strong>2 Weekly Office Hours (optional):</strong>
              <ul style={{ marginTop: 8 }}>
                <li>Offered twice a week for personalized support and feedback.</li>
              </ul>
            </li>
            <li>
              <strong>Exit Interview:</strong>
              <ul style={{ marginTop: 8 }}>
                <li>
                  On the 6th week, you will meet with our Career Navigator to receive feedback on your resume, LinkedIn profile, and interview skills and discuss your next steps and placement opportunities.
                </li>
              </ul>
            </li>
            <li>
              <strong>Job Search &amp; Job Placement Support:</strong>
              <ul style={{ marginTop: 8 }}>
                <li>
                  Upon completion, you’ll be added to our exclusive Job Placement Talent Pool. We actively share job opportunities, match you to relevant roles, and work to get you placed in a tech role by 2026.
                </li>
              </ul>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            <Box sx={{ py: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>First Name</FormLabel>
                    <TextField
                      fullWidth
                      value={formData.firstName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Last Name</FormLabel>
                    <TextField
                      fullWidth
                      value={formData.lastName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Email Address</FormLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      fullWidth
                      value={formData.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.isWAResident}
                            onChange={() => setFormData({ ...formData, isWAResident: !formData.isWAResident })}
                          />
                        }
                        label="I am a Washington State resident"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Technical Pathway</FormLabel>
                    <Select
                      value={formData.pathway}
                      onChange={(e) => setFormData({ ...formData, pathway: e.target.value as string })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select pathway
                      </MenuItem>
                      {PATHWAYS.map((p) => (
                        <MenuItem key={p} value={p}>
                          {p}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Highest Level of Education</FormLabel>
                    <Select
                      value={formData.highestEducation}
                      onChange={(e) => setFormData({ ...formData, highestEducation: e.target.value as string })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select highest education
                      </MenuItem>
                      {HIGHEST_ED.map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.currentlyEnrolledDegree}
                            onChange={() =>
                              setFormData({ ...formData, currentlyEnrolledDegree: !formData.currentlyEnrolledDegree })
                            }
                          />
                        }
                        label="Currently enrolled in a technical degree program"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Degree Completion Window</FormLabel>
                    <Select
                      value={formData.degreeCompletionWindow}
                      onChange={(e) => setFormData({ ...formData, degreeCompletionWindow: e.target.value as string })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select timeframe
                      </MenuItem>
                      {DEGREE_WINDOW.map((w) => (
                        <MenuItem key={w} value={w}>
                          {w}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>College (current/completed)</FormLabel>
                    <TextField
                      fullWidth
                      value={formData.collegeName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, collegeName: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel>Technical Degree Program</FormLabel>
                    <TextField
                      fullWidth
                      value={formData.degreeProgram}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, degreeProgram: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.hasTrainingProgram}
                            onChange={() => setFormData({ ...formData, hasTrainingProgram: !formData.hasTrainingProgram })}
                          />
                        }
                        label="I’m enrolled in or completed a technical training program"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                {formData.hasTrainingProgram && (
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel>Training Provider</FormLabel>
                      <TextField
                        fullWidth
                        value={formData.trainingProvider}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, trainingProvider: e.target.value })
                        }
                      />
                    </FormControl>
                  </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset" sx={{ mb: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.hasCertifications}
                            onChange={() => setFormData({ ...formData, hasCertifications: !formData.hasCertifications })}
                          />
                        }
                        label="I have technical certifications"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                {formData.hasCertifications && (
                  <Grid size={{ xs: 12 }}>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel>Select certifications</FormLabel>
                      <FormHelperText sx={{ m: 0 }}>Click to toggle</FormHelperText>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                        {CERTIFICATION_OPTIONS.map((c) => (
                          <Chip
                            key={c}
                            label={c}
                            variant={formData.certifications.includes(c) ? "filled" : "outlined"}
                            color={formData.certifications.includes(c) ? "primary" : "default"}
                            onClick={() => handleCertToggle(c)}
                          />
                        ))}
                      </Box>
                    </FormControl>
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <SortableList
                    label="16. Please rank the following week days in the order of your availability:"
                    items={formData.weekdayAvailabilityRank}
                    onChange={(next) => setFormData((p) => ({ ...p, weekdayAvailabilityRank: next }))}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <SortableList
                    label="17. Please rank the following time blocks in the order of your availability:"
                    items={formData.timeblockAvailabilityRank}
                    onChange={(next) => setFormData((p) => ({ ...p, timeblockAvailabilityRank: next }))}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Box />
              <PillButton type="submit">Submit Application</PillButton>
            </Box>
          </form>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
