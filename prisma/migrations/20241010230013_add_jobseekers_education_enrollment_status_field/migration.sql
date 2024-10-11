BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] ADD [enrollment_status] VARCHAR(45) NOT NULL CONSTRAINT [jobseekers_education_enrollment_status_df] DEFAULT 'unknown';

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
