/*
  Warnings:

  - You are about to drop the column `technology_area_id` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the `technology_areas` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_technology_areas1];

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_technology_areas1];

-- DropIndex
DROP INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[work_experiences] DROP COLUMN [technology_area_id];
ALTER TABLE [dbo].[work_experiences] ADD [id] UNIQUEIDENTIFIER;

-- DropTable
DROP TABLE [dbo].[technology_areas];

-- CreateTable
CREATE TABLE [dbo].[business_streams] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [title] VARCHAR(255) NOT NULL,
    CONSTRAINT [business_streams_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences]([id]);

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[business_streams]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_technology_areas1] FOREIGN KEY ([id]) REFERENCES [dbo].[business_streams]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
