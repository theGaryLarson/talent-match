import { adminGetSkillSubcategories } from "@/app/lib/admin/skill";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let result = await adminGetSkillSubcategories();
    return NextResponse.json(result);
  } catch (e) {
    console.error('Error fetching skill subcategories:', e);
    return NextResponse.json(
      { error: 'Failed to fetch skill subcategories' },
      { status: 500 }
    );
  }
}