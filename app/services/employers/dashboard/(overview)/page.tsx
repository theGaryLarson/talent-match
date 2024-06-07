import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import ScoreCard from '@/app/ui/components/ScoreCard';
import Teaser from '@/app/ui/components/Teaser';
//employer dashboard
export default async function Page() {
  return (
    <main className="px-[200px]">
      <div className="flex flex-wrap gap-2">
        {<ScoreCard title="Saved Candidates" val={5} />}
        {<ScoreCard title="Job Applications " val={5} />}
        {<ScoreCard title="Direct Messages" val={5} />}
        {<ScoreCard title="Connection Requests" val={5} />}
      </div>
      <div className="flex py-8">
        <div className="grid w-[900px] grid-cols-2 gap-4">
          <Teaser
            isLarge={false}
            title={'Create a Job Posting'}
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            }
          />
          <Teaser
            isLarge={false}
            title={'Create an Assessment'}
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            }
          />
          <Teaser
            isLarge={false}
            title={'Web Analytics'}
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            }
          />
          <Teaser
            isLarge={false}
            title={'Computing Details'}
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            }
          />
        </div>
        <Teaser
          isLarge={true}
          title={'Become a Mentor'}
          text={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '
          }
        />
      </div>
      <LargeRoundedButtonCard />

      <h2 className='text-xl'>Featured candidates</h2>
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
      <h2 className='text-xl'>Browse By Categories</h2>
    </main>
  );
}
