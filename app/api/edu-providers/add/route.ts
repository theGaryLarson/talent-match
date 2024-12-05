import { NextResponse } from "next/server";
import {addTrainingPartner, AddTrainingPartnerDTO} from "@/app/lib/admin/eduProviderPartner";

export async function POST(req: Request) {
  const body: AddTrainingPartnerDTO= await req.json();
  console.log('Request body:', body);
  let result = await addTrainingPartner(body)
  return NextResponse.json(result);
}