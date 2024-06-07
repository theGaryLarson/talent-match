import { Card } from '@/app/ui/employer-dashboard/cards';
import RevenueChart from '@/app/ui/employer-dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
//job seeker dashboard
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {<Card title="Collected" value={5} type="collected" />}
        {<Card title="Pending" value={5} type="pending" />}
        {<Card title="Total Invoices" value={5} type="invoices" />}
        {<Card title="Total Customers" value={5} type="customers" />}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          {<RevenueChart />}
        </Suspense>
      </div>
    </main>
  );
}
