import { Box, LinearProgress, Grid2, Typography } from "@mui/material";

interface ProgressItem {
  label: string;
  value: number;
}

interface LinearProgressesWithTitleProps {
  title: string;
  items: ProgressItem[];
}

export default function LinearProgressesWithTitle({
  title,
  items,
}: LinearProgressesWithTitleProps) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Box>
        {items.map((item, index) => (
          <Box key={index + item.label} sx={{ color: "primary.main" }}>
            <Typography variant="h6">{item.label}</Typography>
            <LinearProgress variant="determinate" value={item.value} />
            <Typography>{item.value}%</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
