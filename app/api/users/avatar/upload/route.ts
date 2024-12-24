import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { uploadAvatar } from "@/app/lib/services/azureBlobService";
import { auth } from "@/auth";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        // Get essentials from session, not the request.
        // @Rory, let's discuss this tomorrow please.
        // In this instance. The component is the control/gatekeeper for
        // whether we need an userId, companyId or eduProviderId.
        // We could create three separate components that work
        // identically, so we know the context and can use session but that still wouldn't
        // work for a third party. aka
        // admin changing someone else's data.

        // let session = await auth();
        // const userId: string = session?.user.id!;

        const body = await request.json();
        const { file, fileName, userId } = body; // destructured userId from the body (there from older code in AvatarUpload.tsx).

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
