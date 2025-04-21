import Image, { StaticImageData } from "next/image";
import Wtia from "@/public/images/employers/WTIA.png";
import Brooksource from "@/public/images/employers/BRK.svg";
import Accenture from "@/public/images/employers/Accenture.svg";
import PortOfSeattle from "@/public/images/employers/Port_of_Seattle_Logo.svg";
import Aws from "@/public/images/employers/AWS.svg";
import Startup425 from "@/public/images/employers/startup425.png";
import Hobbes from "@/public/images/employers/hobbes.svg";
import GoldenSherpa from "@/public/images/employers/gs-logo-horizontal-white.svg";
import Captus from "@/public/images/employers/AI-FILE-ai-1.png";
import NadikaHealth from "@/public/images/employers/Nadika Health.png";
import TekSystems from "@/public/images/employers/teksystems.svg";
import Ofm from "@/public/images/employers/Office of Financial Management.svg";
import { Box, Grid, Typography } from "@mui/material";

interface Logo {
  src: StaticImageData;
  alt: string;
  width: number;
}

const logos: Logo[] = [
  { src: Wtia, alt: "WTIA Logo", width: 192 },
  { src: Brooksource, alt: "Brooksource Logo", width: 144 },
  { src: Accenture, alt: "Accenture Logo", width: 152 },
  { src: PortOfSeattle, alt: "Port of Seattle Logo", width: 85 },
  { src: Aws, alt: "AWS Logo", width: 67 },
  { src: Startup425, alt: "Startup 425 Logo", width: 146 },
  { src: Hobbes, alt: "Hobbes Logo", width: 178 },
  { src: GoldenSherpa, alt: "Golden Sherpa Logo", width: 290 },
  { src: Captus, alt: "Captus Logo", width: 349 },
  { src: NadikaHealth, alt: "Nadika Health Logo", width: 323 },
  { src: TekSystems, alt: "TekSystems Logo", width: 152 },
  { src: Ofm, alt: "Office of Financial Management Logo", width: 106 },
];

const row1Logos = logos.slice(0, 6);
const row2Logos = logos.slice(6, 9);
const row3Logos = logos.slice(9, 12);

export default function TrustedByEmployers() {
  return (
    <Box sx={{ my: 10, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Trusted By Employers
      </Typography>
      <Grid
        container
        spacing={{ xs: 3, md: 3.75, lg: 7.5, xl: 12.5 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {row1Logos.map((logo, index) => (
          <Grid
            container
            size={{ xs: 12, sm: 2 }}
            key={`row1-${index}`}
            sx={{
              justifyContent: "center",
            }}
          >
            <Image
              width={logo.width}
              src={logo.src}
              alt={logo.alt}
              quality={75}
            />
          </Grid>
        ))}
        {row2Logos.map((logo, index) => (
          <Grid
            container
            size={{ xs: 12, sm: 4 }}
            key={`row2-${index}`}
            sx={{
              justifyContent: "center",
            }}
          >
            <Image
              width={logo.width}
              src={logo.src}
              alt={logo.alt}
              quality={75}
            />
          </Grid>
        ))}
        {row3Logos.map((logo, index) => (
          <Grid
            container
            size={{ xs: 12, sm: 3 }}
            key={`row3-${index}`}
            sx={{
              justifyContent: "center",
            }}
          >
            <Image
              width={logo.width}
              src={logo.src}
              alt={logo.alt}
              quality={75}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
