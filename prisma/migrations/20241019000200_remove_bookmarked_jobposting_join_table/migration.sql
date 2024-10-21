/*
  Warnings:

  - You are about to drop the `bookmarked_job_postings` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[bookmarked_job_postings] DROP CONSTRAINT [fk_bookmarked_job_postings_job_postings1];

-- DropForeignKey
ALTER TABLE [dbo].[bookmarked_job_postings] DROP CONSTRAINT [fk_bookmarked_job_postings_jobseekers1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[bookmarked_job_postings];

-- CreateTable
CREATE TABLE [dbo].[_BookMarkedJobs] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_BookMarkedJobs_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_BookMarkedJobs_B_index] ON [dbo].[_BookMarkedJobs]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_BookMarkedJobs] ADD CONSTRAINT [_BookMarkedJobs_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_BookMarkedJobs] ADD CONSTRAINT [_BookMarkedJobs_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
