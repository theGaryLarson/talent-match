"use client"

import OccupationCard from "@/app/ui/occupation-card";
import { Button, Container, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { fetchCareerBridgeCIPSOCS, fetchCareerBridgeITPrograms, fetchOccupations } from "../../api/api";
import { IOccupation } from "@/app/lib/data";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { pathway: string, pathwayName: string };
}) {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState<IOccupation[]>([]);
  const [isData, setIsData] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOccupationsFromApi = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          const result = await fetchOccupations(params.pathway[1]);
          if (!result.value.length || !Array.isArray(result.value)) {
            setIsData(false);
          }
          setData(result.value);
        } else if (inProgress === InteractionStatus.None) {
          await instance.loginRedirect();
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchOccupationsFromApi();
  }, [accounts, instance, inProgress, isAuthenticated, params.pathway]);

  return (
    <>
      <Container maxWidth="xl">
        <Button sx={{ my: 2 }} variant="contained"
          LinkComponent={NextLink} onClick={() => router.back()}>
          Go Back
        </Button>
        <>
          <Typography variant="h1"
            component="h1"
            fontSize="3rem"
            fontWeight={800}
          >{decodeURIComponent(params.pathway[0])} Pathway</Typography>
          {isData ? <Grid2 container spacing={4} alignItems="stretch" columns={12}>
            {data && data.map((occupation, index) => (
              <OccupationCard
                key={index}
                occupation={occupation}
              />
            ))}
          </Grid2> : <p>No Occupations in this pathway</p>}
        </>
      </Container>
    </>
  );
}
