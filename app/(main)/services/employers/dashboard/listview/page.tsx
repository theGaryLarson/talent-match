
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import SearchBar from '@/app/ui/components/SearchBar';
import { getUsers } from '@/app/lib/prisma';


export default async function page() {
  const jobSeekers = await getUsers();
  return (
    <main className="space-y-8 px-[200px] py-16">
      <h1 className="text-2xl">Search Results</h1>
      <SearchBar />
      {jobSeekers.map((jobSeeker, index) => (
        <JobSeekerCardView
          key={index}
          isLarge={true}
          name={jobSeeker.name}
          school={"Place Holder U"}
          pathway={"pathway"}
          skillsList={["JavaScript","skill2","skill3"]}
          pfpPicSrc={jobSeeker.image}
          aboutMe={"This is a short bio about myself "}
        />
      ))}
    </main>
  );
}
