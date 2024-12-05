import { getGenderBreakDownOfJobseekers, getNumOfIndividualEmployers, getNumOfJobseekers, getUsersCreatedByQuarter } from "@/app/lib/admin/stats";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
//employer dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const numOfJobsekers = await getNumOfJobseekers();
  const numOfEmployers = await getNumOfIndividualEmployers()
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">
        Stats:
      </h1>
    <GenderPie/>
    <NewUsersByQaurter/>
      <p>
        Admin Dash 
      </p>
      <p>
        Reminder To add stats for nerds here like:
      </p>
      <ul>
        <li>Total Number of Jobseekers</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

    </main>
  );
}

async function GenderPie(){
  const genderBreakdownOfJobSeekers = await getGenderBreakDownOfJobseekers();
  const chartData = Object.entries(genderBreakdownOfJobSeekers).map(([gender, value], index) => ({
    id: index,
    value,
    label: (gender.length>0?gender:'UNKOWN')+`: ${value}`,
}));
  return(
    <div className='text-center w-fit'>
      <h3 className="text-xl">Gender Breakdown Of Jobseekers</h3>
<PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    /></div>
  );
}


async function NewUsersByQaurter(){
        const data = await getUsersCreatedByQuarter();
        const xAxis = data.map((item) => `${item.year}-Q${item.quarter}`);
        const seriesData = data.map((item) => item.userCount);
        return (
          <div className='text-center w-fit'>
      <h3 className="text-xl">Number Of New Users By Qaurter</h3>
          <BarChart
            xAxis={[{ scaleType: 'band', data: xAxis }]}
            series={[{ data: seriesData }]}
            width={500}
            height={300}
          />
          </div>
        );
}