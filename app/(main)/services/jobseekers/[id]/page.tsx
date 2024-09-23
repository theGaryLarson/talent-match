import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import Avatar from '@/app/ui/components/Avatar';
import Skills from '@/app/ui/components/Skills';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { auth } from '@/auth';
import { format } from 'path';
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

function formatUrl(url:string) {
  if (!url) return '';
  // If the URL starts with http:// or https://, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Default to https:// but don't force it, allow users to adjust
  return `https://${url}`;
}
export default async function page({ params }: { params: { id: string } }) {
  let jobseeker = await getJobSeekerEmployerView(params.id);
  const session = await auth();
  let videoID = '';
  if (jobseeker?.video_url) {
    const parsedUrl = new URL(jobseeker?.video_url);
    console.log(parsedUrl);
    if (parsedUrl.hostname === 'youtu.be') {
      videoID = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com'
    ) {
      videoID = new URLSearchParams(parsedUrl.search).get('v') ?? '';
    }
    console.log('Vid id is: ', videoID);
  }

  return (
    <main className="space-y-3 bg-gray-bg px-4 py-8 font-['Roboto'] tablet:px-[150px] laptop:px-[200px]">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center rounded-md border bg-white grow">
          <div className="flex items-center gap-5 p-4">
            <Avatar imgsrc={jobseeker?.users.photo_url??undefined} scale={1.5}></Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {jobseeker?.users.first_name + ' ' + jobseeker?.users.last_name}
              </h1>
              <h2></h2>
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
            </div>
          </div>
        </div>
        <iframe
          className="aspect-video min-w-[200px] grow"
          src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className=" grow space-y-3">
          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold">Introduction</h1>
            <p>{jobseeker?.intro_headline}</p>
          </div>

          <div className="space-y-4 rounded-md border bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Work Experience</h1>
              <h1 className="text-2xl font-bold">
                {jobseeker?.years_work_exp}Y
              </h1>
            </div>
            {jobseeker?.work_experiences.map((experience) => (
              <div
                key={experience.workId}
                className="rounded-md border bg-gray-bg p-4"
              >
                <h2 className="text-xl font-bold">
                  {experience.company} | {experience.jobTitle}
                </h2>
                <span className="flex gap-1">
                  <svg
                    width="15"
                    height="15"
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
                  <p className="text-xs">
                    {monthNames[experience.startDate.getMonth()]}{' '}
                    {experience.startDate.getFullYear()} -{' '}
                    {experience.endDate
                      ? monthNames[experience.endDate.getMonth()] +
                        ' ' +
                        experience.endDate.getFullYear()
                      : 'Present'}
                  </p>
                </span>
                <p>{experience.responsibilities}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold">Education</h1>
            {jobseeker?.jobseeker_education.map((education) => {
              return (
                <div
                  key={education.id}
                  className="rounded-md border bg-gray-bg p-4"
                >
                  <h3 className="font-bold">{education.eduProviders.name}</h3>
                  <p>
                    {education?.program?.title} | {education.degreeType}s
                  </p>
                  <span className="flex gap-1">
                    <svg
                      width="15"
                      height="15"
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
                    <p className="text-xs">
                      {monthNames[education.startDate.getMonth()]}{' '}
                      {education.startDate.getFullYear()} -{' '}
                      {monthNames[education.gradDate.getMonth()]}{' '}
                      {education.gradDate.getFullYear()}
                    </p>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold ">Projects</h1>

            {jobseeker?.project_experiences.map((experience) => (
              <div
                className="rounded-md border bg-gray-bg p-4"
                key={experience.projectId}
              >
                <h2 className="text-xl">{experience.projTitle}</h2>
                <span className="flex gap-1">
                  <svg
                    width="15"
                    height="15"
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
                  <p className="text-xs">
                    {monthNames[experience.startDate.getMonth()]}{' '}
                    {experience.startDate.getFullYear()} -{' '}
                    {experience.completionDate
                      ? monthNames[experience.completionDate.getMonth()] +
                        ' ' +
                        experience.completionDate.getFullYear()
                      : 'Present'}
                  </p>
                </span>
                <p>{experience.problemSolvedDescription}</p>
                {experience.demoUrl ? (
                  <a target="_blank" href={experience.demoUrl}>
                    {experience.demoUrl}
                  </a>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        </div>
        <div className=" grow space-y-3">
          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 id="skills" className="text-2xl font-bold">
              Skills
            </h1>
            <div className="flex flex-wrap gap-4">
              <Skills
                skillsList={jobseeker?.jobseeker_has_skills.map(
                  (item: JobseekerSkillDTO) => item.skills,
                )}
                maxNumSkills={0}
              />
            </div>
          </div>
          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold">Preferences</h1>
            <p>I am looking for {jobseeker?.employment_type_sought} roles</p>
            <p>My targeted pathway is {jobseeker?.pathways?.pathway_title}</p>
          </div>
          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold">Resume</h1>
            {jobseeker?.resume_url ? (
              <a href={jobseeker?.resume_url}>View Resume</a>
            ) : (
              ''
            )}
          </div>

          <div className="space-y-4 rounded-md border bg-white p-4">
            <h1 className="text-2xl font-bold">Portfolio</h1>
            {jobseeker?.portfolio_url ? (
              <a href={formatUrl(jobseeker?.portfolio_url)}>{jobseeker?.portfolio_url}</a>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
