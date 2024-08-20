/*
  Warnings:

  - You are about to drop the column `edu_institution_id` on the `educators` table. All the data in the column will be lost.
  - Added the required column `edu_providers_id` to the `educators` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_edu_institution1];

-- DropIndex
DROP INDEX [fk_educators_edu_institution1_idx] ON [dbo].[educators];

-- AlterTable
ALTER TABLE [dbo].[educators] DROP COLUMN [edu_institution_id];
ALTER TABLE [dbo].[educators] ADD [edu_providers_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_educators_edu_institution1_idx] ON [dbo].[educators]([edu_providers_id]);

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_edu_institution1] FOREIGN KEY ([edu_providers_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
