import { Box, Container, Typography, Link, List, ListItem, ListItemText } from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{fontWeight: "bold"}}>
          Terms of Service
        </Typography>
        <Typography align="center">
          Published: December 2, 2024
        </Typography>
        <Typography align="center" sx={{mb: 2}}>
          <Box component={"span"} sx={{fontWeight: "bold"}}>Effective: </Box>December 2, 2024
        </Typography>

        <Typography>
          Thank you for using Washington Tech Coalition! By accessing or using our services, you agree to comply with and be bound by
          the following terms and conditions. Please read them carefully.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          1. Acceptance of Terms
        </Typography>
        <Typography>
          By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms.
          If you do not agree to these terms, you may not access or use the services.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          2. Changes to Terms
        </Typography>
        <Typography>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
          to the website. Your continued use of the service constitutes acceptance of the modified terms.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          3. User Conduct
        </Typography>
        <Typography>
          You agree not to engage in any prohibited activities, including but not limited to:
        </Typography>
        <List disablePadding sx={{ listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item', marginLeft: 3 }, }}>
          <ListItem disableGutters>
            <ListItemText primary="Violating any laws or regulations" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Infringing on the intellectual property rights of others." />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Attempting to disrupt the website or its security feature." />
          </ListItem>
        </List>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          4. Intellectual Property
        </Typography>
        <Typography>
          All content, including but not limited to text, images, and software, is the property of Washington Tech Coalition
          or its licensors. Unauthorized use of the content is prohibited.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          5. Disclaimer of Warranties
        </Typography>
        <Typography>
          The services are provided "as is" without warranties of any kind, either express or implied. We do not
          guarantee the accuracy, completeness, or reliability of the services.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          6. Limitation of Liability
        </Typography>
        <Typography>
          To the fullest extent permitted by law, Washington Tech Coalition shall not be liable for any damages arising from
          your use of the services.
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          7. Governing Law
        </Typography>
        <Typography>
          These terms are governed by the laws of Potatoland
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom sx={{mt: 4, fontWeight: "bold"}}>
          8. Contact Information
        </Typography>
        <Typography>
          If you have any questions about these terms, please contact us at{' '}
          <Link href="mailto:support@watechcoalition.org">support@watechcoalition.org</Link>.
        </Typography>
      </Box>
    </Container>
  );
};