BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[JobseekerJobPosting] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobseekerJobPosting_id_df] DEFAULT newid(),
    [jobPostId] UNIQUEIDENTIFIER NOT NULL,
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [jobStatus] VARCHAR(45) NOT NULL CONSTRAINT [JobseekerJobPosting_jobStatus_df] DEFAULT 'Bookmarked',
    [savedAt] DATETIME2 NOT NULL CONSTRAINT [JobseekerJobPosting_savedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [appliedDate] DATETIME2,
    [followUpDate] DATETIME2,
    CONSTRAINT [jobseeker_job_posting_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[JobseekerJobPosting] ADD CONSTRAINT [JobseekerJobPosting_jobPostId_fkey] FOREIGN KEY ([jobPostId]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobseekerJobPosting] ADD CONSTRAINT [JobseekerJobPosting_jobseekerId_fkey] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
