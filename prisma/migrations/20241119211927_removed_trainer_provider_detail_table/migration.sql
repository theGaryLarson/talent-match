/*
  Warnings:

  - You are about to alter the column `overallAverage` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to alter the column `overallAverage` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Float`.
  - You are about to drop the `TrainingPartnerDetail` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[TrainingPartnerDetail] DROP CONSTRAINT [fk_partnerDetail_providers1];

-- DropTable
DROP TABLE [dbo].[TrainingPartnerDetail];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
