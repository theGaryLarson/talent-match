import { Card, Grid2, Typography } from "@mui/material";

//draft
interface Props {
  title: string;
  val: number;
}
export default function ScoreCard(props: Props) {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Grid2
        container
        spacing={1}
        direction={{ xs: "row", md: "column" }}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography>{props.title}</Typography>
        <Typography variant="h4" color="primary">
          {props.val}
        </Typography>
      </Grid2>
    </Card>
  );
}
