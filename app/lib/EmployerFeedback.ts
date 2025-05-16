import { Prisma, PrismaClient } from "@prisma/client";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
const prisma:PrismaClient = getPrismaClient();
export async function getictjobs(){
    try{
    const res = await prisma.jobRole.findMany({include:{skills:true}})
    return res;
    }catch(e){
        return []
    }
}