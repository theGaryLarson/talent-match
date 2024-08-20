/*
  Warnings:

  - You are about to drop the column `id` on the `work_experiences` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_business_streams1];

-- DropIndex
DROP INDEX [fk_work_experiences_business_streams1_idx] ON [dbo].[work_experiences];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[work_experiences] DROP COLUMN [id];
ALTER TABLE [dbo].[work_experiences] ADD [tech_area_id] UNIQUEIDENTIFIER;

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_work_experiences_business_streams1_idx] ON [dbo].[work_experiences]([tech_area_id]);

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_business_streams1] FOREIGN KEY ([tech_area_id]) REFERENCES [dbo].[technology_areas]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
