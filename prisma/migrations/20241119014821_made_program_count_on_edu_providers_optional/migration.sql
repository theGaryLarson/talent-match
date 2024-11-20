/*
  Warnings:

  - You are about to alter the column `overallAverage` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[edu_providers] ALTER COLUMN [programCount] TINYINT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
