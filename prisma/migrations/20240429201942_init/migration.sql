/*
  Warnings:

  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategories` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[skills] DROP CONSTRAINT [FK_subcategory_id];

-- DropTable
DROP TABLE [dbo].[skills];

-- DropTable
DROP TABLE [dbo].[subcategories];

-- CreateTable
CREATE TABLE [dbo].[Subcategories] (
    [id] CHAR(36) NOT NULL,
    [skill_category] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255),
    CONSTRAINT [PK__subcateg__3213E83F064F714D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Skills] (
    [id] CHAR(36) NOT NULL,
    [subcategory_id] CHAR(36) NOT NULL,
    [skill] VARCHAR(255) NOT NULL,
    [info_url] VARCHAR(255),
    CONSTRAINT [PK__skills__3213E83FEC93D05F] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_skill] UNIQUE NONCLUSTERED ([skill])
);

-- AddForeignKey
ALTER TABLE [dbo].[Skills] ADD CONSTRAINT [FK_subcategory_id] FOREIGN KEY ([subcategory_id]) REFERENCES [dbo].[Subcategories]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
