import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { uploadAvatar } from "@/app/lib/services/azureBlobService";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { file, fileName, userId } = body;

        if (!file || !userId) {
            return NextResponse.json({ success: false, error: "Missing file or userId" }, { status: 400 });
        }

        // Convert file back to Buffer
        const fileBuffer = Buffer.from(new Uint8Array(file));

        // Upload the image using the Azure Blob Storage service
        const imageUrl = await uploadAvatar(fileBuffer, fileName, userId);

        return NextResponse.json({ success: true, imageUrl }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: `Failed to upload image: ${e.message}` }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
