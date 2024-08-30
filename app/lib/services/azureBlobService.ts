import {
    BlobServiceClient,
    BlockBlobClient, ContainerSASPermissions,
    generateBlobSASQueryParameters, SASProtocol,
    StorageSharedKeyCredential
} from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerName = "career-services";
const docFileExtensionsAllowed = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
const imagFileExtensionsAllowed = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Enum to define possible prefixes for different types of files
enum FilePrefix {
    Avatar = 'avatar',
    Resume = 'resume',
}

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

// Refactored uploadDocument method using the generalized uploadFile function
export async function uploadResume(file: Buffer, fileName: string, userId: string): Promise<string> {
    return await uploadFile(file, fileName, userId, FilePrefix.Resume, docFileExtensionsAllowed);
}

// Refactored method to get a link to the resume, accepting any allowed file extension
export async function getResumeUrl(userId: string): Promise<string | null> {
    const blobPrefix = `${userId}/${FilePrefix.Resume}`;  // Common prefix for resumes
    return await getBlobUrlWithSas(containerName, blobPrefix);
}

// Refactored uploadAvatar method using the generalized uploadFile function
export async function uploadAvatar(file: Buffer, fileName: string, userId: string): Promise<string> {
    return await uploadFile(file, fileName, userId, FilePrefix.Avatar, imagFileExtensionsAllowed);
}

// Refactored method to get a link to the avatar image
export async function getAvatarUrl(userId: string): Promise<string | null> {
    const blobPrefix = `${userId}/${FilePrefix.Avatar}`;  // Common prefix for avatars
    return await getBlobUrlWithSas(containerName, blobPrefix);
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

// Generalized Method to upload a file to Azure Blob Storage
async function uploadFile(file: Buffer, fileName: string, userId: string, prefix: FilePrefix, allowedExtensions: string[]): Promise<string> {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    // Check if the file extension is allowed
    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    // Get the content type based on the file extension
    const contentType = contentTypeMap[fileExtension];
    const blobName = `${userId}/${prefix}${fileExtension}`;  // Use a unique identifier for the filename

    // Delete any existing files with the same prefix
    await deleteExistingBlobs(containerName, `${userId}/${prefix}`);

    const blockBlobClient = getBlockBlobClient(containerName, blobName);

    try {
        // Upload the file with the appropriate content type
        await blockBlobClient.uploadData(file, {
            blobHTTPHeaders: {
                blobContentType: contentType,  // Set the content type for the file
            },
        });
        return blockBlobClient.url;  // Return the URL of the uploaded file
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
    }
}

// Method to get a BlockBlobClient for a specific container and blob name
function getBlockBlobClient(containerName: string, blobName: string): BlockBlobClient {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
}

// Generalized Method to get the URL of a blob with a specific prefix
async function getBlobUrlWithSas(containerName: string, blobPrefix: string): Promise<string | null> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container and filter by the expected prefix
    try {
        for await (const blob of containerClient.listBlobsFlat({ prefix: blobPrefix })) {
            // If a matching blob is found, return the URL
            const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
            const sasToken = generateSasToken(containerName, blob.name);
            return `${blockBlobClient.url}${sasToken}`;  // Return the full URL of the blob with SAS token
        }

        // If no matching blob is found, return null or handle accordingly
        return null;

    } catch (error) {
        console.error("Error retrieving blob link:", error);
        throw new Error("Failed to retrieve blob link");
    }
}

// Generate SAS Token for a specific blob
function generateSasToken(containerName: string, blobName: string): string {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    const sasOptions = {
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse("r"), // Read-only permissions
        expiresOn: new Date(new Date().valueOf() + 1800 * 1000), // Expires in 30 minutes
        protocol: SASProtocol.Https,
    };

    // Generate SAS token
    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

    return sasToken;
}

