/*
  Warnings:

  - You are about to drop the column `training_provider_id` on the `training_programs` table. All the data in the column will be lost.
  - You are about to drop the `training_providers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `edu_provider_id` to the `training_programs` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [fk_training_program_training_provider1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_user1];

-- DropIndex
DROP INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[training_programs];

-- AlterTable
EXEC SP_RENAME N'dbo.edu_institutions_PRIMARY', N'edu_providers_PRIMARY';
ALTER TABLE [dbo].[edu_providers] ADD [edu_providersId] UNIQUEIDENTIFIER;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[training_programs] DROP COLUMN [training_provider_id];
ALTER TABLE [dbo].[training_programs] ADD [edu_provider_id] UNIQUEIDENTIFIER NOT NULL;

-- DropTable
DROP TABLE [dbo].[training_providers];

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[training_programs]([edu_provider_id]);

-- AddForeignKey
ALTER TABLE [dbo].[training_programs] ADD CONSTRAINT [fk_training_program_training_provider1] FOREIGN KEY ([edu_provider_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
