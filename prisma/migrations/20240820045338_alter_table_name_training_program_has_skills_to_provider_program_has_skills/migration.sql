/*
  Warnings:

  - You are about to drop the `training_program_has_skills` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [fk_training_program_has_skills_skills1];

-- DropForeignKey
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [fk_training_program_has_skills_training_program1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[training_program_has_skills];

-- CreateTable
CREATE TABLE [dbo].[provider_program_has_skills] (
    [training_program_id] UNIQUEIDENTIFIER NOT NULL,
    [skill_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [training_program_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([training_program_id],[skill_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_skills1_idx] ON [dbo].[provider_program_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_training_program1_idx] ON [dbo].[provider_program_has_skills]([training_program_id]);

-- AddForeignKey
ALTER TABLE [dbo].[provider_program_has_skills] ADD CONSTRAINT [fk_training_program_has_skills_skills1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[provider_program_has_skills] ADD CONSTRAINT [fk_training_program_has_skills_training_program1] FOREIGN KEY ([training_program_id]) REFERENCES [dbo].[provider_programs]([training_program_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
