import { getUnManagedCareerPrepStudents } from "@/app/lib/admin/careerPrep";
import CareerPrepStudentsCard from "@/app/ui/components/careerPrep/CareerPrepStudentsCard";
import NewCasesDataGrid from "@/app/ui/components/careerPrep/NewCasesDataGrid";
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = (await getUnManagedCareerPrepStudents());
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">New Students</h1>

      {/* {clients?.map((client) => {
        return (
          <CareerPrepStudentsCard
            showSelfAssign={true}
            key={client.jobseekerId}
            {...client}
          />
        );
      })} */}
      <NewCasesDataGrid clients={clients}/>
    </main>
  );
}
