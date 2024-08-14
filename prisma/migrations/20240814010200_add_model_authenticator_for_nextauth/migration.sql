BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[Authenticator] (
    [credentialId] NVARCHAR(255) NOT NULL,
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [providerAccountId] NVARCHAR(255) NOT NULL,
    [credentialPublicKey] NVARCHAR(max) NOT NULL,
    [counter] INT NOT NULL,
    [credentialDeviceType] NVARCHAR(255) NOT NULL,
    [credentialBackedUp] BIT NOT NULL,
    [transports] NVARCHAR(255),
    CONSTRAINT [Authenticator_pkey] PRIMARY KEY CLUSTERED ([userId],[credentialId]),
    CONSTRAINT [Authenticator_credentialId_key] UNIQUE NONCLUSTERED ([credentialId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Authenticator] ADD CONSTRAINT [Authenticator_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
