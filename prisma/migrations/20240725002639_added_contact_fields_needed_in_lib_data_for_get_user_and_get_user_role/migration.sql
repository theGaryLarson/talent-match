/*
  Warnings:

  - Added the required column `created_at` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_verified` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[contacts] ADD [created_at] DATETIME NOT NULL,
[email_verified] BIT NOT NULL,
[updated_at] DATETIME;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df];
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id];

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
