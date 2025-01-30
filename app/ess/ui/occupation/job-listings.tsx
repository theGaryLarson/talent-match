import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Chip,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import { truncateText } from "../../lib/util";
import { IJobData } from "../../lib/data";
import { fetchLightCastJobs } from "../../api/api";

interface ProgramsListProps {
  cfa_code: string;
}

const JobListings: React.FC<ProgramsListProps> = ({ cfa_code }) => {
  const [jobs, setJobs] = useState<IJobData[]>([]);

  useEffect(() => {
    const fetchJobs = async (cfa_code: string) => {
      const data = await fetchLightCastJobs(`'${cfa_code}'`);
      setJobs(data.value);
    };
    fetchJobs(cfa_code);
  }, [cfa_code]);

  return (
    jobs &&
    jobs.length > 0 && (
      <Card sx={{ p: 2, mb: 2, mt: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Job Listings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Note: The links to jobs may have expired. They are primarily aimed
            at giving you a sense of the openings in the recent past.
          </Typography>
          <List sx={{ overflow: "auto", height: "75vh" }}>
            {jobs.map((job, index) => (
              <ListItem key={index} alignItems="flex-start">
                <Box>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight={"bold"}
                  >
                    {job.cfa_name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {job.cfa_company}
                  </Typography>
                  <Typography display={"inline"}> — </Typography>
                  <Typography display={"inline"} color="text.secondary">
                    {job.cfa_location}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {truncateText(job.cfa_description, 1000)}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                    {job.cfa_skills &&
                      job.cfa_skills
                        .split(",")
                        .slice(0, 5)
                        .map((item, index) => (
                          <Chip
                            label={item}
                            key={index + item}
                            sx={{ mb: 1, mr: 1 }}
                          />
                        ))}
                  </Box>
                  <Link
                    component={NextLink}
                    href={job.cfa_url}
                    target="_blank"
                    rel="noopener"
                  >
                    View Job
                  </Link>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    )
  );
};

export default JobListings;
