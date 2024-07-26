BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_technology_areas1];

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_technology_areas1];

-- DropIndex
DROP INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings];

-- DropIndex
DROP INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences];

-- AlterTable technology_areas first
ALTER TABLE [dbo].[technology_areas] DROP CONSTRAINT [technology_areas_PRIMARY];
ALTER TABLE [dbo].[technology_areas] DROP COLUMN [technolody_area_id];
ALTER TABLE [dbo].[technology_areas] ADD [technology_area_id] NVARCHAR(36) NOT NULL;
ALTER TABLE [dbo].[technology_areas] ADD CONSTRAINT technology_areas_PRIMARY PRIMARY KEY NONCLUSTERED ([technology_area_id]);

-- AlterTable job_postings
ALTER TABLE [dbo].[job_postings] DROP COLUMN [technolody_area_id];
ALTER TABLE [dbo].[job_postings] ADD [technology_area_id] NVARCHAR(36) NOT NULL;

-- AlterTable work_experiences
ALTER TABLE [dbo].[work_experiences] DROP COLUMN [technolody_area_id];
ALTER TABLE [dbo].[work_experiences] ADD [technology_area_id] NVARCHAR(36) NOT NULL;

-- Recreate Indexes
CREATE NONCLUSTERED INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings]([technology_area_id]);
CREATE NONCLUSTERED INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences]([technology_area_id]);

-- Recreate ForeignKeys
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[technology_areas]([technology_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[technology_areas]([technology_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
ROLLBACK TRAN;
END;
THROW

END CATCH
