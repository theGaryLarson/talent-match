"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";
import { IOccupation } from "../lib/data";
import pfpPicSrc from "../../../public/placeholder.jpg";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

export default function JobCard({ job }: { job: IOccupation }) {
  const router = useRouter();
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  //const [data, setData] = useState<IRelatedData>();

  useEffect(() => {
    const fetchOccupationsFromApi = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          //const result = await fetchOccupationRelatedData(job.cfa_occupationid);
          //console.log(result);
          //setData(result);
        } else if (inProgress === InteractionStatus.None) {
          await instance.loginRedirect();
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchOccupationsFromApi();
  }, [accounts, instance, inProgress, isAuthenticated]);

  return (
    <Card
      sx={{
        width: "100%",
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack
          sx={{ minWidth: 0 }}
          direction={{ sm: "column", md: "row" }}
          spacing={2}
        >
          <Grid2
            container
            direction={"column"}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar sx={{ width: 75, height: 75 }}>
              <Image src={pfpPicSrc} fill={true} alt="picture" />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Company Name
            </Typography>
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Grid2 container justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {job.cfa_name}
              </Typography>
              <Box>
                <IconButton sx={{ color: "primary.main" }}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Grid2>
            <Typography mb={2} variant="body1">
              {job.cfa_whattheydo}
            </Typography>
            {/* skills */}
            <Grid2 container mb={2} gap={1}>
              <Chip label="C# MSSCV" key="ketyopajkeop" />
              <Chip label="C++ WISGYW" key="ketyopajkeop" />
              <Chip label="Software Engineering" key="ketyopajkeop" />
              <Chip label="Machine Learning" key="ketyopajkeop" />
            </Grid2>
            {/* view job listing */}
            <Grid2 container gap={1} justifyContent={"space-between"}>
              <Button
                variant="outlined"
                onClick={() => router.push(`/job/JOB_LISTING`)}
                LinkComponent={NextLink}
                sx={{ borderColor: "primary.main", color: "primary.main" }}
              >
                <strong>See Full Details</strong>
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/job/JOB_LISTING`)}
                LinkComponent={NextLink}
                sx={{ borderColor: "primary.main", color: "primary.main" }}
              >
                <strong>Apply</strong>
              </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </CardContent>
    </Card>
  );
}
