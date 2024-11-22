BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[provider_programs] ADD [description] TEXT,
[target_job_roles] TEXT,
[target_population] TEXT,
[url] VARCHAR(255);

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
