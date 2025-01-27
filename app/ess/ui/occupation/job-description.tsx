import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function JobDescription({
  description,
}: {
  description: string;
}) {
  const bulletPoints = description
    .split(".")
    .filter((point) => point.trim() !== "")
    .map((point, index) => (
      <ListItem disableGutters key={index}>
        <ListItemText>{point.trim()}</ListItemText>
      </ListItem>
    ));

  return (
    <Card sx={{ p: 2, mb: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Responsibilities
        </Typography>
        <List disablePadding>{bulletPoints}</List>
      </CardContent>
    </Card>
  );
}
