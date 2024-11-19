
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[provider_programs] DROP CONSTRAINT [fk_training_program_Pathways1];

-- AlterTable
ALTER TABLE [dbo].[provider_programs] ADD [hoursPerWeek] VARCHAR(45),
[months] VARCHAR(45),
[pathways] TEXT,
[programDescription] TEXT,
[serviceArea] TEXT,
[targetPopulation] TEXT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
