/*
  Warnings:
  - You are about to drop the column `url` on the `provider_programs` table. All the data in the column will be lost.
*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] ADD [interestPathway] VARCHAR(45);

-- AlterTable
ALTER TABLE [dbo].[provider_programs] DROP COLUMN [url];


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
