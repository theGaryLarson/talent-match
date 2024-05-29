/*
  Warnings:

  - You are about to drop the column `subcategory_id` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `subcategoryId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Skill] DROP CONSTRAINT [FK_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[Skill] DROP COLUMN [subcategory_id];
ALTER TABLE [dbo].[Skill] ADD [subcategoryId] CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Skill] ADD CONSTRAINT [FK_subcategory_id] FOREIGN KEY ([subcategoryId]) REFERENCES [dbo].[Subcategory]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
