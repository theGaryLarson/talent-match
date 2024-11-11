/*
  Warnings:

  - You are about to drop the `CareerPrepAssessment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaseMgmt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CaseMgmtNotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CareerPrepAssessment] DROP CONSTRAINT [fk_career_prep_app_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [CaseMgmt_jobseeker_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [fk_case_mgmt_user1];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [fk_case_mgmt_notes_case_mgmt1];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [fk_case_mgmt_notes_user1];

-- DropForeignKey
ALTER TABLE [dbo].[Meeting] DROP CONSTRAINT [fk_meeting_career_prep_assessment1];

-- DropForeignKey
ALTER TABLE [dbo].[Meeting] DROP CONSTRAINT [fk_meeting_case_mgmt1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[CareerPrepAssessment];

-- DropTable
DROP TABLE [dbo].[CaseMgmt];

-- DropTable
DROP TABLE [dbo].[CaseMgmtNotes];

-- DropTable
DROP TABLE [dbo].[Meeting];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
