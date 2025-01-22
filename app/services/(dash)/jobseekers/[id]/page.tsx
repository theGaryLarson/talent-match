import Avatar from '@/app/ui/components/Avatar';
import Skills from '@/app/ui/components/Skills';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import DeletionFlag from '@/app/ui/components/DeletionFlag';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid2,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Role } from '@/data/dtos/UserInfoDTO';
import PillButton from '@/app/ui/components/PillButton';
import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import { getResumeUrl } from '@/app/lib/services/azureBlobService';
import { auth } from '@/auth';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatUrl(url: string) {
  if (!url) return '';
  if (url == '') return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const [params, session] = await Promise.all([props.params, auth()]);
  const jobseeker = await getJobSeekerEmployerView(params.id);

  const isOwnProfile = session?.user.jobseekerId === params.id;
  let videoID = null;
  let resumeUrl = null;

  if (jobseeker?.video_url) {
    const parsedUrl = new URL(jobseeker?.video_url);
    if (parsedUrl.hostname === 'youtu.be') {
      videoID = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com'
    ) {
      videoID = new URLSearchParams(parsedUrl.search).get('v') ?? '';
    }
  }

  if (
    session?.user.employeeIsApproved ||
    isOwnProfile ||
    session?.user.roles.includes(Role.ADMIN) ||
    session?.user.roles.includes(Role.CASE_MANAGER)
  ) {
    if (jobseeker) resumeUrl = await getResumeUrl(jobseeker?.users.id);
  }

  return (
    <Container sx={{ pb: 4 }}>
      <DeletionFlag deletionDate={undefined} />
      {isOwnProfile && (
        <Stack
          direction={'row'}
          gap={2}
          sx={{
            pt: '25px',
            mb: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}
        >
          <PillButton
            disableElevation
            href={'/services/jobseekers/dashboard'}
            sx={{
              backgroundColor: '#f6f6f6',
              color: '#014260',
            }}
          >
            Dashboard
          </PillButton>
          <Typography
            variant="h4"
            sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 400 }}
          >
            |
          </Typography>
          <PillButton disableElevation>Showcase</PillButton>
        </Stack>
      )}

      <Grid2 container gap={2} sx={{ mb: 2, justifyContent: 'center' }}>
        <Grid2>
          <Card variant="outlined">
            <Stack
              gap={2}
              direction={'row'}
              sx={{ padding: 2, alignItems: 'center' }}
            >
              <Avatar
                imgsrc={jobseeker?.users.photo_url ?? undefined}
                scale={1.5}
              ></Avatar>
              <Stack direction={'column'}>
                {jobseeker?.users.first_name && (
                  <h1 className="text-2xl font-bold">
                    {jobseeker?.users.first_name +
                      ' ' +
                      jobseeker?.users.last_name}
                  </h1>
                )}
                <h2>{jobseeker?.current_job_title}</h2>
                <h2>
                  {jobseeker?.jobseeker_education[0]
                    ? jobseeker.jobseeker_education[0].eduProviders?.name +
                      ' | ' +
                      jobseeker.jobseeker_education[0].degreeType +
                      ' | ' +
                      (jobseeker?.jobseeker_education[0]?.program?.title
                        ? jobseeker.jobseeker_education[0].program.title
                        : '')
                    : ''}
                </h2>
                <h2>{jobseeker?.current_grade_level}</h2>
              </Stack>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/introduction'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
          </Card>
        </Grid2>
        <Grid2>
          {videoID && (
            <iframe
              className="aspect-video min-w-[200px]"
              src={`https://www.youtube.com/embed/${videoID}?autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', maxWidth: '600px' }}
            ></iframe>
          )}
        </Grid2>
      </Grid2>
      <Container>
        <Stack gap={2} divider={<Divider orientation="horizontal" flexItem />}>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Introduction
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/introduction'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Typography sx={{ pl: 2 }}>{jobseeker?.intro_headline}</Typography>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Preferences
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/preferences'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Typography sx={{ pl: 2 }}>
              I am looking for {jobseeker?.employment_type_sought} roles
              <br />
              My targeted pathway is {jobseeker?.pathways?.pathway_title}
            </Typography>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Skills
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/showcase'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Box sx={{ pl: 2 }}>
              <Skills
                skillsList={jobseeker?.jobseeker_has_skills.map(
                  (item: JobseekerSkillDTO) => item.skills,
                )}
                maxNumSkills={0}
              />
            </Box>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Work Experience{' '}
                {jobseeker?.years_work_exp
                  ? '(' + jobseeker?.years_work_exp + 'Y)'
                  : ''}
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/work-experience'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Stack gap={1} sx={{ pl: 2 }}>
              {jobseeker?.work_experiences.map((experience) => (
                <Box key={experience.workId}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    {experience.company} | {experience.jobTitle}
                  </Typography>
                  <Stack gap={1} direction="row">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5V3.33333H4.16667C3.24167 3.33333 2.5 4.08333 2.5 5V16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667ZM5.41667 10.8333C5.41667 9.68333 6.35 8.75 7.5 8.75C8.65 8.75 9.58333 9.68333 9.58333 10.8333C9.58333 11.9833 8.65 12.9167 7.5 12.9167C6.35 12.9167 5.41667 11.9833 5.41667 10.8333Z"
                        fill="#047089"
                      />
                    </svg>
                    <Typography className="text-xs">
                      {monthNames[new Date(experience.startDate).getMonth()]}{' '}
                      {new Date(experience.startDate).getFullYear()} -{' '}
                      {experience.endDate
                        ? monthNames[new Date(experience.endDate).getMonth()] +
                          ' ' +
                          new Date(experience.endDate).getFullYear()
                        : 'Present'}
                    </Typography>
                  </Stack>
                  <p>{experience.responsibilities}</p>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Education
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/education'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Stack
              divider={<Divider orientation="horizontal" flexItem />}
              sx={{ pl: 2 }}
            >
              {jobseeker?.jobseeker_education.map((education) => (
                <Box key={education.id}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    {education.eduProviders.name}
                  </Typography>
                  <Typography>
                    {education?.program?.title} | {education.degreeType}
                  </Typography>
                  <Stack gap={1} direction="row">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5V3.33333H4.16667C3.24167 3.33333 2.5 4.08333 2.5 5V16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667ZM5.41667 10.8333C5.41667 9.68333 6.35 8.75 7.5 8.75C8.65 8.75 9.58333 9.68333 9.58333 10.8333C9.58333 11.9833 8.65 12.9167 7.5 12.9167C6.35 12.9167 5.41667 11.9833 5.41667 10.8333Z"
                        fill="#047089"
                      />
                    </svg>
                    <Typography className="text-xs">
                      {monthNames[new Date(education.startDate).getMonth()]}{' '}
                      {new Date(education.startDate).getFullYear()} -{' '}
                      {monthNames[new Date(education.gradDate).getMonth()]}{' '}
                      {new Date(education.gradDate).getFullYear()}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Projects
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/education'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            <Stack gap={1} sx={{ pl: 2 }}>
              {jobseeker?.project_experiences.map((experience) => (
                <Box key={experience.projectId}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    {experience.projTitle}
                  </Typography>
                  <Stack gap={1} direction="row">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5V3.33333H4.16667C3.24167 3.33333 2.5 4.08333 2.5 5V16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667ZM5.41667 10.8333C5.41667 9.68333 6.35 8.75 7.5 8.75C8.65 8.75 9.58333 9.68333 9.58333 10.8333C9.58333 11.9833 8.65 12.9167 7.5 12.9167C6.35 12.9167 5.41667 11.9833 5.41667 10.8333Z"
                        fill="#047089"
                      />
                    </svg>
                    <Typography className="text-xs">
                      {monthNames[new Date(experience.startDate).getMonth()]}{' '}
                      {new Date(experience.startDate).getFullYear()} -{' '}
                      {experience.completionDate
                        ? monthNames[
                            new Date(experience.completionDate).getMonth()
                          ] +
                          ' ' +
                          new Date(experience.completionDate).getFullYear()
                        : 'Present'}
                    </Typography>
                  </Stack>
                  {experience.repoUrl ? (
                    <Link
                      sx={{ wordBreak: 'break-all' }}
                      target="_blank"
                      href={experience.repoUrl}
                    >
                      {experience.repoUrl}
                    </Link>
                  ) : (
                    ''
                  )}
                  <p>{experience.problemSolvedDescription}</p>
                  <Skills
                    skillsList={experience.project_has_skills.map(
                      (item: JobseekerSkillDTO) => item.skills,
                    )}
                    maxNumSkills={0}
                    key={experience.projectId + 'skills'}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Resume
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/showcase'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            {resumeUrl ? (
              <Link sx={{ pl: 2 }} href={resumeUrl} target="_blank">
                View Resume
              </Link>
            ) : (
              ''
            )}
          </Box>
          <Box>
            <Stack gap={2} direction={'row'}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Portfolio
              </Typography>
              {isOwnProfile && (
                <Link
                  sx={{
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                  href={'/edit-profile/jobseeker/showcase'}
                >
                  <EditIcon />
                </Link>
              )}
            </Stack>
            {jobseeker?.portfolio_url ? (
              <Link
                sx={{ pl: 2 }}
                href={formatUrl(jobseeker?.portfolio_url)}
                target="_blank"
              >
                {jobseeker?.portfolio_url}
              </Link>
            ) : (
              ''
            )}
          </Box>
          {(jobseeker?.linkedin_url || isOwnProfile) && (
            <Box>
              <Stack gap={2} direction={'row'}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  LinkedIn
                </Typography>
                {isOwnProfile && (
                  <Link
                    sx={{
                      opacity: 0.65,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                    href={'/edit-profile/jobseeker/showcase'}
                  >
                    <EditIcon />
                  </Link>
                )}
              </Stack>
              {jobseeker?.linkedin_url && (
                <Link
                  sx={{ pl: 2 }}
                  href={
                    'https://www.linkedin.com' +
                    jobseeker.linkedin_url
                      .toLowerCase()
                      .split('linkedin.com')[1]
                  }
                  target="_blank"
                >
                  {'https://www.linkedin.com' +
                    jobseeker.linkedin_url
                      .toLowerCase()
                      .split('linkedin.com')[1]}
                </Link>
              )}
            </Box>
          )}
        </Stack>
      </Container>
    </Container>
  );
}
