import { getCompanyById, getEmployerById } from "@/app/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import NewJobFormButton from "@/app/ui/components/jobManagement/NewJobFormButton";

export const metadata = {
  title: "Job Management",
};

export default async function Page() {
  const session = await auth();

  const proInfo = await getEmployerById(session?.user.employerId ?? "");
  const company = await getCompanyById(proInfo?.company_id ?? "");
  if (!proInfo || company == undefined) {
    return (
      <div>
        <h1 className="text-2xl">
          There has been an error finding your info please try logging out and
          logging back in
        </h1>
      </div>
    );
  }
  return (
    <Box sx={{ mb: 12, mx: { xs: 3, md: 6.25 } }}>
      <Link href="/services/employers/dashboard">
        <ArrowBack sx={{ width: "16px", height: "16px" }} /> My Dashboard
      </Link>

      <Typography variant="h3" sx={{ color: "secondary.main" }}>
        Job Management
      </Typography>

      <Box sx={{ my: 5 }}>
        <NewJobFormButton job_posting={undefined} />
      </Box>
    </Box>
  );
}
