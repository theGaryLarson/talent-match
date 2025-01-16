import { PostEduProviderProgramDetailDTO, upsertTrainingProviderProgram } from "@/app/lib/eduProviders";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   const body:PostEduProviderProgramDetailDTO = await req.json() 
   console.log('api hit');
   const result = await upsertTrainingProviderProgram(body)
   return NextResponse.json(result)
}