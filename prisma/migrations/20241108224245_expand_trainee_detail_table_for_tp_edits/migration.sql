/*
  Warnings:

  - Added the required column `enrollmentStatus` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitDate` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programTitle` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `TraineeDetail` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[TraineeDetail] ADD [enrollmentStatus] VARCHAR(45) NOT NULL,
[exitDate] DATE NOT NULL,
[firstName] VARCHAR(45) NOT NULL,
[lastName] VARCHAR(45) NOT NULL,
[programTitle] VARCHAR(45) NOT NULL,
[startDate] DATE NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
