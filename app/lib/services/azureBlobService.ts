import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerName = "career-services";
const avatarPrefix = 'avatar';
const resumePrefix = "resume";

const docFileExtensionsAllowed = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
const imagFileExtensionsAllowed = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];

// needed to map the correct content-type property based on file extension
const contentTypeMap: { [key: string]: string } = {
    // doc content-types
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
    '.rtf': 'application/rtf',
    // image content-types
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
};

// Method to get a BlockBlobClient for a specific container and blob name
function getBlockBlobClient(containerName: string, blobName: string): BlockBlobClient {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
}

// this will delete existing blobs with the same prefix to avoid storing multiple files with different file extensions.
// Reasoning: keep stored files limited to two per user. 1)avatar image 2) resume
// If we do want to include other types of files we can create a prefix for them.
async function deleteExistingBlobs(containerName: string, prefix: string) {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs with the given prefix
    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        await blockBlobClient.deleteIfExists();
    }
}

// Method to upload a PDF
export async function uploadDocument(file: Buffer, fileName: string, userId: string): Promise<string> {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    // Check if the file extension is allowed
    if (!docFileExtensionsAllowed.includes(fileExtension)) {
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    // Get the content type based on the file extension
    const contentType = contentTypeMap[fileExtension];
    const blobName = `${userId}/${resumePrefix}${fileExtension}`;  // Use a unique identifier for the filename

    // Delete any existing images with the same prefix
    const prefix = `${userId}/${resumePrefix}`;
    await deleteExistingBlobs(containerName, prefix);

    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    try {
        // Upload the file with the appropriate content type
        await blockBlobClient.uploadData(file, {
            blobHTTPHeaders: {
                blobContentType: contentType,  // Set the content type for the document
            },
        });
        return blockBlobClient.url;  // Return the URL of the uploaded document
    } catch (error) {
        console.error("Error uploading document:", error);
        throw new Error("Failed to upload document");
    }
}



// Method to upload an Image
export async function uploadAvatar(file: Buffer, fileName: string, userId: string): Promise<string> {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    // Check if the file extension is allowed
    if (!imagFileExtensionsAllowed.includes(fileExtension)) {
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    const contentType = contentTypeMap[fileExtension];
    const blobName = `${userId}/${avatarPrefix}${fileExtension}`;  // Use a unique identifier for the filename

    // Delete any existing images with the same prefix
    const prefix = `${userId}/${avatarPrefix}`;
    await deleteExistingBlobs(containerName, prefix);

    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    try {
        await blockBlobClient.uploadData(file, {
            blobHTTPHeaders: {
                blobContentType: contentType,  // Set the content type for the image
            },
        });
        return blockBlobClient.url;  // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
}

// Method to get a link to the resume PDF
export function getResumeUrl(userId: string): string {
    const blobName = `${userId}/${resumePrefix}${userId}.pdf`; // Match the blobName pattern used in uploadPdf
    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    return blockBlobClient.url;  // Return the URL of the resume
}

// Method to get a link to the avatar image
export async function getAvatarUrl(userId: string): Promise<string | null> {
    const containerName = "career-services";
    const blobPrefix = `${userId}/${avatarPrefix}`; // This is the common prefix for the filename

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container and filter by the expected prefix
    try {
        for await (const blob of containerClient.listBlobsFlat({ prefix: blobPrefix })) {
            // If a matching blob is found, return the URL
            const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
            return blockBlobClient.url;  // Return the full URL of the blob
        }

        // If no matching blob is found, return null or handle accordingly
        return null;

    } catch (error) {
        console.error("Error retrieving image link:", error);
        throw new Error("Failed to retrieve image link");
    }
}
