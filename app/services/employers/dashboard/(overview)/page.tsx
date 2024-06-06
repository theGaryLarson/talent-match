
import LargeRoundedButtonCard from '@/app/ui/components/LargeRoundedButtonCard';
import ScoreCard from '@/app/ui/components/ScoreCard';
import Teaser from '@/app/ui/components/Teaser';
//employer dashboard
export default async function Page() {
  return (
    <main className='px-[200px]'>
      <div className="flex flex-wrap gap-2">
        {<ScoreCard title="Saved Candidates" val={5} />}
        {<ScoreCard title="Job Applications " val={5} />}
        {<ScoreCard title="Direct Messages" val={5} />}
        {<ScoreCard title="Connection Requests" val={5} />}
      </div>
      <div className='flex py-8'>
      <div className='grid grid-cols-2 gap-4 w-[900px]'>
        <Teaser isLarge={false} title={'Create a Job Posting'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '}/>
        <Teaser isLarge={false} title={'Create an Assessment'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '}/>
        <Teaser isLarge={false} title={'Web Analytics'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '}/>
        <Teaser isLarge={false} title={'Computing Details'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '}/>
      </div>
      <Teaser isLarge={true} title={'Become a Mentor'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor derp sigma you lost the game incididunt ut labore et dolore magna fugito aliqua. ed do eiusmod tempor incididunt '}/>
      </div>
      <LargeRoundedButtonCard/>
    </main>
  );
}
