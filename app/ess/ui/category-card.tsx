import Image from "next/image";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
  Link,
  Box,
} from "@mui/material";

export default function CategoryCard(props: {
  imgSrc: string;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Grid2>
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
          href={props.href}
          LinkComponent={NextLink}
          tabIndex={0}
          sx={{ height: "100%" }}
        >
          <CardMedia
            title={props.title}
            image={props.imgSrc}
            sx={{ height: "60%", position: "relative" }}
          />
          <CardContent sx={{ height: "40%" }}>
            <Typography variant="h6" component="div" fontWeight={"bold"}>
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
}
