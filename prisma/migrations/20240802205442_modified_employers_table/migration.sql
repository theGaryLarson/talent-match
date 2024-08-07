/*
  Warnings:

  - You are about to drop the column `employer_url` on the `employers` table. All the data in the column will be lost.
  - You are about to drop the column `home_office_location` on the `employers` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `employers` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employers_company1];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[employers] ALTER COLUMN [company_id] NVARCHAR(36) NULL;
ALTER TABLE [dbo].[employers] DROP COLUMN [employer_url],
[home_office_location],
[logo_url];
ALTER TABLE [dbo].[employers] ADD [is_verified_employee] BIT NOT NULL CONSTRAINT [DF__employers__is_verified] DEFAULT 0,
[linkedin_url] VARCHAR(255),
[work_location] VARCHAR(255);

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df];
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id];

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employers_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
