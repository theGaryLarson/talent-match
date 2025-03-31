import { getAllJobSeekersForCareerPrepHomePage } from "@/app/lib/admin/careerPrep";
import { ExecuteSqlFile } from "@/app/lib/sql/sqlUtils";
import CareerPrepDataGrid from "@/app/ui/components/careerPrep/CareerPrepDataGrid";
import { CareerPrepGridData } from "@/app/ui/components/careerPrep/CareerPrepDataGrid";

export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = await getAllJobSeekersForCareerPrepHomePage()
  // (await ExecuteSqlFile(
  //   "prisma/sql/Weekly Reports/Career Prep/CareerPrepCandidates.sql",
  // )) as CareerPrepGridData[];
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">
        Career Prep Candidates (all eligible Job Seekers)
      </h1>
      <CareerPrepDataGrid clients={clients ?? []} ShowClaimButton={false} />
    </main>
  );
}
