/*
  Warnings:

  - You are about to drop the column `jobseeker_learner_id` on the `case_mgmt` table. All the data in the column will be lost.
  - Added the required column `jobseeker_id` to the `case_mgmt` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_jobseeker1];

-- DropIndex
DROP INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[case_mgmt];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP COLUMN [jobseeker_learner_id];
ALTER TABLE [dbo].[case_mgmt] ADD [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[case_mgmt]([jobseeker_id]);

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
