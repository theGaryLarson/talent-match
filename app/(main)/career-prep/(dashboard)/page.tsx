import { ExecuteSqlFile } from "@/app/lib/sql/sqlUtils";
import CareerPrepDataGrid, { CareerPrepGridData } from "@/app/ui/components/careerPrep/CareerPrepDataGrid";
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = await ExecuteSqlFile("prisma/sql/Weekly Reports/Career Prep/CareerPrepCandidates.sql") as CareerPrepGridData[]
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">Career Prep Candidates</h1>
      <CareerPrepDataGrid clients={clients??[]}/>
    </main>
  );
}
