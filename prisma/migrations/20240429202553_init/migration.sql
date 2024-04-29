/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Invoice] DROP CONSTRAINT [Invoice_customerId_fkey];

-- DropTable
DROP TABLE [dbo].[Customer];

-- DropTable
DROP TABLE [dbo].[Invoice];

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Invoices] (
    [id] NVARCHAR(1000) NOT NULL,
    [customer_id] NVARCHAR(1000) NOT NULL,
    [amount] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    CONSTRAINT [Invoices_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Customers] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [image_url] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Customers_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Customers_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[Invoices] ADD CONSTRAINT [Invoices_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[Customers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
