"use client";
import React, { useState } from "react";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Snackbar,
  Alert,
  TextField,
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
  Grid,
  Chip,
  Link,
} from "@mui/material";
import Skills from "@/app/ui/components/Skills";

type MatchedSkillDetailFrontend = {
  job_skill_name: string;
  seeker_skill_name: string;
  score: number;
};

type RecommendedCandidate = {
  jobseeker_id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  final_score: number;
  matched_skills: MatchedSkillDetailFrontend[];
};

export default function Page() {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [skills, setSkills] = useState<SkillDTO[]>([]);
  const [candidates, setCandidates] = useState<RecommendedCandidate[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(false);
  const [isLoadingCandidates, setIsLoadingCandidates] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSkillsAndCandidates = async () => {
    if (!jobDescription.trim()) {
      setError("Job description cannot be empty.");
      return;
    }
    setIsLoadingSkills(true);
    setIsLoadingSkills(true);
    setIsLoadingCandidates(false);
    setError(null);
    setSkills([]);
    setCandidates([]);

    try {
      const skillsResponse = await fetch("/api/skills/parse-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: jobDescription }),
      });

      if (!skillsResponse.ok) {
        const errorData = await skillsResponse.json();
        throw new Error(
          errorData.message || `Skill parsing failed: ${skillsResponse.status}`,
        );
      }

      const parsedSkills: SkillDTO[] = await skillsResponse.json();
      setSkills(parsedSkills);
      setIsLoadingSkills(false);

      if (parsedSkills.length === 0) {
        setError(
          "No skills were extracted from the job description. Cannot find candidates.",
        );
        return;
      }

      setIsLoadingCandidates(true);
      const skillIds = parsedSkills.map((skill) => skill.skill_id);

      const candidatesResponse = await fetch(
        "/api/admin/career-prep/recommendations/by-skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skillIds }),
        },
      );

      if (!candidatesResponse.ok) {
        const errorData = await candidatesResponse.json();
        throw new Error(
          errorData.message ||
            `Fetching candidates failed: ${candidatesResponse.status}`,
        );
      }

      const recommendedCandidates: RecommendedCandidate[] =
        await candidatesResponse.json();

      if (
        recommendedCandidates.length === 0 ||
        (recommendedCandidates as any).message
      ) {
        setError(
          (recommendedCandidates as any).message ||
            "No matching candidates found for the extracted skills.",
        );
        setCandidates([]);
      } else {
        setCandidates(recommendedCandidates);
      }
    } catch (e: any) {
      console.error("Operation failed:", e);
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoadingSkills(false);
      setIsLoadingCandidates(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Description Candidate Matcher
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          multiline
          rows={10}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description..."
          disabled={isLoadingSkills || isLoadingCandidates}
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchSkillsAndCandidates}
        disabled={isLoadingSkills || isLoadingCandidates}
        sx={{ mb: 2 }}
      >
        {isLoadingSkills
          ? "Parsing Skills..."
          : isLoadingCandidates
            ? "Fetching Candidates..."
            : "Find Matching Candidates"}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Extracted Skills
          </Typography>
          <List dense>
            <Skills skillsList={skills} maxNumSkills={0} />
          </List>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Matched Candidates
        </Typography>
        {isLoadingCandidates && (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        )}
        {!isLoadingCandidates &&
          candidates.length === 0 &&
          !error &&
          skills.length > 0 && (
            <Typography variant="body1">
              No candidates found for the extracted skills.
            </Typography>
          )}
        {!isLoadingCandidates && candidates.length > 0 && (
          <>
            <Typography>
              {candidates.map((candidate) => (
                <React.Fragment key={candidate.email}>
                  {candidate.email}{" "}
                </React.Fragment>
              ))}
            </Typography>
            <Grid container spacing={2}>
              {candidates.map((candidate) => (
                <Grid key={candidate.jobseeker_id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Link
                        target="_blank"
                        href={"/services/jobseekers/" + candidate.jobseeker_id}
                      >
                        <Typography variant="h6">
                          {candidate.first_name || "N/A"}{" "}
                          {candidate.last_name || ""}
                        </Typography>
                      </Link>
                      <Typography color="textSecondary">
                        Email: {candidate.email}
                      </Typography>
                      <Typography color="textSecondary">
                        Match Score: {(candidate.final_score * 100).toFixed(2)}%
                      </Typography>
                      {candidate.matched_skills &&
                        candidate.matched_skills.length > 0 && (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ mt: 1, mb: 0.5 }}
                            >
                              Matched Skills (job ⇒ jobseeker):
                            </Typography>
                            <List dense>
                              {candidate.matched_skills.map(
                                (skillMatch, idx) => (
                                  <ListItem
                                    key={
                                      candidate.user_id +
                                      skillMatch.job_skill_name +
                                      idx
                                    }
                                  >
                                    <Chip
                                      color="primary"
                                      label={skillMatch.job_skill_name}
                                    />
                                    ⇒
                                    <Chip
                                      label={skillMatch.seeker_skill_name}
                                      sx={{ mr: 2 }}
                                    />
                                    {(skillMatch.score * 100).toFixed(1)}%
                                  </ListItem>
                                ),
                              )}
                            </List>
                          </>
                        )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      <Snackbar
        open={!!error && !(skills.length > 0 && candidates.length === 0)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
