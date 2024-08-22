/*
  Warnings:

  - You are about to drop the column `id` on the `jobseekers_education` table. All the data in the column will be lost.
  - Added the required column `edu_provider_id` to the `jobseekers_education` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_edu_institution1];

-- DropIndex
DROP INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education];

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP COLUMN [id];
ALTER TABLE [dbo].[jobseekers_education] ADD [edu_provider_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education]([edu_provider_id]);

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([edu_provider_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
