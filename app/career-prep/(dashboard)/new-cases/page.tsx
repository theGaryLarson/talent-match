import { getUnManagedCareerPrepStudents } from "@/app/lib/admin/careerPrep";
import NewCasesDataGrid from "@/app/ui/components/careerPrep/NewCasesDataGrid";
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = await getUnManagedCareerPrepStudents();
  return (
    <main className="space-y-3s">
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
      <div className="max-w-10/12">
        <NewCasesDataGrid clients={clients} ShowClaimButton={true} />
      </div>
    </main>
  );
}
