import { auth } from "@/auth";
import { Card, Stack } from "@mui/material";
import Carousel from "../Carousel";
// import CareerPrep from "@/app/ui/components/jobseekerdashboard/CareerPrep";
// import { getCareerPrepAssementStatus } from "@/app/lib/jobseeker";
// import { getJobSeekerEmployerView } from "@/app/lib/prisma";
// import { getJobSeekerAppliedJobs } from "@/app/lib/joblistings";
// import { getCareerPrepStatus } from "@/app/lib/admin/careerPrep";
import RoundedButton from "../RoundedButton";
import PillButton from "../PillButton";

export default async function AnnouncementSpace() {
  const session = await auth();

  // const [AssementInfo, jobseekerData, appliedJobs, carrerPrepEnrollment] =
  //   await Promise.all([
  //     getCareerPrepAssementStatus(),
  //     getJobSeekerEmployerView(session?.user.jobseekerId || ""),
  //     getJobSeekerAppliedJobs(),
  //     getCareerPrepStatus(session?.user.jobseekerId ?? ""),
  //   ]);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "1rem",
        backgroundColor: "rgb(246 246 246 / var(--tw-bg-opacity, 1))",
        p: "1rem",
      }}
    >
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="justify-center text-primary-main text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">
          Talent Portal Guide
        </div>
        <div className="self-stretch justify-center text-secondary-main text-3xl font-normal font-['Roboto'] leading-10">
          Welcome to the Talent Portal!
        </div>
        <div className="self-stretch justify-center text-text-primary text-base font-normal font-['Roboto'] leading-tight mb-8">
          This guide will help you navigate the platform and make the most of
          your journey to a technology career.
        </div>
      </div>
      <Carousel>
        {/* <CareerPrep
          enrollmentStatus={carrerPrepEnrollment?.enrollment}
          track={carrerPrepEnrollment?.AssignedTrack}
          jobseekerId={session?.user.jobseekerId ?? ""}
          caseManager={`${carrerPrepEnrollment?.CaseManger?.first_name ?? "Our"} ${carrerPrepEnrollment?.CaseManger?.last_name ?? "Career Navigator"}`}
        /> */}
        {/* Update your profile card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "rgb(255 255 255)",
            p: "1rem",
          }}
          className="w-full h-full"
        >
          <Stack direction={{ sx: "column" }} gap={2} className="p-4">
            <p className="self-stretch text-[32px] font-normal leading-[38.40px] text-secondary-main">
              Keep Your Profile Up to Date
            </p>
            <div className="inline-flex h-4 items-start justify-start gap-2.5 self-stretch">
              <p className="font-semibold leading-none tracking-wider text-primary-main">
                Your Talent Portal profile is key to showcasing your skills and
                experience to potential employers.
              </p>
            </div>
            <div className="list-disc font-normal leading-tight text-neutral-900/60 w-[50vw]">
              <p>
                To maximize your opportunities and stand out to employers, we
                encourage you to complete and maintain your{" "}
                <strong>
                  introduction, skills, education history, work experience, and
                  resume.
                </strong>
              </p>
            </div>
            <PillButton
              className="mt-4 place-self-end"
              color="secondary"
              href="/edit-profile/jobseeker/introduction"
            >
              Update Profile
            </PillButton>
          </Stack>
        </Card>
        {/* Find and apply for jobs card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "rgb(255 255 255)",
            p: "1rem",
          }}
          className="w-full h-full"
        >
          <Stack direction={{ sx: "column" }} gap={2} className="p-4">
            <p className="self-stretch text-[32px] font-normal leading-[38.40px] text-secondary-main">
              Find and Apply for Jobs
            </p>
            <div className="inline-flex h-4 items-start justify-start gap-2.5 self-stretch">
              <p className="font-semibold leading-none tracking-wider text-primary-main">
                We've built strong partnerships with employers to offer you
                targeted job opportunities.
              </p>
            </div>
            <div className="list-disc font-normal leading-tight text-neutral-900/60 w-[50vw]">
              <p>
                Our system analyzes your skills and experience to connect you
                with ideal roles, then our team reviews your qualifications and
                schedules a pre-screening meeting to prepare you for the
                application process. If you're a top candidate, we'll directly
                recommend you to the employer, boosting your chances of securing
                an interview and being considered for the role.
              </p>
            </div>
            <PillButton
              className="mt-4 place-self-end"
              color="secondary"
              href="/services/joblistings"
            >
              Search for Jobs
            </PillButton>
          </Stack>
        </Card>
        {/* Attend events card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "rgb(255 255 255)",
            p: "1rem",
          }}
          className="w-full h-full"
        >
          <Stack direction={{ sx: "column" }} gap={2} className="p-4">
            <p className="self-stretch text-[32px] font-normal leading-[38.40px] text-secondary-main">
              Attend Events
            </p>
            <div className="inline-flex h-4 items-start justify-start gap-2.5 self-stretch">
              <p className="font-semibold leading-none tracking-wider text-primary-main">
                Join our Events & Workshops!
              </p>
            </div>
            <div className="list-disc font-normal leading-tight text-neutral-900/60 w-[50vw]">
              <p>
                We offer monthly sessions led by industry professionals,
                covering essential skills and the latest industry knowledge. And
                because we know life gets busy, all workshops are recorded and
                available online.
              </p>
            </div>
            <PillButton
              className="mt-4 place-self-end"
              color="secondary"
              href="/services/jobseekers/dashboard/events"
            >
              View Events
            </PillButton>
          </Stack>
        </Card>
        {/* Join the community card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "1rem",
            backgroundColor: "rgb(255 255 255)",
            p: "1rem",
          }}
          className="w-full h-full"
        >
          <Stack direction={{ sx: "column" }} gap={2} className="p-4">
            <p className="self-stretch text-[32px] font-normal leading-[38.40px] text-secondary-main">
              Join the Community
            </p>
            <div className="inline-flex h-4 items-start justify-start gap-2.5 self-stretch">
              <p className="font-semibold leading-none tracking-wider text-primary-main"></p>
            </div>
            <div className="list-disc font-normal leading-tight text-neutral-900/60 w-[50vw]">
              <p>
                Our tech community provides you with access to a supportive
                environment where you can explore our comprehensive resource
                library, learn from industry experts, find groups based on your
                career goals and interests, join discussions, and build your
                network.
              </p>
            </div>
            <PillButton
              className="mt-4 place-self-end"
              color="secondary"
              href="https://forum.watechwfcoalition.org/"
            >
              Join the Community
            </PillButton>
          </Stack>
        </Card>
        {/* TODO: Explore career services card, once that feature is complete */}
      </Carousel>
    </Card>
  );
}
