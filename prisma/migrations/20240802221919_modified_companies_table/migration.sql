/*
  Warnings:

  - You are about to drop the column `description` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `predicted_annual_hires` on the `companies` table. All the data in the column will be lost.
  - Added the required column `about_us` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[companies] DROP CONSTRAINT [DF__companies__size__3F466844];
ALTER TABLE [dbo].[companies] ALTER COLUMN [company_logo_url] VARCHAR(255) NULL;
ALTER TABLE [dbo].[companies] ALTER COLUMN [company_website_url] VARCHAR(255) NULL;
ALTER TABLE [dbo].[companies] DROP COLUMN [description],
[predicted_annual_hires];
ALTER TABLE [dbo].[companies] ADD CONSTRAINT [DF__companies__size__3F466844] DEFAULT 'less than 10' FOR [size];
ALTER TABLE [dbo].[companies] ADD [about_us] VARCHAR(255) NOT NULL,
[estimated_annual_hires] INT,
[is_approved] BIT NOT NULL CONSTRAINT [DF_companies__is_approved] DEFAULT 0;

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
