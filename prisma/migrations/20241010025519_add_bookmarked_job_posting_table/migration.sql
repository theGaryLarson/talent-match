BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[bookmarked_job_postings] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [jobseeker_id] UNIQUEIDENTIFIER NOT NULL,
    [job_posting_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [bookmarked_job_postings_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_job_postings] ADD CONSTRAINT [fk_bookmarked_job_postings_jobseekers1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[bookmarked_job_postings] ADD CONSTRAINT [fk_bookmarked_job_postings_job_postings1] FOREIGN KEY ([job_posting_id]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
