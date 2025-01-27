import { adminCreateCompany } from "@/app/lib/admin/companyManagement";
import { CompanyAdminCreationDTO } from "@/data/dtos/CompanyAdminCreationDTO";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: CompanyAdminCreationDTO = await req.json();
  console.log("Request body:", body);
  let result = await adminCreateCompany(body);
  return NextResponse.json(result);
}
