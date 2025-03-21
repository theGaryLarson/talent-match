import { auth } from "@/auth";
import { Card, Stack } from "@mui/material";
import Carousel from "../Carousel";
// import CareerPrep from "@/app/ui/components/jobseekerdashboard/CareerPrep";
// import { getCareerPrepAssementStatus } from "@/app/lib/jobseeker";
// import { getJobSeekerEmployerView } from "@/app/lib/prisma";
// import { getJobSeekerAppliedJobs } from "@/app/lib/joblistings";
// import { getCareerPrepStatus } from "@/app/lib/admin/careerPrep";
import RoundedButton from "../RoundedButton";

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
        <div className="self-stretch justify-center text-text-primary text-base font-normal font-['Roboto'] leading-tight mb-4">
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
              </p>
            </div>
            <div className="list-disc font-normal leading-tight text-neutral-900/60">
              <p>Keep your introduction, skills, education, work history, and resume current to help you <br/>stand out to employers and our Career Services team.</p>
            </div>
            <RoundedButton
              snug
              invertColor
              link="/edit-profile/jobseeker/introduction"
              content="Update Profile"
              className="mt-4 place-self-end"
            />
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
              </p>
            </div>
            <ul className="list-disc font-normal leading-tight text-neutral-900/60">
              <li><strong>Job Board:</strong> Browse available job openings that match your skills and apply for positions that align with your career goals.</li>
              <li><strong>Pre-Screening:</strong> Participate in job pre-screenings to receive guidance and support from a Career Navigator <br/>who can personally recommend you as a strong candidate to employers.</li>
            </ul>
            <RoundedButton
              snug
              invertColor
              link="/services/joblistings"
              content="Search for Jobs"
              className="mt-4 place-self-end"
            />
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
              </p>
            </div>
            <ul className="list-disc font-normal leading-tight text-neutral-900/60">
              <li><strong>Events:</strong> Register for workshops and events to further develop your skills, <br/>learn from industry professionals, and expand your network.</li>
            </ul>
            <RoundedButton
              snug
              invertColor
              link="/services/jobseekers/dashboard/events"
              content="View Events"
              className="mt-4 place-self-end"
            />
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
              <p className="font-semibold leading-none tracking-wider text-primary-main">
              </p>
            </div>
            <ul className="list-disc font-normal leading-tight text-neutral-900/60">
              <li><strong>Discourse Forum:</strong> Join relevant groups and participate in discussions by sharing <br/>your experiences, asking questions, and learning from others.</li>
            </ul>
            <RoundedButton
              snug
              invertColor
              link="https://forum.watechwfcoalition.org/"
              content="Join the Community"
              className="mt-4 place-self-end"
            />
          </Stack>
        </Card>
        {/* TODO: Explore career services card, once that feature is complete */}
      </Carousel>
    </Card>
  );
}
