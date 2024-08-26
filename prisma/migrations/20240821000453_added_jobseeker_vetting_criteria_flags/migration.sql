BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers] ADD [pool1] BIT NOT NULL CONSTRAINT [jobseekers_pool1_df] DEFAULT 0,
[pool2] BIT NOT NULL CONSTRAINT [jobseekers_pool2_df] DEFAULT 0,
[pool3] BIT NOT NULL CONSTRAINT [jobseekers_pool3_df] DEFAULT 0;

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
