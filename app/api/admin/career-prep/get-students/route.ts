import { NextResponse } from 'next/server';
import {getCareerPrepStudentsCardView} from "@/app/lib/admin/careerPrep";

export async function GET() {
    const data = await getCareerPrepStudentsCardView();

    if (data === null) {
        // Return a 500 error response if data is null due to an error
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    return NextResponse.json(data);
}
