import DeletionFlag from '@/app/ui/components/DeletionFlag';
import { auth } from '@/auth';
//employer dashboard
export const metadata = {
  title: "My Dashboard"
};
export default async function Page() {
  const session = await auth();
  return (
    <main className="space-y-3 py-8 font-['Roboto'] bg-gray-bg grow px-[50px]">
      <h1 className="text-2xl font-medium">
        My Dashboard
      </h1>
      <p>
        Career Prep Dash Perhaps
      </p>
    </main>
  );
}

