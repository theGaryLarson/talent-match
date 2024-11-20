BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [DF__jobseeker__has_d__3F115E1A],
[DF__jobseeker__is_au__3C34F16F],
[DF__jobseeker__is_ve__3E1D39E1],
[DF__jobseeker__job_s__3D2915A8],
[jobseekers_private_data_ethnicity_df],
[jobseekers_private_data_gender_df],
[jobseekers_private_data_race_df];
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [is_authorized_to_work_in_usa] BIT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [job_sponsorship_required] BIT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [DF__jobseeker__is_ve__3E1D39E1] DEFAULT '' FOR [is_veteran], CONSTRAINT [jobseekers_private_data_ethnicity_df] DEFAULT '' FOR [ethnicity], CONSTRAINT [jobseekers_private_data_gender_df] DEFAULT '' FOR [gender], CONSTRAINT [jobseekers_private_data_race_df] DEFAULT '' FOR [race];
ALTER TABLE [dbo].[jobseekers_private_data] ADD [disability_status] VARCHAR(45) NOT NULL CONSTRAINT [jobseekers_private_data_disability_status_df] DEFAULT '';

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
