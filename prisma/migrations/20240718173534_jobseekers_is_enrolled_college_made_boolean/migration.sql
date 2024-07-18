/*
  Warnings:

  - Made the column `is_enrolled_college` on table `jobseekers` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [is_enrolled_college] BIT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

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
