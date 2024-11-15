
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CareerPrepAssessment] ALTER COLUMN [assessmentDate] DATETIME NOT NULL;
ALTER TABLE [dbo].[CareerPrepAssessment] ADD CONSTRAINT [CareerPrepAssessment_assessmentDate_df] DEFAULT CURRENT_TIMESTAMP FOR [assessmentDate];

-- AlterTable
ALTER TABLE [dbo].[CaseMgmt] DROP COLUMN [ratingCareerReadiness],
[ratingSoftSkills],
[ratingTechSkill];
ALTER TABLE [dbo].[CaseMgmt] ADD [createdAt] DATETIME NOT NULL CONSTRAINT [CaseMgmt_createdAt_df] DEFAULT CURRENT_TIMESTAMP;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
