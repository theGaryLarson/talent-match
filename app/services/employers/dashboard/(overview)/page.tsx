
import ScoreCard from '@/app/ui/components/ScoreCard';
import Teaser from '@/app/ui/components/Teaser';
//employer dashboard
export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="flex flex-wrap gap-2">
        {<ScoreCard title="Saved Candidates" val={5} />}
        {<ScoreCard title="Job Applications " val={5} />}
        {<ScoreCard title="Direct Messages" val={5} />}
        {<ScoreCard title="Connection Requests" val={5} />}
      </div>
      <div className='flex py-8'>
      <div className='grid grid-cols-2 gap-4 w-[900px]'>
        <Teaser isLarge={false}/>
        <Teaser isLarge={false}/>
        <Teaser isLarge={false}/>
        <Teaser isLarge={false}/>
      </div>
      <Teaser isLarge={true}/>
      </div>
    </main>
  );
}
