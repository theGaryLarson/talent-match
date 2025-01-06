import {getEmployer, getEmployerWithSession} from "@/app/lib/employer";
import { CompanyEmployerCreationDTO } from "@/data/dtos/CompanyEmployerCreateionDTO";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const result = await getEmployerWithSession();
  return NextResponse.json(result);
}