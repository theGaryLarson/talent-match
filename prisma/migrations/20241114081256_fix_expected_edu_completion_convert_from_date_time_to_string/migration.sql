/*
  Warnings:

  - You are about to alter the column `overallAverage` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - You are about to alter the column `overallAverage` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - You are about to alter the column `overallAverage` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - You are about to alter the column `overallAverage` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Float`.
  - Made the column `expectedEduCompletion` on table `CareerPrepAssessment` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] ALTER COLUMN [expectedEduCompletion] VARCHAR(45) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
