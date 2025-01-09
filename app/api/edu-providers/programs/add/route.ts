import { addProviderProgram, addProviderProgramDTO } from "@/app/lib/admin/eduProviderPartner";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   const body:addProviderProgramDTO = await req.json() 
   console.log('api hit');
   const result = await addProviderProgram(body);
return NextResponse.json({},result)
}