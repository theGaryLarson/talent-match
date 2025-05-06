"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Link,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import { ICTRecommendationResult } from "@/app/api/admin/career-prep/ict-recommendations/route";

type Seeker = {
  user_id: string;
  jobseeker_id: string;
  hasResume: boolean;
  first_name: string;
  last_name: string;
  email: string;
  final_score: number;
};

interface RoleGroup {
  roleId: string;
  roleTitle: string;
  seekers: Seeker[];
}

interface PathwayGroup {
  pathwayTitle: string;
  roles: RoleGroup[];
}

interface SeekerRowProps {
  seeker: Seeker;
  roleId: string;
  isLoading: boolean;
  onFetchResume: (userId: string) => void;
}

const SeekerRow = React.memo(
  function SeekerRowComponent({
    seeker,
    roleId,
    isLoading,
    onFetchResume,
  }: SeekerRowProps) {
    return (
      <TableRow key={`${roleId}-${seeker.jobseeker_id}`} hover>
        <TableCell>
          <Link
            target="_blank"
            href={`/services/jobseekers/${seeker.jobseeker_id}`}
          >
            {seeker.first_name} {seeker.last_name}
          </Link>
        </TableCell>
        <TableCell>
          <Link target="_blank" href={`mailto:${seeker.email}`}>
            {seeker.email}
          </Link>
        </TableCell>
        <TableCell>
          {seeker.hasResume && (
            <Button
              size="small"
              startIcon={<DownloadIcon fontSize="small" />}
              onClick={() => onFetchResume(seeker.user_id)}
              disabled={isLoading}
            >
              {isLoading ? "Loading…" : "Fetch Resume"}
            </Button>
          )}
        </TableCell>
        <TableCell align="right">{seeker.final_score.toFixed(3)}</TableCell>
      </TableRow>
    );
  },
  (prev, next) =>
    prev.seeker === next.seeker && prev.isLoading === next.isLoading,
);

export default function ICTRecommendationTable() {
  const [data, setData] = useState<PathwayGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/career-prep/ict-recommendations")
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || `HTTP ${res.status}`);
        }
        return res.json() as Promise<ICTRecommendationResult[]>;
      })
      .then((rows) => {
        const map: Record<string, Record<string, RoleGroup>> = {};
        rows.forEach((r) => {
          const pt = r.pathway_title;
          const rid = r.role_id;
          if (!map[pt]) map[pt] = {};
          if (!map[pt][rid]) {
            map[pt][rid] = { roleId: rid, roleTitle: r.title, seekers: [] };
          }
          map[pt][rid].seekers.push({
            user_id: r.id,
            jobseeker_id: r.jobseeker_id,
            hasResume: r.hasResume,
            first_name: r.first_name,
            last_name: r.last_name,
            email: r.email,
            final_score: r.final_score,
          });
        });
        const grouped: PathwayGroup[] = Object.entries(map).map(
          ([pathwayTitle, rolesMap]) => ({
            pathwayTitle,
            roles: Object.values(rolesMap).map((rg) => {
              rg.seekers.sort((a, b) => b.final_score - a.final_score);
              return rg;
            }),
          }),
        );
        setData(grouped);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFetchResume = useCallback(async (userId: string) => {
    setLoadingId(userId);
    try {
      const res = await fetch(`/api/jobseekers/resume/get/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const url = await res.json();
      window.open(url, "_blank");
    } catch (e: any) {
      console.error("Failed to fetch resume:", e.message);
      alert("Could not fetch resume, they most likely don't have one");
    } finally {
      setLoadingId(null);
    }
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box p={4}>
        <Typography color="error" align="center">
          Error loading recommendations: {error}
        </Typography>
      </Box>
    );
  }
  if (data.length === 0) {
    return (
      <Box p={4}>
        <Typography align="center">No recommendations found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {data.map((pg) => (
        <Accordion key={pg.pathwayTitle} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{pg.pathwayTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pg.roles.map((role) => (
              <Accordion key={role.roleId} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{role.roleTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {role.seekers.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Resume</TableCell>
                            <TableCell align="right">Match Score</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {role.seekers.map((s) => (
                            <SeekerRow
                              key={s.user_id}
                              seeker={s}
                              roleId={role.roleId}
                              isLoading={loadingId === s.user_id}
                              onFetchResume={handleFetchResume}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography sx={{ fontStyle: "italic", p: 2 }}>
                      No matching seekers for this role.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
