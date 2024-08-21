/*
  Warnings:

  - You are about to drop the column `business_stream_id` on the `job_postings` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_business_streams1];

-- DropIndex
DROP INDEX [fk_job_postings_business_streams1_idx] ON [dbo].[job_postings];

-- AlterTable
ALTER TABLE [dbo].[job_postings] DROP COLUMN [business_stream_id];
ALTER TABLE [dbo].[job_postings] ADD [tech_area_id] UNIQUEIDENTIFIER;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
EXEC SP_RENAME N'dbo.business_streams_PRIMARY', N'technology_areas_PRIMARY';

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings]([tech_area_id]);

-- RenameForeignKey
EXEC sp_rename 'dbo.fk_work_experiences_business_streams1', 'fk_work_experiences_technology_areas1', 'OBJECT';

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_technology_areas1] FOREIGN KEY ([tech_area_id]) REFERENCES [dbo].[technology_areas]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- RenameIndex
EXEC SP_RENAME N'dbo.work_experiences.fk_work_experiences_business_streams1_idx', N'fk_work_experiences_technology_areas1_idx', N'INDEX';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
