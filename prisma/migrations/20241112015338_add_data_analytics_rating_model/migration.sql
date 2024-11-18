BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[DataAnalyticsRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [dataAnalysis] VARCHAR(20) NOT NULL,
    [sqlProgramming] VARCHAR(20) NOT NULL,
    [pythonPackages] VARCHAR(20) NOT NULL,
    [dataScience] VARCHAR(20) NOT NULL,
    [dataEngineering] VARCHAR(20) NOT NULL,
    [tableau] VARCHAR(20) NOT NULL,
    [machineLearning] VARCHAR(20) NOT NULL,
    [rProgramming] VARCHAR(20) NOT NULL,
    [projectManagement] VARCHAR(20) NOT NULL,
    [dataVisualization] VARCHAR(20) NOT NULL,
    [dataStructures] VARCHAR(20) NOT NULL,
    [bigOComplexity] VARCHAR(20) NOT NULL,
    [sortingAlgorithms] VARCHAR(20) NOT NULL,
    [databases] VARCHAR(20) NOT NULL,
    [computationalThinking] VARCHAR(20) NOT NULL,
    CONSTRAINT [data_analytics_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[DataAnalyticsRating] ADD CONSTRAINT [fk_data_analytics_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
