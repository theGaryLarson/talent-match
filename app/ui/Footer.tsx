"use client";

import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const footerData = [
  {
    title: "Coalition",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Events", href: "/services/events" },
      {
        label: "Community Network",
        href: "https://forum.watechwfcoalition.org/",
      },
    ],
  },
  {
    title: "For Employers",
    links: [
      {
        label: "Search for Talent",
        href: "/employers/dashboard/talent-search",
      },
      { label: "Join the Coalition", href: "/join" },
      { label: "Join the Talent Portal", href: "/services/employers" },
    ],
  },
  {
    title: "For Job Seekers",
    links: [
      { label: "Career Services", href: "/services/careers" },
      { label: "Join the Talent Portal", href: "/services/jobseekers" },
      {
        label: "Community Network",
        href: "https://forum.watechwfcoalition.org/",
      },
      { label: "Search for Jobs", href: "/services/joblistings" },
      { label: "Career Paths", href: "/services/careers" },
      { label: "Attend an Event", href: "/services/events" },
    ],
  },
  {
    title: "For Educators",
    links: [
      { label: "Join the Coalition", href: "/join" },
      { label: "Partners", href: "/training-providers" },
    ],
  },
];

export default function SitemapFooter() {
  return (
    <>
      <Box sx={{ backgroundColor: "secondary.main", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              textAlign: "center",
              "@media (min-width: 391px)": {
                flexDirection: "row",
                alignItems: "flex-start",
                textAlign: "left",
              },
            }}
          >
            <Box>
              <Link href="/">
                <span className="sr-only">Tech Workforce Coalition</span>
                <Image
                  src="/images/TWC-alt-white.svg"
                  alt="Tech Workforce Coalition"
                  width={69}
                  height={27.24}
                />
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr",
                px: 2,
                gap: 2,
                "@media (min-width: 391px)": {
                  gridTemplateColumns: "1fr 1fr",
                },
                "@media (min-width: 769px)": {
                  gridTemplateColumns: "1fr 1fr 1fr",
                },
                "@media (min-width: 1025px)": {
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                },
              }}
            >
              {footerData.map((section) => (
                <Box key={section.title} sx={{ px: 2 }}>
                  <Typography
                    fontWeight="bold"
                    style={{
                      display: "block",
                      marginBottom: "1.5rem",
                      color: "inherit",
                      fontSize: "1rem",
                      lineHeight: "150%",
                      letterSpacing: "0.15px",
                      verticalAlign: "middle",
                    }}
                    gutterBottom
                  >
                    {section.title}
                  </Typography>
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      style={{
                        display: "block",
                        marginBottom: "1.5rem",
                        color: "inherit",
                        fontSize: "1rem",
                        lineHeight: "150%",
                        letterSpacing: "0.15px",
                        verticalAlign: "middle",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1370px",
          flexWrap: "wrap",
          py: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: "auto",
          px: { xs: 2, md: 3, xl: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "left", sm: "center" },
            py: "8px",
            gap: 3,
          }}
        >
          <Link href="/policies/terms-of-service" style={{ color: "inherit" }}>
            Terms of Services
          </Link>
          <Link href="/policies/privacy-policy" style={{ color: "inherit" }}>
            Privacy Policy
          </Link>
          <Link
            href="https://form.asana.com/?k=YUsxTQ4kvMZCAIN2QbO7Gg&d=1207928585647173"
            style={{ color: "inherit" }}
          >
            Report An Issue
          </Link>
        </Box>

        <a
          className="flex items-center gap-2"
          href="https://www.linkedin.com/company/washington-tech-workforce-coalition"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <p style={{ margin: 0 }}>Follow Us:</p>
          <Image
            src="/images/stock/linkedin-black.png"
            alt="Linkedin Link"
            width={22}
            height={22}
          />
        </a>
      </Box>
    </>
  );
}
