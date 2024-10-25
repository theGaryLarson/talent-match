BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[bookmarked_jobseekers] DROP CONSTRAINT [fk_employers1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_employers1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_industry_sectors1];

-- AlterTable
ALTER TABLE [dbo].[bookmarked_jobseekers] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NULL;

-- AlterTable
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_jobseekers] ADD CONSTRAINT [fk_employers1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_employers1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_industry_sectors1] FOREIGN KEY ([sector_id]) REFERENCES [dbo].[industry_sectors]([industry_sector_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
