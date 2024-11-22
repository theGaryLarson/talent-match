BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[SoftwareDevRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [softwareEngineering] VARCHAR(20) NOT NULL,
    [softwareDevelopmentLifecycle] VARCHAR(20) NOT NULL,
    [programmingLanguages] VARCHAR(20) NOT NULL,
    [dataStructuresAndAlgorithms] VARCHAR(20) NOT NULL,
    [softwareArchitecture] VARCHAR(20) NOT NULL,
    [versionControl] VARCHAR(20) NOT NULL,
    [databaseManagement] VARCHAR(20) NOT NULL,
    [devOps] VARCHAR(20) NOT NULL,
    [cloudComputing] VARCHAR(20) NOT NULL,
    [conceptualSystemsThinking] VARCHAR(20) NOT NULL,
    [problemSolving] VARCHAR(20) NOT NULL,
    [fundamentalCodingConcepts] VARCHAR(20) NOT NULL,
    [debugging] VARCHAR(20) NOT NULL,
    [computationalThinking] VARCHAR(20) NOT NULL,
    [softwareOptimization] VARCHAR(20) NOT NULL,
    CONSTRAINT [software_dev_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[SoftwareDevRating] ADD CONSTRAINT [fk_software_dev_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
