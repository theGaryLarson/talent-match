/*
  Warnings:

  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Revenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subcategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Invoices] DROP CONSTRAINT [Invoices_customer_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Skills] DROP CONSTRAINT [FK_subcategory_id];

-- DropTable
DROP TABLE [dbo].[Customers];

-- DropTable
DROP TABLE [dbo].[Invoices];

-- DropTable
DROP TABLE [dbo].[Revenue];

-- DropTable
DROP TABLE [dbo].[Skills];

-- DropTable
DROP TABLE [dbo].[Subcategories];

-- DropTable
DROP TABLE [dbo].[Users];

-- CreateTable
CREATE TABLE [dbo].[Subcategory] (
    [id] CHAR(36) NOT NULL,
    [skill_category] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255),
    CONSTRAINT [PK__subcateg__3213E83F064F714D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Skill] (
    [id] CHAR(36) NOT NULL,
    [subcategory_id] CHAR(36) NOT NULL,
    [skill] VARCHAR(255) NOT NULL,
    [info_url] VARCHAR(255),
    CONSTRAINT [PK__skills__3213E83FEC93D05F] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_skill] UNIQUE NONCLUSTERED ([skill])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [image] NVARCHAR(1000),
    [password] NVARCHAR(1000),
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'JOBSEEKER',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refresh_token] NVARCHAR(1000),
    [access_token] NVARCHAR(1000),
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] NVARCHAR(1000),
    [session_state] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Account_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([provider],[providerAccountId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Skill] ADD CONSTRAINT [FK_subcategory_id] FOREIGN KEY ([subcategory_id]) REFERENCES [dbo].[Subcategory]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
