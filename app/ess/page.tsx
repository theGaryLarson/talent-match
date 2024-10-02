import { Container, Box, Typography, Grid2, Paper, Divider } from "@mui/material";
import PageBanner from "./ui/page-banner";
import background from "../../public/placeholder.jpg"

export default async function Home() {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <PageBanner title="Welcome to Career Navigation" bg={background.src}></PageBanner>
      <Container maxWidth="xl">
        <Box sx={{ marginTop: 2, '& > *:not(:last-child)': { marginBottom: 2 } }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Your ultimate resource for discovering and navigating high-demand IT career paths. Whether you&apos;re a student or an early-career professional, this portal helps you explore, plan, and pursue opportunities in the IT Industry.
          </Typography>
          <Typography variant="h4" gutterBottom>
            Explore IT Career Pathways
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography>
              Start your journey by mapping out potential career paths that fit your education, certifications, and skills. Our interactive pathway tool helps you visualize how different combinations of skills and qualifications lead to high-demand IT roles.
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6">Interactive Pathway Mapping Tool</Typography>
            <Typography>
              Discover the education levels, certifications, and skills needed for various entry-level IT jobs.
              Find out how different educational and skill combinations can propel you toward your desired career.
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6">Real-World Career Data</Typography>
            <Typography>
              Access up-to-date industry insights, showing how real professionals transitioned into their IT careers.
            </Typography>
          </Paper>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Occupation Insights</Typography>
                <Typography>
                  Every IT pathway opens doors to multiple job titles and occupations. Get in-depth insights into each role.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Employment Outlook</Typography>
                <Typography>
                  Stay informed with real-time job openings, projected growth rates, salary ranges, and supply-demand trends.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Key Skills & Competencies</Typography>
                <Typography>
                  Explore the skills and qualifications employers value, with links to relevant courses, training programs, and certifications.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Occupation Trends</Typography>
                <Typography>
                  Understand the evolving landscape of IT roles, job titles, and skills requirements to stay ahead of industry shifts.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Comprehensive Job Descriptions & Titles</Typography>
                <Typography>
                  Navigate through an extensive database of entry-level IT jobs:
                  Detailed job responsibilities and qualifications for each position.
                  Titles and job descriptions across various IT disciplines, including software development, cybersecurity, and data analysis.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Employer Directory</Typography>
                <Typography>
                  Discover top employers actively hiring for entry-level IT roles in your chosen pathway:
                  Search for employers in your region or area of interest.
                  Learn about hiring trends, company profiles, and current opportunities.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Knowledge, Skills, Abilities, and Credentials (KSACs)</Typography>
                <Typography>
                  Find out which KSACs are essential for success in different IT roles:
                  Pathway-Specific KSACs
                  Explore key competencies for roles like IT support, cybersecurity, software development, and more.
                  Credentialing Guidance
                  Step-by-step recommendations on acquiring foundational, intermediate, and advanced certifications.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Training Programs & Educational Institutions</Typography>
                <Typography>
                  Browse a database of programs and institutions offering IT career training:
                  Compare program outcomes, job placement rates, and curriculum details.
                  Find courses aligned with your career goals and required KSACs.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Certifications Directory</Typography>
                <Typography>
                  Discover the certifications that matter for entry-level IT roles:
                  Find certifications categorized by job role relevance.
                  Get guidance on which certifications to pursue based on your career goals.
                </Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Box >
      </Container>
    </Box>
  );
}
