import { adminDeleteUser } from "@/app/lib/admin/adminOnlyFuncs"
import { NextResponse } from "next/server"

export async function DELETE(req:Request) {
    const body:{userId:string} = await req.json()
    const res = adminDeleteUser(body.userId)
    return NextResponse.json({ error: 'Not Yet Implemented' }, { status: 501 })
}