/*
  Warnings:
  - Added the required column `jobPostId` to the `JobseekerJobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobseekerId` to the `JobseekerJobPosting` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[JobseekerJobPosting] ADD [appliedDate] DATETIME2,
[followUpDate] DATETIME2,
[jobPostId] UNIQUEIDENTIFIER NOT NULL,
[jobStatus] VARCHAR(45) NOT NULL CONSTRAINT [JobseekerJobPosting_jobStatus_df] DEFAULT 'Bookmarked',
[jobseekerId] UNIQUEIDENTIFIER NOT NULL,
[savedAt] DATETIME2 NOT NULL CONSTRAINT [JobseekerJobPosting_savedAt_df] DEFAULT CURRENT_TIMESTAMP;

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
