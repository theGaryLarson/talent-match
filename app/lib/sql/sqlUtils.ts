import { NextResponse } from "next/server"; // For Next.js App Router
import { readFile } from "fs/promises";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function ExecuteSqlFile(path:string){
    try{
    const sqlQuery = await readFile(path, "utf-8");
    console.log(path)
    console.log(sqlQuery)
    const result = await prisma.$queryRawUnsafe(sqlQuery);
    console.log(result)
    return result;
    }catch(e){
        console.error(e);

    }
}