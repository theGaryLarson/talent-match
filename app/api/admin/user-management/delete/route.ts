import { deleteUser } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req:Request) {
    const body:{userId:string} = await req.json()
    return NextResponse.json({ error: 'Not Yet Implemented' }, { status: 501 })
}