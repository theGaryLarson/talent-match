import { deleteEduProvidor } from "@/app/lib/eduProviders";
import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";
import { NextResponse } from "next/server";
/**
 * not implemented yet
 * @returns 
 */
export async function DELTE(){
    const session = await auth();
    if(!session?.user.roles.includes(Role.ADMIN)){
        return NextResponse.json({},{status:401})
    }
    return NextResponse.json({},{status:501})
}