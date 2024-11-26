/*
  Warnings:
  - You are about to drop the `_AppliedJobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookMarkedJobs` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_AppliedJobs] DROP CONSTRAINT [_AppliedJobs_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_AppliedJobs] DROP CONSTRAINT [_AppliedJobs_B_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_BookMarkedJobs] DROP CONSTRAINT [_BookMarkedJobs_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_BookMarkedJobs] DROP CONSTRAINT [_BookMarkedJobs_B_fkey];

-- DropTable
DROP TABLE [dbo].[_AppliedJobs];

-- DropTable
DROP TABLE [dbo].[_BookMarkedJobs];

-- CreateTable
CREATE TABLE [dbo].[JobseekerJobPosting] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [jobseeker_job_posting_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
