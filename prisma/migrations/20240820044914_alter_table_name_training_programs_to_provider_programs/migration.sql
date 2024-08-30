/*
  Warnings:

  - You are about to drop the `training_programs` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [fk_training_program_has_skills_training_program1];

-- DropForeignKey
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [fk_training_program_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [fk_training_program_training_provider1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[training_programs];

-- CreateTable
CREATE TABLE [dbo].[provider_programs] (
    [training_program_id] UNIQUEIDENTIFIER NOT NULL,
    [edu_provider_id] UNIQUEIDENTIFIER NOT NULL,
    [pathway_id] UNIQUEIDENTIFIER,
    CONSTRAINT [training_programs_PRIMARY] PRIMARY KEY NONCLUSTERED ([training_program_id]),
    CONSTRAINT [training_programs_training_program_id_UNIQUE] UNIQUE NONCLUSTERED ([training_program_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_Pathways1_idx] ON [dbo].[provider_programs]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[provider_programs]([edu_provider_id]);

-- AddForeignKey
ALTER TABLE [dbo].[training_program_has_skills] ADD CONSTRAINT [fk_training_program_has_skills_training_program1] FOREIGN KEY ([training_program_id]) REFERENCES [dbo].[provider_programs]([training_program_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[provider_programs] ADD CONSTRAINT [fk_training_program_Pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
