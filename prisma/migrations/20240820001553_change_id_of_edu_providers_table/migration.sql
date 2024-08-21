/*
  Warnings:

  - The primary key for the `edu_providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `edu_institution_id` on the `edu_providers` table. All the data in the column will be lost.
  - You are about to drop the column `edu_institution_id` on the `jobseekers_education` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `edu_providers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `jobseekers_education` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[edu_addresses] DROP CONSTRAINT [fk_edu_address_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_edu_institution1];

-- DropIndex
ALTER TABLE [dbo].[edu_providers] DROP CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education];

-- AlterTable
ALTER TABLE [dbo].[edu_providers] DROP CONSTRAINT [edu_institutions_PRIMARY];
ALTER TABLE [dbo].[edu_providers] DROP COLUMN [edu_institution_id];
ALTER TABLE [dbo].[edu_providers] ADD CONSTRAINT edu_institutions_PRIMARY PRIMARY KEY NONCLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP COLUMN [edu_institution_id];
ALTER TABLE [dbo].[jobseekers_education] ADD [id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
ALTER TABLE [dbo].[edu_providers] ADD CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE] UNIQUE NONCLUSTERED ([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education]([id]);

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
