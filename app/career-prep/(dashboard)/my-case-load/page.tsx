export const dynamic = "force-dynamic";
import { getCareerPrepStudentsCardViewByCaseManagerSession } from "@/app/lib/admin/careerPrep";
import NewCasesDataGrid from "@/app/ui/components/careerPrep/NewCasesDataGrid";
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = await getCareerPrepStudentsCardViewByCaseManagerSession();
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">My Students</h1>
      <NewCasesDataGrid clients={clients} ShowClaimButton={false}/>
    </main>
  );
}
