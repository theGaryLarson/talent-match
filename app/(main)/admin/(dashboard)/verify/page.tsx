import { getAllCompaniesWithAllEmployers } from "@/app/lib/admin/companyManagement";
import { getAllCompanies } from "@/app/lib/employer";
import CompanyVerifyTable from "@/app/ui/components/admin/CompanyVerifyTable";

export default async function page() {
  const companies = await getAllCompaniesWithAllEmployers();
  return (
    <main>
      <CompanyVerifyTable companies={companies} />
    </main>
  );
}
