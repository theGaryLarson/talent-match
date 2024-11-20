/*
  Warnings:

  - Added the required column `updatedAt` to the `BrandingRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CareerPrepAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CaseMgmt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CybersecurityRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DataAnalyticsRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DurableSkillsRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ITCloudRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SoftwareDevRating` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[BrandingRating] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmt] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[CybersecurityRating] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[DataAnalyticsRating] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[DurableSkillsRating] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ITCloudRating] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Meeting] ADD [updatedAt] DATETIME NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[SoftwareDevRating] ADD [updatedAt] DATETIME NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
