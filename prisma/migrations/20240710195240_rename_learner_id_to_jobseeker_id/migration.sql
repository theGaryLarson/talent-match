/*
  Warnings:

  - You are about to drop the column `learner_id` on the `jobseekers_private_data` table. All the data in the column will be lost.
  - You are about to drop the column `learner_id` on the `learner_proj_based_tech_assessment` table. All the data in the column will be lost.
  - Made the column `zip_region` on table `company_addresses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `jobseeker_id` to the `jobseekers_private_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobseeker_id` to the `learner_proj_based_tech_assessment` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [fk_user_learner_private_data_user1];

-- DropForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1];

-- DropIndex
DROP INDEX [jobseekers_private_data_fk_user_learner_private_data_user1] ON [dbo].[jobseekers_private_data];

-- DropIndex
DROP INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_user1_idx] ON [dbo].[learner_proj_based_tech_assessment];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[company_addresses] ALTER COLUMN [zip_region] VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP COLUMN [learner_id];
ALTER TABLE [dbo].[jobseekers_private_data] ADD [jobseeker_id] NVARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP COLUMN [learner_id];
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD [jobseeker_id] NVARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_private_data_fk_user_learner_private_data_user1] ON [dbo].[jobseekers_private_data]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_user1_idx] ON [dbo].[learner_proj_based_tech_assessment]([jobseeker_id]);

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [fk_user_learner_private_data_user1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
