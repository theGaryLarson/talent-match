import { getAllCareerPrepStudentsCardView } from "@/app/lib/admin/careerPrep";
import CareerPrepStudentsCard from "@/app/ui/components/careerPrep/CareerPrepStudentsCard";
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const clients = await getAllCareerPrepStudentsCardView();
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">All Career Prep Students</h1>
      {clients?.map((client) => {
        return (
          <CareerPrepStudentsCard
            showSelfAssign={false}
            key={client.jobseekerId}
            {...client}
          />
        );
      })}
    </main>
  );
}
