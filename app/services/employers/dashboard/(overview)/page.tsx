
import ScoreCard from '@/app/ui/components/ScoreCard';
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
   
    </main>
  );
}
