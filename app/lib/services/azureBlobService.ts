import {
    BlobServiceClient,
    BlockBlobClient,
    ContainerSASPermissions,
    generateBlobSASQueryParameters,
    SASProtocol,
    StorageSharedKeyCredential
} from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const imageContainerName = "image-storage";
const resumeContainerName = "resume-storage";
const docFileExtensionsAllowed = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
const imagFileExtensionsAllowed = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];

// Enum to define possible prefixes for different types of files
enum FilePrefix {
    Avatar = 'avatar',
    Resume = 'resume',
}

// Needed to map the correct content-type property based on file extension
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

// Upload resume method using the generalized uploadFile function with SAS token
export async function uploadResume(file: Buffer, fileName: string, userId: string): Promise<string> {
    return await uploadFile(file, fileName, userId, FilePrefix.Resume, docFileExtensionsAllowed, resumeContainerName, true);
}

// Method to get a link to the resume with a SAS token
export async function getResumeUrl(userId: string): Promise<string | null> {
    const blobPrefix = `${userId}/${FilePrefix.Resume}`;  // Common prefix for resumes
    return await getBlobUrlWithSas(resumeContainerName, blobPrefix);
}

// Upload avatar method using the generalized uploadFile function without SAS token
export async function uploadAvatar(file: Buffer, fileName: string, userId: string): Promise<string> {
    return await uploadFile(file, fileName, userId, FilePrefix.Avatar, imagFileExtensionsAllowed, imageContainerName, false);
}

// Method to get a link to the avatar image without SAS token
export async function getAvatarUrl(userId: string): Promise<string | null> {
    const blobPrefix = `${userId}/${FilePrefix.Avatar}`;  // Common prefix for avatars
    return await getBlobUrl(imageContainerName, blobPrefix);
}

// Delete existing blobs with the same prefix to avoid storing multiple files with different file extensions.
async function deleteExistingBlobs(containerName: string, prefix: string) {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs with the given prefix
    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        await blockBlobClient.deleteIfExists();
    }
}

// Generalized Method to upload a file to Azure Blob Storage
async function uploadFile(
    file: Buffer,
    fileName: string,
    userId: string,
    prefix: FilePrefix,
    allowedExtensions: string[],
    containerName: string,
    attachSasToken: boolean
): Promise<string> {
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

        // Attach SAS token for resume URLs
        if (attachSasToken) {
            const sasToken = generateBlobSasToken(containerName, blobName);
            return `${blockBlobClient.url}?${sasToken}`;  // Return the URL of the uploaded file with SAS token
        } else {
            return blockBlobClient.url;  // Return the URL of the uploaded file without SAS token
        }
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

// Generalized Method to get the URL of a blob with a SAS token
async function getBlobUrlWithSas(containerName: string, blobPrefix: string): Promise<string | null> {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container and filter by the expected prefix
    try {
        for await (const blob of containerClient.listBlobsFlat({ prefix: blobPrefix })) {
            // If a matching blob is found, return the URL
            const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
            const sasToken = generateBlobSasToken(containerName, blob.name);
            // Check if the blockBlobClient.url already contains a '?' and append accordingly
            const separator = blockBlobClient.url.includes('?') ? '&' : '?';
            return `${blockBlobClient.url}${separator}${sasToken}`;  // Return the full URL of the blob with SAS token
        }

        // If no matching blob is found, return null or handle accordingly
        return null;
    } catch (error) {
        console.error("Error retrieving blob link:", error);
        throw new Error("Failed to retrieve blob link");
    }
}

// Generalized Method to get the URL of a blob without a SAS token
async function getBlobUrl(containerName: string, blobPrefix: string): Promise<string | null> {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List blobs in the container and filter by the expected prefix
    try {
        for await (const blob of containerClient.listBlobsFlat({ prefix: blobPrefix })) {
            // If a matching blob is found, return the URL
            const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
            return blockBlobClient.url;  // Return the URL of the blob without SAS token
        }

        // If no matching blob is found, return null or handle accordingly
        return null;
    } catch (error) {
        console.error("Error retrieving blob link:", error);
        throw new Error("Failed to retrieve blob link");
    }
}

// Function to convert current time to UTC formatted string for Azure SAS token
function formatDateToUTC(date: Date): string {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z'); // Format to remove milliseconds
}
// Generate SAS Token for a specific blob
function generateDateWithoutMilliseconds(date: Date): Date {
    const formattedDate = new Date(date);
    formattedDate.setMilliseconds(0);  // Remove milliseconds
    return formattedDate;
}

function generateBlobSasToken(containerName: string, blobName: string): string {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    // Set start time to 5 minutes ago and expiry to 24 hours later
    const startsOn = generateDateWithoutMilliseconds(new Date(new Date().getTime() - 5 * 60 * 1000));  // 5 minutes ago
    const expiresOn = generateDateWithoutMilliseconds(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));  // 24 hours later

    console.log("Starts On (UTC):", startsOn.toISOString());
    console.log("Expires On (UTC):", expiresOn.toISOString());

    // Define SAS options with Date objects directly
    const sasOptions = {
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse("r"), // Read-only permissions
        startsOn: startsOn,  // Use Date object without milliseconds
        expiresOn: expiresOn,  // Use Date object without milliseconds
        protocol: SASProtocol.Https, // HTTPS only
        version: "2022-11-02", // Set the service version to match Azure
    };

    // Generate SAS token
    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

    console.log("Generated SAS Token:", sasToken);
    return sasToken;
}

