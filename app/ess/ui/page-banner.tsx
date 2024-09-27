"use client"
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";

interface PageBannerProps {
    title: string;
    bg: string;
}

export default function PageBanner({ title, bg }: PageBannerProps) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    let font_size;
    if (isSmallScreen) {
        font_size = "h4";
    } else {
        font_size = "h3";
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                backgroundBlendMode: "darken",
                padding: 4,
                color: "white",
                backgroundColor: "#0000004D",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${bg})`,
            }}
        >
            <Box
                sx={{
                    maxWidth: "570px",
                    backgroundColor: "rgba(12, 90, 110, 0.4)",
                    borderRadius: 4,
                    padding: 10,
                }}
            >
                <Typography variant={font_size as "h3" | "h4"} component="h3" fontWeight="bold">
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    href="/ess/pathways"
                    sx={{ backgroundColor: "white", color: "#457996" }}
                >
                    Find a Future Career
                </Button>
            </Box>
        </Box>
    );
}