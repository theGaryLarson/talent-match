BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [fk_jobseeker_Pathways1];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [targeted_pathway] NVARCHAR(36) NULL;

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
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_jobseeker_Pathways1] FOREIGN KEY ([targeted_pathway]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
