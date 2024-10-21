BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[_AppliedJobs] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_AppliedJobs_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_AppliedJobs_B_index] ON [dbo].[_AppliedJobs]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_AppliedJobs] ADD CONSTRAINT [_AppliedJobs_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_AppliedJobs] ADD CONSTRAINT [_AppliedJobs_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
