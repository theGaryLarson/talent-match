import {
  Box,
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function page() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Terms of Service
        </Typography>
        <Typography align="center">Published: December 3, 2024</Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          <Box component={"span"} sx={{ fontWeight: "bold" }}>
            Effective:{" "}
          </Box>
          December 3, 2024
        </Typography>

        <Typography>
          {`These Terms and Conditions ("Terms") govern your use of the website located at `}
          <Link href="https://www.watechcoalition.org">
            www.watechcoalition.org
          </Link>
          {` ("Site"), which is owned and operated by the Washington Tech Workforce Coalition ("we", "our", or "us"). By using this Site, you acknowledge that you have read, understand, and agree to abide by these Terms.`}
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Intellectual Property
        </Typography>
        <Typography>
          {`All content available on our Site, including but not limited to images, text, logos, documents, and downloadable files,
            is the exclusive property of Washington Tech Workforce Coalition and the Site's creators.
            Unauthorized use of any content is prohibited.`}
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          User Contributions
        </Typography>
        <Typography>Users may post content on our Site, such as:</Typography>
        <List
          disablePadding
          sx={{
            listStyleType: "disc",
            "& .MuiListItem-root": { display: "list-item", marginLeft: 3 },
          }}
        >
          <ListItem disablePadding>
            <ListItemText primary="YouTube video showcasing skills" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Resume" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Cover letter" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Work History" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Education history" />
          </ListItem>
        </List>
        <Typography>
          By posting on the Site, you agree not to post anything illegal or that
          violates these Terms.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Accounts
        </Typography>
        <Typography>
          When creating an account on our Site, you agree to:
        </Typography>
        <List
          disablePadding
          sx={{
            listStyleType: "decimal",
            "& .MuiListItem-root": { display: "list-item", marginLeft: 3 },
          }}
        >
          <ListItem disablePadding>
            <ListItemText primary="Be solely responsible for the security and privacy of your account, including all sensitive information associated with OAuth 2.0 authentication. " />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Ensure that the personal information you provide is accurate, truthful, and up-to-date, and update it as needed." />
          </ListItem>
        </List>
        <Typography>
          We use OAuth 2.0 for account authentication, and support providers
          such as Google, Microsoft Entra, and GitHub.
        </Typography>
        <Typography>
          We reserve the right to suspend or terminate your account if we
          believe you are using our Site unlawfully or violating these Terms.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Services
        </Typography>
        <Typography>
          We provide the following services to jobseekers: connecting them to
          training providers to increase their job-readiness in the IT industry
          and connecting them with potential employers in IT-related job roles.
          We do not supply any goods or services directly. If we become aware
          that a user is violating these Terms, we reserve the right to suspend
          or prohibit the user from using our Site.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Links to Third-Party Websites
        </Typography>
        <Typography>
          Our Site may contain links to third-party websites or services that we
          do not control. We are not responsible for the content, policies, or
          practices of these third-party websites. You are responsible for
          reviewing the terms and conditions and privacy policies of any
          third-party websites you use.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Limitation of Liability
        </Typography>
        <Typography>
          Washington Tech Workforce Coalition and our directors, officers,
          agents, employees, subsidiaries, and affiliates are not liable for any
          actions, claims, losses, damages, liabilities, or expenses, including
          legal fees, arising from your use of the Site.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Indemnification
        </Typography>
        <Typography>
          Except where prohibited by law, you agree to indemnify and hold
          harmless Washington Tech Workforce Coalition, along with our
          directors, officers, agents, employees, subsidiaries, and affiliates,
          from any actions, claims, losses, damages, liabilities, or expenses,
          including legal fees, resulting from your use of our Site or your
          violation of these Terms.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Governing Law
        </Typography>
        <Typography>
          These Terms are governed by the laws of the State of Washington.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Severability
        </Typography>
        <Typography>
          If any provision of these Terms is found to be invalid or
          unenforceable under applicable law, such provision will be removed,
          and the remaining provisions will continue in full effect.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Changes to Terms and Conditions
        </Typography>
        <Typography>
          We may amend these Terms from time to time to ensure compliance with
          the law or reflect changes in how we operate our Site. Users will be
          notified of significant changes via email or through a notice posted
          on our Site.
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Data Sharing
        </Typography>
        <Typography>
          By signing this agreement, you agree that we may communicate and
          validate your education and work history through our training partners
          and employers. The following data is collected for the sole purpose of
          Grant reporting and will only be shared with the State of Washington
          for grant reporting requirements and will not be shared with employers
          or training providers:
        </Typography>
        <List
          disablePadding
          sx={{
            listStyleType: "disc",
            "& .MuiListItem-root": { display: "list-item", marginLeft: 3 },
          }}
        >
          <ListItem disablePadding>
            <ListItemText primary="Gender" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Veteran Status" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Ethnicity" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Race" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Mental Disability" />
          </ListItem>
        </List>

        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Contact Information
        </Typography>
        <Typography>
          If you have any questions or concerns, please contact us at:
        </Typography>
        <Link href="mailto:Ritu@computingforall.org">
          Ritu@computingforall.org
        </Link>
        <Typography>Computing for All</Typography>
        <Typography>1311 108th Ave NE, Bellevue, WA 98004</Typography>
      </Box>
    </Container>
  );
}
