import { getAllJobSeekerCardView } from '@/app/lib/prisma';
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default async function FeaturedCandidates({ maxCandidates }: { maxCandidates: number | null }) {
  let jobSeekers = await getAllJobSeekerCardView();

    try {
        // Attempt to fetch job seekers data
        jobSeekers = await getAllJobSeekerCardView();

        // Ensure jobSeekers is an array before performing operations
        if (Array.isArray(jobSeekers) && maxCandidates != null && jobSeekers.length > maxCandidates) {
            // Safely slice the array if needed
            jobSeekers = jobSeekers.slice(0, maxCandidates);
        }
    } catch (error) {
        console.error('Failed to fetch or process job seekers:', error);
        // Log the error and fail gracefully without breaking the page
        jobSeekers = []; // Set jobSeekers to an empty array to continue rendering
    }

    return (
    <div>
      <h2 className="text-lg font-bold py-5">Featured Candidates</h2>
      <div className="grid laptop:grid-cols-3 gap-2">
        {jobSeekers?.map((jobSeeker: any) => (
          <JobSeekerCardView
              forceSmall={true}
              key={jobSeeker?.jobseeker_id}
              name={`${jobSeeker?.users?.first_name ?? ''} ${jobSeeker?.users?.last_name ?? ''}`.trim()}
              pathway={jobSeeker?.pathways?.pathway_title ?? ''}
              jobseeker={jobSeeker}
              pfpPicSrc={jobSeeker?.users?.photo_url ?? '/default-avatar.png'}
              aboutMe={jobSeeker?.intro_headline ?? 'No information available.'}
              id={jobSeeker?.jobseeker_id}
            />
        ))}

      </div>
    </div>
  )
}