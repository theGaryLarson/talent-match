import { unflagDeletion } from "@/app/lib/user";
import {deleteJobseeker, setPool} from "@/app/lib/jobseeker";
import {NextResponse} from "next/server";

export async function PATCH() {
    await unflagDeletion(); // keep this
    // return await setPool(); here for testing purposes only.
    // await deleteJobseeker('F0FAB330-D153-400A-BBB0-5C80752D18AA');
    return NextResponse.json({ success: true }, { status: 200 });
}