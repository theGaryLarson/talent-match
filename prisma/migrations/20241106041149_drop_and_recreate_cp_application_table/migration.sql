/*
  Warnings:

  - You are about to drop the `CareerPrepApplication` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CareerPrepApplication] DROP CONSTRAINT [fk_career_prep_app_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [fk_case_mgmt_jobseeker1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[CareerPrepApplication];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
