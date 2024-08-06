import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import Avatar from '@/app/ui/components/Avatar';
import Pill from '@/app/ui/components/Pill';
import Toggle from '@/app/ui/components/Toggle';
export default async function page({ params }: { params: { id: string } }) {
  let jobseeker = await getJobSeekerEmployerView(params.id);
  return (
    <main className="px-4 space-y-3 py-8 font-['Roboto'] md:px-[150px] lg:px-[200px] bg-gray-bg">
      {/* <Toggle/> */}
      
        <div className="flex h-[200px] items-center rounded-md border bg-white">
          <div className="flex items-center gap-5 p-4">
            <Avatar imgsrc={jobseeker?.contacts.photo_url} scale={3}></Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {jobseeker?.contacts.first_name +
                  ' ' +
                  jobseeker?.contacts.last_name}
              </h1>
              <h2>{jobseeker?.pathways?.pathway_title}</h2>
              <h2>
                {jobseeker?.jobseeker_education[0]?.eduInstitutions?.name}
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
            <p>{experience.responsibilities}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-md border p-4 bg-white">
        <h1 className="text-2xl font-bold">Education</h1>
        {jobseeker?.jobseeker_education.map((education) => {
          return (
            <div className="rounded-md border p-4 bg-gray-bg" key={education.edInstitutionId}>
              <h3 className="text-lg font-bold">
                {education.eduInstitutions.name}
              </h3>
              <p>{education.degreeType}</p>
              <p>{education.gradDate.toUTCString()}</p>
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
