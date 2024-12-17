import { getAllJobPosts } from '@/app/lib/joblistings';
import JobListingCardView from '@/app/ui/components/JobListingCardView';

export default async function page() {
  const jobPosts = await getAllJobPosts();
  return (
    <main className="mb-0 phone:p-6 laptop:px-[200px] pt-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="space-y-4">
        {jobPosts?.map((jobpost) => {
          return (
            <>
              <JobListingCardView
                joblisting={jobpost}
                key={jobpost.job_posting_id}
              />
            </>
          );
        })}
      </div>
    </main>
  );
}
