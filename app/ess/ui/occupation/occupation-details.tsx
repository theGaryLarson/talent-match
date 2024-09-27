import { Card, CardContent, Typography, Box, Chip, Grid2 } from "@mui/material";
import { IRelatedData } from "../../lib/data";

export default function OccupationDetails({
  occupation,
}: {
  occupation: IRelatedData;
}) {
  return (
    <Grid2 container spacing={2}>
      <Section
        title="Possible Titles"
        items={occupation.cfa_toppostedjobtitle_Occupation}
        labelKey="cfa_jobtitle"
      />
      <Section
        title="Preferred Certifications"
        items={[]}
        labelKey="cfa_preferredCertifications"
      />

      <Section
        title="Top Skills"
        items={occupation.cfa_toplightcastskill_Occupation}
        labelKey="cfa_skill"
      />
      <Section
        title="Largest Employers"
        items={occupation.cfa_topcompaniesposting_Occupation}
        labelKey="cfa_company"
      />
    </Grid2>
  );
}

function Section({ title, items, labelKey }: { title: string; items: any[]; labelKey: string }) {
  return (
    <Grid2 size={{ xs: 12, md: 6, xl: 3 }}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {items && items.slice(0, 10).map((item, index) => (
              <Chip label={item[labelKey]} key={index} sx={{ mb: 1, mr: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
}
