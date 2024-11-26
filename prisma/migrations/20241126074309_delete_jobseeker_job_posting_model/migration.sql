/*
  Warnings:
  - You are about to drop the `JobseekerJobPosting` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[JobseekerJobPosting] DROP CONSTRAINT [JobseekerJobPosting_jobPostId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[JobseekerJobPosting] DROP CONSTRAINT [JobseekerJobPosting_jobseekerId_fkey];

-- DropTable
DROP TABLE [dbo].[JobseekerJobPosting];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
