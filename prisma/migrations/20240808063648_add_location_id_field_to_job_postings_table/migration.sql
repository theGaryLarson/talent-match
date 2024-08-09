/*
  Warnings:

  - Added the required column `location_id` to the `job_postings` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[job_postings] ADD [location_id] VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df];
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id];

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_company_addresses1_idx] ON [dbo].[job_postings]([location_id]);

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_company_addresses1] FOREIGN KEY ([location_id]) REFERENCES [dbo].[company_addresses]([company_address_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
