/*
  Warnings:

  - You are about to drop the column `applicationDate` on the `CareerPrepAssessment` table. All the data in the column will be lost.
  - Added the required column `assessmentDate` to the `CareerPrepAssessment` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] DROP COLUMN [applicationDate];
ALTER TABLE [dbo].[CareerPrepAssessment] ADD [assessmentDate] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Meeting] DROP CONSTRAINT [Meeting_id_df];
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [Meeting_id_df] DEFAULT newid() FOR [id];

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
