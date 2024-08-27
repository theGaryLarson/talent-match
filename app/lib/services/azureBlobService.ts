import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // fixme: make sure path is correct ../../../../
console.log("Connection String:", process.env.AZURE_STORAGE_CONNECTION_STRING);

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Method to get a BlockBlobClient for a specific container and blob name
function getBlockBlobClient(containerName: string, blobName: string): BlockBlobClient {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
}

// Method to upload a PDF
export async function uploadPdf(file: Buffer, userId: string): Promise<string> {
    const containerName = "career-services";
    const blobName = `${userId}/resume-${uuidv4()}.pdf`;  // Use a unique identifier for the filename
    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    try {
        await blockBlobClient.uploadData(file);
        return blockBlobClient.url;  // Return the URL of the uploaded file
    } catch (error) {
        console.error("Error uploading PDF:", error);
        throw new Error("Failed to upload PDF");
    }
}

// Method to upload an Image
export async function uploadImage(file: Buffer, userId: string): Promise<string> {
    const containerName = "career-services";
    const blobName = `${userId}/avatar-${uuidv4()}.jpg`;  // Use a unique identifier for the filename
    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    try {
        await blockBlobClient.uploadData(file, {
            blobHTTPHeaders: {
                blobContentType: "image/jpeg",  // Set the content type for the image
            },
        });
        return blockBlobClient.url;  // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
}

// Method to get a link to the resume PDF
export function getResumeLink(userId: string, resumeId: string): string {
    const containerName = "user-pdfs";
    const blobName = `${userId}/resume-${resumeId}.pdf`; // Match the blobName pattern used in uploadPdf
    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    return blockBlobClient.url;  // Return the URL of the resume
}

// Method to get a link to the avatar image
export function getImageLink(userId: string, avatarId: string): string {
    const containerName = "user-images";
    const blobName = `${userId}/avatar-${avatarId}.jpg`; // Match the blobName pattern used in uploadImage
    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    return blockBlobClient.url;  // Return the URL of the image
}
