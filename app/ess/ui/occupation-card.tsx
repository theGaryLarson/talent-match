import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { IOccupation, IRelatedData } from "../lib/data";
import pfpPicSrc from "../../../public/placeholder.jpg";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { fetchOccupationRelatedData } from "../api/api";
import { InteractionStatus } from "@azure/msal-browser";
import { truncateText } from "../lib/util";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

export default function OccupationCard({
  occupation,
}: {
  occupation: IOccupation;
}) {
  const router = useRouter();
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState<IRelatedData>();

  useEffect(() => {
    const fetchOccupationsFromApi = async () => {
      try {
        if (isAuthenticated && accounts.length > 0) {
          const result = await fetchOccupationRelatedData(
            occupation.cfa_occupationid,
          );
          console.log(result);
          setData(result);
        } else if (inProgress === InteractionStatus.None) {
          await instance.loginRedirect();
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchOccupationsFromApi();
  }, [
    accounts,
    instance,
    inProgress,
    isAuthenticated,
    occupation.cfa_occupationid,
  ]);

  return (
    <Grid size={{ md: 6 }}>
      <Card
        sx={{
          border: "2px solid #00bcd4",
          borderRadius: 2,
          height: "100%",
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            {/* Picture and Name */}
            <Grid>
              <Avatar sx={{ width: 75, height: 75 }}>
                <Image src={pfpPicSrc} fill={true} alt="picture" />
              </Avatar>
            </Grid>
            <Grid>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {occupation.cfa_name}
              </Typography>
            </Grid>
            {/* Description */}
            <Grid>
              <Typography variant="body2" color="text.secondary">
                {(data &&
                  data.cfa_whattheydo &&
                  truncateText(data.cfa_whattheydo, 250)) ||
                  ""}
              </Typography>
            </Grid>
            {/* Skills */}
            <Grid size={{ xs: 12 }}>
              {data && data.cfa_toplightcastskill_Occupation.length > 0 ? (
                <>
                  <Typography variant="h6" component="div" gutterBottom>
                    Top Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {data.cfa_toplightcastskill_Occupation
                      .slice(0, 5)
                      .map((skill, index) => (
                        <Chip label={skill.cfa_skill} key={index} />
                      ))}
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                  ></Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}></Box>
                </>
              )}
            </Grid>
            {/* View Occupation */}
            <Grid>
              <Button
                variant="outlined"
                onClick={() =>
                  router.push(`/occupation/${occupation.cfa_occupationid}`)
                }
                LinkComponent={NextLink}
                sx={{ borderColor: "#00bcd4", color: "#00bcd4" }}
              >
                <strong>Learn more</strong>
              </Button>
            </Grid>
            {/* Bookmark */}
            <Grid>
              <Button variant="text" sx={{ color: "#00bcd4" }}>
                Bookmark
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
