"use client";

import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  SelectChangeEvent,
  Button,
  Grid,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState, use } from "react";
import JobDescription from "../../ui/occupation/job-description";
import EmploymentDetails from "../../ui/occupation/employment-details";
import OccupationDetails from "../../ui/occupation/occupation-details";
import RegionSelect from "../../ui/occupation/region-select";
import NextLink from "next/link";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { ICipSocs, IRelatedData } from "../../lib/data";
import {
  fetchCareerBridgeCIPSOCS,
  fetchOccupationRelatedData,
} from "../../api/api";
import { InteractionStatus } from "@azure/msal-browser";
import { useRouter } from "next/navigation";
import EducationExperienceDetails from "../../ui/occupation/education-experience-details";
import WageTrendDetails from "../../ui/occupation/wage-trend-details";
import JobListings from "../../ui/occupation/job-listings";
import Programs from "../../ui/occupation/programs";

export default function Page(props: {
  params: Promise<{ occupation: string }>;
}) {
  const params = use(props.params);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState<IRelatedData>();
  const [cipSocs, setCipSocs] = useState<ICipSocs[]>([]);
  const [region, setRegion] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  function handleRegionChange(e: SelectChangeEvent) {
    setRegion(e.target.value);
  }

  useEffect(() => {
    const fetchOccupationsFromApi = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          const occupationData = await fetchOccupationRelatedData(
            params.occupation,
          );
          const [cipSocsData] = await Promise.all([
            fetchCareerBridgeCIPSOCS(occupationData.cfa_code.replace(/-/g, "")),
          ]);
          if (
            occupationData.cfa_jobpostingsregionalbreakdown_Occupation.length >
            0
          ) {
            setRegion(
              occupationData.cfa_jobpostingsregionalbreakdown_Occupation[0]
                .cfa_jobpostingsregionalbreakdownid,
            );
          }

          setData(occupationData);
          setCipSocs(cipSocsData.value);
        } else if (inProgress === InteractionStatus.None) {
          await instance.loginRedirect();
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchOccupationsFromApi();
  }, [accounts, instance, inProgress, isAuthenticated, params.occupation]);

  return (
    <>
      {data && (
        <Container maxWidth="xl">
          <Box mb={2}>
            <Box sx={{ mb: 3 }}>
              <Button
                sx={{ my: 2 }}
                variant="contained"
                LinkComponent={NextLink}
                onClick={() => router.push("/ess")}
              >
                See other Pathways
              </Button>
              <Typography
                variant="h2"
                component="h2"
                fontWeight="bold"
                sx={{ wordBreak: "break-word" }}
              >
                {data.cfa_name}
              </Typography>
            </Box>
            {data.cfa_whattheydo && (
              <JobDescription description={data.cfa_whattheydo} />
            )}
            {<Programs cipsocs={cipSocs} />}
            {
              <Card sx={{ p: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    DevMatch Assessments
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={toggleFullscreen}
                    sx={{ mb: 1 }}
                  >
                    Enter Fullscreen
                  </Button>
                  <iframe
                    ref={iframeRef}
                    allow="fullscreen; clipboard-read; clipboard-write; keyboard-map"
                    // candidateId only accepts a number. This will need changes.
                    src={`https://app.devmatch.io/embedded/welcome?projectId=1312&candidateId=${accounts[0].homeAccountId.replace(/\D/g, "")}`}
                    style={{ width: "100%", height: "400px", border: "none" }}
                  ></iframe>
                </CardContent>
              </Card>
            }
            {
              <Card sx={{ p: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    Skill Gap Analysis
                  </Typography>
                  {/*<iframe
                  id="inlineFrameExample"
                  title="Inline Frame Example"
                  width="900"
                  height="1000"
                  src="https://lightcast.io/open-skills/resume">
              </iframe>*/}
                </CardContent>
              </Card>
            }
            {data.cfa_educationbreakdown_Occupation.length > 0 && (
              <Card sx={{ p: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <EducationExperienceDetails occupation={data} />
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="h5" fontWeight="bold">
                        Wage Trend
                      </Typography>
                      <WageTrendDetails occupation={data} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="h5" fontWeight="bold">
                        Job Trends
                      </Typography>
                      <Box sx={{ color: theme.palette.primary.main }}>
                        <Typography variant="h6">
                          Average Monthly Job Postings
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (data.cfa_avgmonthlypostingsaug2023july2024 /
                              (data.cfa_avgmonthlypostingsaug2023july2024 +
                                100)) *
                            100
                          }
                        />
                        <Typography>
                          {data.cfa_avgmonthlypostingsaug2023july2024}
                        </Typography>
                      </Box>
                      <Box sx={{ color: theme.palette.primary.main }}>
                        <Typography variant="h6">
                          Average Monthly Hired
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (data.cfa_avgmonthlyhiresaug2023july2024 /
                              (data.cfa_avgmonthlyhiresaug2023july2024 + 100)) *
                            100
                          }
                        />
                        <Typography>
                          {data.cfa_avgmonthlyhiresaug2023july2024}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
            {data.cfa_jobpostingsregionalbreakdown_Occupation.length > 0 && (
              <Card sx={{ p: 2, mb: 2, mt: 2 }}>
                <CardContent>
                  <RegionSelect
                    regions={data.cfa_jobpostingsregionalbreakdown_Occupation}
                    region={region}
                    handleRegionChange={handleRegionChange}
                  />
                  <EmploymentDetails occupation={data} regionId={region} />
                </CardContent>
              </Card>
            )}
            {<OccupationDetails occupation={data} />}
            {<JobListings cfa_code={data.cfa_code} />}
          </Box>
        </Container>
      )}
    </>
  );
}
