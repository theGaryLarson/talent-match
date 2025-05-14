import { getJobListingById } from "@/app/lib/joblistings";
import { Box } from "@mui/material";
import Link from "next/link";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const joblisting = await getJobListingById(params.id);
  if (
    joblisting == null ||
    joblisting == undefined ||
    joblisting.job_post_url == undefined
  ) {
    return (
      <main className="h-screen text-center space-y-3 py-8 ml-4 tablet:mx-[150px] laptop:mx-[200px]">
        <h1 className="text-4xl">Job Listing Not Found</h1>
        <Link href="/services/joblistings" className="LINK">
          Find Active Job Listings Here
        </Link>
      </main>
    );
  }

  const job_post_url_formatted = joblisting.job_post_url.includes("https://")
    ? joblisting.job_post_url
    : joblisting.job_post_url.includes("http://")
      ? joblisting.job_post_url.replace("http://", "https://")
      : joblisting.job_post_url.concat("https://", joblisting.job_post_url);

  return (
    <Box sx={{ height: "90vh" }}>
      <iframe
        src={job_post_url_formatted}
        width="100%"
        height="100%"
        style={{
          border: 0,
          display: "block",
        }}
        title="Schedule a Meeting with CFA Career Services"
      ></iframe>
    </Box>
  );
}
