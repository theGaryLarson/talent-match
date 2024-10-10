BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[bookmarked_jobseekers] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [jobseeker_id] UNIQUEIDENTIFIER NOT NULL,
    [company_id] UNIQUEIDENTIFIER NOT NULL,
    [employer_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [bookmarked_jobseekers_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_jobseekers] ADD CONSTRAINT [fk_jobseekers1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_jobseekers] ADD CONSTRAINT [fk_companies1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_jobseekers] ADD CONSTRAINT [fk_employers1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
