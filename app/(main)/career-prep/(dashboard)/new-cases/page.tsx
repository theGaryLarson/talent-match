import { getUnManagedCareerPrepStudents } from '@/app/lib/admin/careerPrep';
import CareerPrepStudentsCard from '@/app/ui/components/careerPrep/CareerPrepStudentsCard';
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const clients = (await getUnManagedCareerPrepStudents()).sort((a, b) => a.careerPrepAssessmentDate.getTime() - b.careerPrepAssessmentDate.getTime());
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">
        New Students
      </h1>

      {
        clients?.map((client)=>{
          return(
            <CareerPrepStudentsCard showSelfAssign={true} key={client.jobseekerId} {...client}/>
          );
        })
      }
    </main>
  );
}

