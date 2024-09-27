"use client"

import placeholder_image from "../../../public/placeholder.jpg";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useCallback, useEffect, useState } from "react";
import { fetchOccupations, fetchPathways } from "../api/api";
import { IOccupation, IPathway } from "../lib/data";
import { Grid2, Avatar, Box, Button, Card, CardContent, List, Stack, Typography, useTheme, ListItem, ListItemButton, ListItemAvatar, ListItemText } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { truncateText } from "../lib/util";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Pathways() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [pathwaysData, setpathwaysData] = useState<IPathway[]>([]);
  const [occupationsData, setOccupationsData] = useState<IOccupation[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPathwaysFromApi = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          const result = await fetchPathways();
          if (result.value.length > 0) {
            if (!isSmallScreen) {
              const firstCardId = result.value[0].cfa_pathwayid;
              setSelectedCardId(firstCardId);
              handlePathwayClick(firstCardId);
            }
            setpathwaysData(result.value);
          }
        } else if (inProgress === InteractionStatus.None) {
          await instance.loginRedirect();
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchPathwaysFromApi();
  }, [accounts, instance, inProgress, isAuthenticated]);

  const handlePathwayClick = useCallback((id: string) => {
    setSelectedCardId(id);
    if (isAuthenticated && accounts.length > 0) {
      fetchOccupations(id)
        .then(result => {
          setOccupationsData(result.value);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    } else if (inProgress === InteractionStatus.None) {
      instance.loginPopup()
        .catch(error => {
          console.error('Error during login', error);
        });
    }
  }, [accounts, instance, inProgress, isAuthenticated]);

  const handleBackClick = () => {
    setSelectedCardId(undefined);
  };

  return (
    <>
      <Stack gap={2} direction={isSmallScreen ? "column" : "row"}>
        {(!selectedCardId || !isSmallScreen) && (
          <List disablePadding sx={{ width: isSmallScreen ? "auto" : 300 }}>
            {pathwaysData && pathwaysData.map((item, index) => (
              <ListItem disablePadding divider key={item.cfa_pathwayid}>
                <ListItemButton
                  onClick={() => handlePathwayClick(item.cfa_pathwayid)}
                  sx={{
                    backgroundColor: selectedCardId === item.cfa_pathwayid ? theme.palette.accent.main : theme.palette.background.default,
                    borderRadius: 0,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" sx={{ width: 50, height: 50 }}>
                      <Image src={placeholder_image.src} fill alt="picture" sizes="50px" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.cfa_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <Grid2 sx={{ flex: 1, height: "75vh", overflow: "auto", pr: 2 }}>
          {selectedCardId && isSmallScreen && (
            <Button onClick={handleBackClick} sx={{ marginBottom: 2 }}>
              Back to Pathways
            </Button>
          )}
          <List disablePadding>
            {(selectedCardId && occupationsData.length > 0) ? (
              occupationsData.map((occupation, index) => (
                <Card key={index + occupation.cfa_occupationid} sx={{
                  marginBottom: 2,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: theme.palette.primary.main,
                  borderRadius: 2,
                }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {occupation.cfa_name}
                    </Typography>
                    <Typography>
                      {occupation.cfa_whattheydo && truncateText(occupation.cfa_whattheydo, 400)}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box></Box>
                      <Button
                        variant="outlined"
                        onClick={(() => router.push(`/ess/occupation/${occupation.cfa_occupationid}`))}
                        LinkComponent={NextLink}
                        sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main, fontWeight: "bold" }}
                      >
                        Learn more
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <></>
            )}
          </List>
        </Grid2>
      </Stack >
    </>
  );
}
