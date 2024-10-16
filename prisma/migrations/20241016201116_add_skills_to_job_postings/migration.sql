/*
  Warnings:

  - You are about to drop the `job_listing_has_skills` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [fk_job_listing_has_skill_category_job_listing1];

-- DropForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [fk_job_listing_has_skill_category_skill1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[job_listing_has_skills];

-- CreateTable
CREATE TABLE [dbo].[_JobPostingSkills] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_JobPostingSkills_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_JobPostingSkills_B_index] ON [dbo].[_JobPostingSkills]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_JobPostingSkills] ADD CONSTRAINT [_JobPostingSkills_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_JobPostingSkills] ADD CONSTRAINT [_JobPostingSkills_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
