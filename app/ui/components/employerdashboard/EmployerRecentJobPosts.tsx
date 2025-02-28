"use client";
import React, { useState } from "react";

import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import {
  Box,
  Card,
  Chip,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  OpenInNew,
  People,
  SaveAlt,
} from "@mui/icons-material";
import Avatar from "../Avatar";
import PillButton from "../PillButton";
import Link from "next/link";
import BookmarkWithText from "../BookmarkWithText";

export default function EmployerRecentJobPosts({
  jobs,
  bookmarkedJobseekers,
}: {
  jobs: JobPostCreationDTO[];
  bookmarkedJobseekers?: { jobseekerId: string }[];
}) {
  const [expandedJobId, setExpandedJobId] = useState<string>();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    bookmarkedJobseekers?.map((item) => item.jobseekerId) || [],
  );

  const handleBookmarkChange = (jobseekerId: string, isBookmarked: boolean) => {
    console.log(isBookmarked);
    if (isBookmarked) {
      setBookmarkedIds((prev) => [...prev, jobseekerId]);
    } else {
      setBookmarkedIds((prev) => prev.filter((id) => id !== jobseekerId));
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ display: { xs: "none", sm: "block" } }}>
        <TableContainer sx={{ px: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "secondary.main", fontWeight: "500" }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ color: "secondary.main", fontWeight: "500" }}>
                  Tech Category
                </TableCell>
                <TableCell sx={{ color: "secondary.main", fontWeight: "500" }}>
                  Location
                </TableCell>
                <TableCell sx={{ color: "secondary.main", fontWeight: "500" }}>
                  Expires
                </TableCell>
                <TableCell sx={{ color: "secondary.main", fontWeight: "500" }}>
                  Candidates
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <React.Fragment key={job.job_posting_id}>
                  <TableRow
                    key={job.job_posting_id}
                    sx={{ "& > *": { borderBottom: "unset" } }}
                  >
                    <TableCell
                      sx={{ color: "secondary.main", fontWeight: "500" }}
                    >
                      {job.job_title}
                    </TableCell>
                    <TableCell sx={{ color: "secondary.main" }}>
                      {job.techArea?.title}
                    </TableCell>
                    <TableCell sx={{ color: "neutral.700" }}>
                      {job.zip}
                    </TableCell>
                    <TableCell>
                      {job.unpublish_date?.toLocaleString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {job.jobApplications.length > 0 && (
                        <IconButton
                          onClick={() =>
                            setExpandedJobId(
                              expandedJobId === job.job_posting_id
                                ? undefined
                                : job.job_posting_id,
                            )
                          }
                        >
                          {expandedJobId === job.job_posting_id ? (
                            <ArrowDropDown />
                          ) : (
                            <ArrowDropUp />
                          )}
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={expandedJobId !== undefined} timeout="auto">
                        {expandedJobId === job.job_posting_id && (
                          <Grid2
                            container
                            sx={{ justifyContent: "space-around", m: 1 }}
                          >
                            {job.jobApplications
                              .slice(0, 2)
                              .map((application) => (
                                <Card
                                  key={
                                    job.job_posting_id +
                                    application.jobseekerId +
                                    " Card"
                                  }
                                  component={Grid2}
                                  size={4}
                                  sx={{ p: 2 }}
                                >
                                  <Grid2 container sx={{ mb: 2 }}>
                                    <Avatar
                                      imgsrc={
                                        application.Jobseekers.users.photo_url
                                      }
                                    />
                                    <div>
                                      <Typography>
                                        {application.Jobseekers.users
                                          .first_name +
                                          " " +
                                          application.Jobseekers.users
                                            .last_name}
                                      </Typography>
                                      <Typography color="textSecondary">
                                        {
                                          application.Jobseekers.pathways
                                            .pathway_title
                                        }
                                      </Typography>
                                      <Typography color="textSecondary">
                                        TEST
                                      </Typography>
                                    </div>
                                  </Grid2>
                                  <Typography
                                    sx={{
                                      mt: 1,
                                      mb: 2,
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflowWrap: "break-word",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {application.Jobseekers.intro_headline}
                                  </Typography>
                                  <Grid2 container spacing={1}>
                                    {application.Jobseekers.jobseeker_has_skills?.map(
                                      (skill) => {
                                        const jobSkillIds =
                                          job.skills?.map(
                                            (skill) => skill.skill_id,
                                          ) || [];
                                        if (
                                          jobSkillIds.includes(
                                            skill.skills.skill_id,
                                          )
                                        )
                                          return (
                                            <Chip
                                              key={
                                                job.job_posting_id +
                                                application.jobseekerId +
                                                skill.skills.skill_id +
                                                " skill"
                                              }
                                              color="primary"
                                              component={Link}
                                              clickable
                                              href={skill.skills.skill_info_url}
                                              label={skill.skills.skill_name}
                                            />
                                          );
                                        else
                                          return (
                                            <Chip
                                              key={
                                                job.job_posting_id +
                                                application.jobseekerId +
                                                skill.skills.skill_id +
                                                " skill"
                                              }
                                              component={Link}
                                              clickable
                                              href={skill.skills.skill_info_url}
                                              label={skill.skills.skill_name}
                                              sx={{ opacity: 0.4 }}
                                            />
                                          );
                                      },
                                    )}
                                  </Grid2>
                                  <Divider sx={{ my: 2 }} />
                                  <Stack spacing={1}>
                                    <BookmarkWithText
                                      bookmarked={bookmarkedIds.includes(
                                        application.jobseekerId,
                                      )}
                                      addUrl={
                                        "/api/companies/bookmark/addJobseeker/" +
                                        application.jobseekerId
                                      }
                                      removeUrl={
                                        "/api/companies/bookmark/removeJobseeker/" +
                                        application.jobseekerId
                                      }
                                      onBookmarkChange={(isBookmarked) =>
                                        handleBookmarkChange(
                                          application.jobseekerId,
                                          isBookmarked,
                                        )
                                      }
                                      unbookmarkedText="Save Candidate"
                                      unbookmarkedIcon={<SaveAlt />}
                                      bookmarkedText="Remove Candidate"
                                      bookmarkedIcon={<SaveAlt />}
                                    />
                                    <PillButton
                                      startIcon={<OpenInNew />}
                                      color="secondary"
                                      fullWidth
                                      href={
                                        "/services/jobseekers/" +
                                        application.jobseekerId
                                      }
                                    >
                                      View Showcase
                                    </PillButton>
                                  </Stack>
                                </Card>
                              ))}
                            {job.jobApplications.length > 2 && (
                              <Card component={Grid2} size={3} sx={{ p: 2 }}>
                                <Grid2
                                  container
                                  sx={{
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Stack
                                    sx={{
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="h5" color="secondary">
                                      View {job.jobApplications.length - 2} more
                                      qualified candidates
                                    </Typography>
                                    <People
                                      color="primary"
                                      sx={{ width: 58, height: 58 }}
                                    />
                                  </Stack>
                                  <PillButton fullWidth color="secondary">
                                    View More
                                  </PillButton>
                                </Grid2>
                              </Card>
                            )}
                          </Grid2>
                        )}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {/* Mobile View */}
      <Card variant="outlined" sx={{ display: { xs: "block", sm: "none" } }}>
        <Stack spacing={1} direction="column" sx={{ pt: 1 }}>
          {jobs.map((job, index) => (
            <Box key={job.job_posting_id + "sm"} sx={{ px: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ color: "secondary.main", fontWeight: "500" }}>
                  {job.job_title}
                </Typography>
                {job.jobApplications.length > 0 && (
                  <IconButton
                    onClick={() =>
                      setExpandedJobId(
                        expandedJobId === job.job_posting_id
                          ? undefined
                          : job.job_posting_id,
                      )
                    }
                  >
                    {expandedJobId === job.job_posting_id ? (
                      <ArrowDropDown />
                    ) : (
                      <ArrowDropUp />
                    )}
                  </IconButton>
                )}
              </Stack>
              <Typography sx={{ color: "secondary.main" }}>
                {job.techArea?.title}
              </Typography>
              <Typography sx={{ color: "neutral.700" }}>{job.zip}</Typography>
              <Typography>
                {job.unpublish_date?.toLocaleString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Collapse
                in={expandedJobId === job.job_posting_id}
                timeout="auto"
              >
                <Grid2
                  direction={"column"}
                  spacing={2}
                  container
                  sx={{ justifyContent: "space-around", my: 2 }}
                >
                  {job.jobApplications.slice(0, 2).map((application) => (
                    <Card
                      key={
                        job.job_posting_id + application.jobseekerId + " Card"
                      }
                      component={Grid2}
                      sx={{ p: 2 }}
                    >
                      <Grid2 container sx={{ mb: 2 }}>
                        <Avatar
                          imgsrc={application.Jobseekers.users.photo_url}
                        />
                        <div>
                          <Typography>
                            {application.Jobseekers.users.first_name +
                              " " +
                              application.Jobseekers.users.last_name}
                          </Typography>
                          <Typography color="textSecondary">
                            {application.Jobseekers.pathways.pathway_title}
                          </Typography>
                          <Typography color="textSecondary">TEST</Typography>
                        </div>
                      </Grid2>
                      <Typography
                        sx={{
                          mt: 1,
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                          overflow: "hidden",
                        }}
                      >
                        {application.Jobseekers.intro_headline}
                      </Typography>
                      <Grid2 container spacing={1}>
                        {application.Jobseekers.jobseeker_has_skills?.map(
                          (skill) => {
                            const jobSkillIds =
                              job.skills?.map((skill) => skill.skill_id) || [];
                            if (jobSkillIds.includes(skill.skills.skill_id))
                              return (
                                <Chip
                                  key={
                                    job.job_posting_id +
                                    application.jobseekerId +
                                    skill.skills.skill_id +
                                    " skill"
                                  }
                                  color="primary"
                                  component={Link}
                                  clickable
                                  href={skill.skills.skill_info_url}
                                  label={skill.skills.skill_name}
                                />
                              );
                            else
                              return (
                                <Chip
                                  key={
                                    job.job_posting_id +
                                    application.jobseekerId +
                                    skill.skills.skill_id +
                                    " skill"
                                  }
                                  component={Link}
                                  clickable
                                  href={skill.skills.skill_info_url}
                                  label={skill.skills.skill_name}
                                  sx={{ opacity: 0.4 }}
                                />
                              );
                          },
                        )}
                      </Grid2>
                      <Divider sx={{ my: 2 }} />
                      <Stack spacing={1}>
                        <BookmarkWithText
                          bookmarked={bookmarkedIds.includes(
                            application.jobseekerId,
                          )}
                          addUrl={
                            "/api/companies/bookmark/addJobseeker/" +
                            application.jobseekerId
                          }
                          removeUrl={
                            "/api/companies/bookmark/removeJobseeker/" +
                            application.jobseekerId
                          }
                          onBookmarkChange={(isBookmarked) =>
                            handleBookmarkChange(
                              application.jobseekerId,
                              isBookmarked,
                            )
                          }
                          unbookmarkedText="Save Candidate"
                          unbookmarkedIcon={<SaveAlt />}
                          bookmarkedText="Remove Candidate"
                          bookmarkedIcon={<SaveAlt />}
                        />
                        <PillButton
                          startIcon={<OpenInNew />}
                          color="secondary"
                          fullWidth
                          href={
                            "/services/jobseekers/" + application.jobseekerId
                          }
                        >
                          View Showcase
                        </PillButton>
                      </Stack>
                    </Card>
                  ))}
                  {job.jobApplications.length > 2 && (
                    <Card component={Grid2} sx={{ p: 2 }}>
                      <Stack
                        sx={{
                          alignItems: "center",
                          justifyContent: "center",
                          spacing: 2,
                          pb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="secondary"
                          align="center"
                          sx={{ mb: 1 }}
                        >
                          View {job.jobApplications.length - 2} more qualified
                          candidates
                        </Typography>
                        <People
                          color="primary"
                          sx={{ width: 48, height: 48, mb: 2 }}
                        />
                        <PillButton
                          fullWidth
                          color="secondary"
                          href={`/services/jobs/${job.job_posting_id}/applications`}
                        >
                          View More
                        </PillButton>
                      </Stack>
                    </Card>
                  )}
                </Grid2>
              </Collapse>
              {index !== jobs.length - 1 && (
                <Divider
                  variant="middle"
                  orientation="horizontal"
                  sx={{ my: 1 }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </Card>
    </>
  );
}
