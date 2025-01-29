import { adminGetSkills } from "@/app/lib/admin/skill";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const result = await adminGetSkills();
  return NextResponse.json(result);
}
