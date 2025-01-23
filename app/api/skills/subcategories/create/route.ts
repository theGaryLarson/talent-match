import { adminCreateSkillSubcategory } from '@/app/lib/admin/skill';
import { skill_subcategories } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: skill_subcategories = await req.json();
  console.log(body);
  let result = await adminCreateSkillSubcategory(body);
  return NextResponse.json(result);
}
