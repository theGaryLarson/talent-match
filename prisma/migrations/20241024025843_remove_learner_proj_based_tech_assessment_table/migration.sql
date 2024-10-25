/*
  Warnings:

  - You are about to drop the `learner_proj_based_tech_assessment` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [fk_user_has_proj_based_tech_assessment_proj_based_tech_asse1];

-- DropForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[learner_proj_based_tech_assessment];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
