/*
  Warnings:

  - Made the column `edu_provider_id` on table `provider_programs` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[provider_programs] DROP CONSTRAINT [fk_training_program_training_provider1];

-- DropIndex
DROP INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[provider_programs];

-- AlterTable
ALTER TABLE [dbo].[provider_programs] ALTER COLUMN [edu_provider_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[provider_programs] ADD CONSTRAINT [fk_training_program_training_provider1] FOREIGN KEY ([edu_provider_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
