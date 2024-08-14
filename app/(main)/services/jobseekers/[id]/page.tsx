import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import Avatar from '@/app/ui/components/Avatar';
import Pill from '@/app/ui/components/Pill';
import Toggle from '@/app/ui/components/Toggle';
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default async function page({ params }: { params: { id: string } }) {
  let jobseeker = await getJobSeekerEmployerView(params.id);
  return (
    <main className="px-4 space-y-3 py-8 font-['Roboto'] md:px-[150px] lg:px-[200px] bg-gray-bg">
      {/* <Toggle/> */}
      
        <div className="flex h-[200px] items-center rounded-md border bg-white">
          <div className="flex items-center gap-5 p-4">
            <Avatar imgsrc={jobseeker?.users.photo_url} scale={3}></Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {jobseeker?.users.first_name +
                  ' ' +
                  jobseeker?.users.last_name}
              </h1>
              <h2>{jobseeker?.current_job_title}</h2>
              <h2>
               {jobseeker?.jobseeker_education[0]?.eduInstitutions?.name + ' | ' + jobseeker?.jobseeker_education[0]?.degreeType +" | "+ jobseeker?.jobseeker_education[0].major}
              </h2>
              <h2>
                {jobseeker?.current_grade_level}
              </h2>
            </div>
          </div>
        </div>
      
<div className='flex flex-wrap gap-4'>
<div className='space-y-3 shrink max-w-[700px]'>
      <div className='space-y-4 rounded-md border p-4 bg-white'>
        <h1 className="text-2xl font-bold">Introduction</h1>
        <p>{jobseeker?.intro_headline}</p>
      </div>
      
      
      
      
      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Work Experience</h1>
        {jobseeker?.work_experiences.map((experience) => (
          <div key={experience.workId} className="rounded-md border p-4 bg-gray-bg">
            <h2 className="text-xl font-bold">
              {experience.company} | {experience.jobTitle}
            </h2>
            <span className='flex gap-1'>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5V3.33333H4.16667C3.24167 3.33333 2.5 4.08333 2.5 5V16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667ZM5.41667 10.8333C5.41667 9.68333 6.35 8.75 7.5 8.75C8.65 8.75 9.58333 9.68333 9.58333 10.8333C9.58333 11.9833 8.65 12.9167 7.5 12.9167C6.35 12.9167 5.41667 11.9833 5.41667 10.8333Z" fill="#047089"/>
              </svg>
              <p className='text-xs'>
                {monthNames[experience.startDate.getMonth()]} {experience.startDate.getFullYear()} - {experience.endDate?monthNames[experience.endDate.getMonth()] +" "+experience.endDate.getFullYear():"Present"}
              </p>
              </span>
            <p>{experience.responsibilities}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Education</h1>
        {jobseeker?.jobseeker_education.map((education) => {
          return (
            <div key={education.edInstitutionId} className="rounded-md border p-4 bg-gray-bg">
              <h3 className="font-bold">
                {education.eduInstitutions.name}
              </h3>
              <p>{education.degreeType} in {education.major}</p>
              <span className='flex gap-1'>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5V3.33333H4.16667C3.24167 3.33333 2.5 4.08333 2.5 5V16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667ZM5.41667 10.8333C5.41667 9.68333 6.35 8.75 7.5 8.75C8.65 8.75 9.58333 9.68333 9.58333 10.8333C9.58333 11.9833 8.65 12.9167 7.5 12.9167C6.35 12.9167 5.41667 11.9833 5.41667 10.8333Z" fill="#047089"/>
              </svg>
              <p className='text-xs'>{monthNames[education.startDate.getMonth()]} {education.startDate.getFullYear()} - {monthNames[education.gradDate.getMonth()]} {education.gradDate.getFullYear()}</p>
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold ">Projects</h1>

        {jobseeker?.project_experiences.map((experence) => (
          <div className="rounded-md border p-4 bg-gray-bg" key={experence.projectId}>
            <h2 className="text-xl">{experence.projTitle}</h2>
            <p className="text-sm">
              {experence.startDate.toLocaleDateString() +
                ' - ' +
                experence.completionDate.toLocaleDateString()}
            </p>
            <p>{experence.problemSolvedDescription}</p>
            {experence.demoUrl ? (
              <a target="_blank" href={experence.demoUrl}>
                {experence.demoUrl}
              </a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
</div>
<div className='w-[350px] space-y-3 grow-[2]'>
      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Skills</h1>
        <div className="flex flex-wrap gap-4">
          {}
          {jobseeker?.jobseeker_has_skills.map((skill) => (
            <Pill
              text={skill.skills.skill_name}
              href={skill.skills.skill_info_url}
              key={skill.skills.skill_id}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Resume</h1>
        {jobseeker?.resume_url ? (
          <a href={jobseeker?.resume_url}>View Resume</a>
        ) : (
          ''
        )}
      </div>

      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        {jobseeker?.portfolio_url ? (
          <a href={jobseeker?.portfolio_url}>{jobseeker?.portfolio_url}</a>
        ) : (
          ''
        )}
      </div>
</div>
</div>
    </main>
  );
}
