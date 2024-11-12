/*
  Warnings:

  - You are about to drop the column `experienceInIT` on the `CareerPrepAssessment` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] DROP COLUMN [experienceInIT];
ALTER TABLE [dbo].[CareerPrepAssessment] ADD [prevWorkExperience] BIT NOT NULL CONSTRAINT [CareerPrepAssessment_prevWorkExperience_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
