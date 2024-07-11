BEGIN TRY

BEGIN TRAN;

-- AlterTable
-- ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [DF__case_mgmt__case___00DF2177];

-- AlterTable
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [intro_headline] VARCHAR(max) NULL;

-- AlterTable
-- ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [DF__project_e__proj___01D345B0];

-- AlterTable
-- ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
-- ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
-- ALTER TABLE [dbo].[skills] DROP CONSTRAINT [DF__skills__skill_in__0880433F];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
