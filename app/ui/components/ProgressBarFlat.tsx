import { LinearProgress, Box, Typography } from "@mui/material";
interface Props {
  progress: number;
  [key: string]: any;
}

export default function ProgressBarFlat({ progress, ...rest }: Props) {
  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          bgcolor: "#EEEEEE",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#0891B2",
          },
        }}
      />{" "}
    </>
  );
}
