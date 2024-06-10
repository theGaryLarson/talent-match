import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import ScoreCard from '@/app/ui/components/ScoreCard';
import Teaser from '@/app/ui/components/Teaser';
//employer dashboard
export default async function Page() {
  return (
    <main className="md:px-[80px] lg:px-[200px] space-y-4">
      <div className="flex flex-wrap gap-4">
        {<ScoreCard title="Saved Candidates" val={5} />}
        {<ScoreCard title="Job Applications " val={5} />}
        {<ScoreCard title="Direct Messages" val={5} />}
      </div>
      <div className="flex py-8 justify-evenly flex-wrap">
        <Teaser
          isLarge={true}
          title={'Become a Mentor'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
        <Teaser
          isLarge={true}
          title={'Create a Job Posting'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
        <Teaser
          isLarge={true}
          title={'Create an Assessment'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
      </div>
      <LargeRoundedButtonCard title={"Ready to Hire"} blurb={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."} buttonContent={"Search For talent"} />

      <h2 className='text-lg font-bold'>Featured candidates</h2>

      <div className='flex flex-wrap gap-5'>
        <JobSeekerCardView
          isLarge={false}
          name={'Damien Cruz'}
          school={'University Of Washington'}
          pathway={'Software Devolpment'}
          skillsList={['Rust', 'JavaScript', 'Python']}
        />
        <JobSeekerCardView
          isLarge={false}
          name={'John Hancock'}
          school={'Bates Technical College'}
          pathway={'Cyber Security'}
          skillsList={['Rust', 'JavaScript', 'Python']}
        />
        <JobSeekerCardView
          isLarge={false}
          name={'Alice Johnson'}
          school={'Massachusetts Institute of Technology'}
          pathway={'Data Science'}
          skillsList={['Python', 'R', 'SQL', 'Machine Learning']}
        />

        <JobSeekerCardView
          isLarge={false}
          name={'Carol White'}
          school={'California Institute of Technology'}
          pathway={'DevOps'}
          skillsList={['Docker', 'Kubernetes', 'CI/CD', 'Bash']}
        />
      </div>
    </main>
  );
}
