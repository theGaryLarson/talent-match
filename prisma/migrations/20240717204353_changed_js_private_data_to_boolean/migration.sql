/*
  Warnings:

  - You are about to alter the column `is_authorized_to_work_in_usa` on the `jobseekers_private_data` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.
  - You are about to alter the column `job_sponsorship_required` on the `jobseekers_private_data` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `Bit`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [DF__jobseeker__is_au__3C34F16F],
[DF__jobseeker__job_s__3D2915A8];
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [is_authorized_to_work_in_usa] BIT NOT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [job_sponsorship_required] BIT NOT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [DF__jobseeker__is_au__3C34F16F] DEFAULT 0 FOR [is_authorized_to_work_in_usa], CONSTRAINT [DF__jobseeker__job_s__3D2915A8] DEFAULT 0 FOR [job_sponsorship_required];

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
