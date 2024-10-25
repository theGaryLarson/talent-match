/*
  Warnings:

  - You are about to drop the `jobseekers_skill_gap_data` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[certificates] DROP CONSTRAINT [fk_certificates_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] DROP CONSTRAINT [fk_jobseeker_has_skill_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [fk_user_learner_private_data_user1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_skill_gap_data] DROP CONSTRAINT [fk_learner_skill_gap_data_learner1];

-- DropForeignKey
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [fk_project_experience_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[project_has_skills] DROP CONSTRAINT [fk_project_experience_has_skill_project_experience1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[jobseekers_skill_gap_data];

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[certificates] ADD CONSTRAINT [fk_certificates_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT [fk_jobseeker_has_skill_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [fk_user_learner_private_data_user1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([edu_provider_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [fk_project_experience_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT [fk_project_experience_has_skill_project_experience1] FOREIGN KEY ([proj_exp_id]) REFERENCES [dbo].[project_experiences]([proj_exp_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
