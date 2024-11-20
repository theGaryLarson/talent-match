BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[ITCloudRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [techSupport] VARCHAR(20) NOT NULL,
    [activeDirectory] VARCHAR(20) NOT NULL,
    [projectManagement] VARCHAR(20) NOT NULL,
    [helpDeskSupport] VARCHAR(20) NOT NULL,
    [windowsServers] VARCHAR(20) NOT NULL,
    [sqlProgramming] VARCHAR(20) NOT NULL,
    [computerHardware] VARCHAR(20) NOT NULL,
    [operatingSystems] VARCHAR(20) NOT NULL,
    [systemAdmin] VARCHAR(20) NOT NULL,
    [networkAdmin] VARCHAR(20) NOT NULL,
    [virtualization] VARCHAR(20) NOT NULL,
    [coreCloudServices] VARCHAR(20) NOT NULL,
    [apiUsage] VARCHAR(20) NOT NULL,
    [httpResponseCodes] VARCHAR(20) NOT NULL,
    [computationalThinking] VARCHAR(20) NOT NULL,
    CONSTRAINT [it_cloud_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[ITCloudRating] ADD CONSTRAINT [fk_it_cloud_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
