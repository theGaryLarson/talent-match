import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Box,
  Typography,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import NextLink from "next/link";
import { IITPrograms } from "../../lib/data";
import { fetchCareerBridgeITPrograms } from "../../api/api";

interface ProgramsProps {
  cipsocs: any[];
}

const Programs: React.FC<ProgramsProps> = ({ cipsocs }) => {
  const [itPrograms, setItPrograms] = useState<IITPrograms[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await Promise.all(
        cipsocs.map((bridge: any) =>
          fetchCareerBridgeITPrograms(bridge.cfa_cipcode),
        ),
      ).then((results) => results.flatMap((result) => result.value));
      setItPrograms(programs);
    };

    fetchPrograms();
  }, [cipsocs]);

  return (
    <Card sx={{ p: 2, mb: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Programs of Study
        </Typography>
        <List sx={{ overflow: "auto", height: "75vh" }}>
          {itPrograms.map((program, index) => (
            <ListItem key={index} alignItems="flex-start">
              <Box>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={"bold"}
                >
                  {program.cfa_programname}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {program.cfa_awardtype} ~ {program.cfa_programlength}
                </Typography>
                <Typography
                  display="inline"
                  variant="body2"
                  color="text.primary"
                >
                  {program.cfa_communitycollege}
                </Typography>
                <Typography variant="body2" display={"inline"}>
                  {" "}
                  —{" "}
                </Typography>
                <Typography
                  display="inline"
                  variant="body2"
                  color="text.secondary"
                >
                  {program.cfa_county}, {program.cfa_city}
                </Typography>
                {program.cfa_completers && (
                  <Typography>
                    Number of people who have completed the program:{" "}
                    {program.cfa_completers}
                  </Typography>
                )}

                <Link
                  display={"block"}
                  component={NextLink}
                  href={program.cfa_link}
                  target="_blank"
                  rel="noopener"
                >
                  View Program
                </Link>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Programs;
