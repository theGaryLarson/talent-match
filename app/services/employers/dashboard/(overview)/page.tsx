
import ScoreCard from '@/app/ui/components/ScoreCard';
//employer dashboard
export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {<ScoreCard title="collected" val={5} />}
        {<ScoreCard title="collected" val={5} />}
        {<ScoreCard title="collected" val={5} />}
        {<ScoreCard title="collected" val={5} />}
      </div>
   
    </main>
  );
}
