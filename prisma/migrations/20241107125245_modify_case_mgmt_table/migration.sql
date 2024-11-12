/*
  Warnings:

  - You are about to drop the column `careerPrepApplicationJobseekerId` on the `CaseMgmt` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [CaseMgmt_careerPrepApplicationJobseekerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[CaseMgmt] DROP COLUMN [careerPrepApplicationJobseekerId];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_jobseeker_id_fkey] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
