BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] ADD [gpa] NVARCHAR(45),
[program_id] UNIQUEIDENTIFIER;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_programs1] FOREIGN KEY ([program_id]) REFERENCES [dbo].[programs]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
