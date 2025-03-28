import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import placeholder from "../../../public/placeholder.jpg";

export function CategoryCardSkeleton() {
  return (
    <Grid>
      <Card
        sx={{
          width: 300,
          height: 350,
          border: "2px solid #00bcd4",
          borderRadius: 2,
          "&:hover": { transform: "scale(1.05)" },
          transition: "transform 0.3s",
        }}
      >
        <CardActionArea
          href={""}
          LinkComponent={NextLink}
          tabIndex={0}
          sx={{ height: "100%" }}
        >
          <CardMedia sx={{ height: "60%", position: "relative" }}>
            <Image
              src={placeholder.src}
              alt={""}
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </CardMedia>
          <CardContent sx={{ height: "40%" }}>
            <Typography variant="h6" component="div" fontWeight={"bold"}>
              Loading...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
