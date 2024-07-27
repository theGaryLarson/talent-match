/*
  Warnings:

  - You are about to alter the column `is_internship` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `is_paid` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `has_passed` on the `learner_proj_based_tech_assessment` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `is_correct` on the `sa_possible_answers` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `is_internship` on the `work_experiences` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `is_current_job` on the `work_experiences` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [DF__job_posti__is_in__571DF1D5],
[DF__job_posti__is_pa__5812160E];
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [is_internship] BIT NOT NULL;
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [is_paid] BIT NOT NULL;
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [DF__job_posti__is_in__571DF1D5] DEFAULT 0 FOR [is_internship], CONSTRAINT [DF__job_posti__is_pa__5812160E] DEFAULT 1 FOR [is_paid];

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [DF__jobseeker__is_ve__3E1D39E1];
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [is_veteran] VARCHAR(45) NOT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [DF__jobseeker__is_ve__3E1D39E1] DEFAULT 'prefer not to say' FOR [is_veteran];

-- AlterTable
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ALTER COLUMN [has_passed] BIT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[sa_possible_answers] DROP CONSTRAINT [DF__sa_possib__is_co__1332DBDC];
ALTER TABLE [dbo].[sa_possible_answers] ALTER COLUMN [is_correct] BIT NOT NULL;
ALTER TABLE [dbo].[sa_possible_answers] ADD CONSTRAINT [DF__sa_possib__is_co__1332DBDC] DEFAULT 1 FOR [is_correct];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [DF__work_expe__is_cu__76969D2E],
[DF__work_expe__is_in__75A278F5];
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [is_internship] BIT NOT NULL;
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [is_current_job] BIT NOT NULL;
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [DF__work_expe__is_cu__76969D2E] DEFAULT 0 FOR [is_current_job], CONSTRAINT [DF__work_expe__is_in__75A278F5] DEFAULT 0 FOR [is_internship];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
