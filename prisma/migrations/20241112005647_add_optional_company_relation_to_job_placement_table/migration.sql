BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmt] ALTER COLUMN [careerPrepTrack] VARCHAR(15) NULL;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[JobPlacement] ADD [companyId] UNIQUEIDENTIFIER;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[JobPlacement] ADD CONSTRAINT [fk_job_placement_companies1] FOREIGN KEY ([companyId]) REFERENCES [dbo].[companies]([company_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
