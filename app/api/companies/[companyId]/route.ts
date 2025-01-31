import { getCompanyById } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ companyId: string }> },
) {
  const params = await props.params;
  try {
    const companyId = params.companyId;
    if (!companyId) {
      return NextResponse.json(
        { success: false, error: `A uuidv4 companyId  is required.` },
        { status: 400 },
      );
    }
    const result = await getCompanyById(companyId);
    console.log(result);
    if (result == undefined) {
      return NextResponse.json(
        {
          error: "compant not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error("Error retrieving company.", e.message);
    return NextResponse.json(
      {
        error: `Failed to retrieve company.\n${e.message}`,
      },
      { status: 500 },
    );
  }
}
