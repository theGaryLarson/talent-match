/*
  Warnings:

  - You are about to drop the `business_streams` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_business_streams1];

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_business_streams1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[business_streams];

-- CreateTable
CREATE TABLE [dbo].[technology_areas] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [title] VARCHAR(255) NOT NULL,
    CONSTRAINT [business_streams_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_business_streams1] FOREIGN KEY ([business_stream_id]) REFERENCES [dbo].[technology_areas]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_business_streams1] FOREIGN KEY ([id]) REFERENCES [dbo].[technology_areas]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
