BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers] ADD [careerPrepComplete] BIT NOT NULL CONSTRAINT [jobseekers_careerPrepComplete_df] DEFAULT 0,
[careerPrepTrackRecommendation] VARCHAR(25);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
