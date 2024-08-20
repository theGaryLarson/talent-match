/*
  Warnings:

  - You are about to drop the column `technology_area_id` on the `job_postings` table. All the data in the column will be lost.
  - Added the required column `business_stream_id` to the `job_postings` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_technology_areas1];

-- DropIndex
DROP INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings];

-- AlterTable
ALTER TABLE [dbo].[job_postings] DROP COLUMN [technology_area_id];
ALTER TABLE [dbo].[job_postings] ADD [business_stream_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_business_streams1_idx] ON [dbo].[job_postings]([business_stream_id]);

-- RenameForeignKey
EXEC sp_rename 'dbo.fk_work_experiences_technology_areas1', 'fk_work_experiences_business_streams1', 'OBJECT';

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_business_streams1] FOREIGN KEY ([business_stream_id]) REFERENCES [dbo].[business_streams]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
EXEC SP_RENAME N'dbo.work_experiences.fk_work_experiences_technology_areas1_idx', N'fk_work_experiences_business_streams1_idx', N'INDEX';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
