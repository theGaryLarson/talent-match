BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[CybersecurityRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [networking] VARCHAR(20) NOT NULL,
    [projectManagement] VARCHAR(20) NOT NULL,
    [securityTools] VARCHAR(20) NOT NULL,
    [operatingSystems] VARCHAR(20) NOT NULL,
    [programming] VARCHAR(20) NOT NULL,
    [cryptography] VARCHAR(20) NOT NULL,
    [cloudSecurity] VARCHAR(20) NOT NULL,
    [incidentResponse] VARCHAR(20) NOT NULL,
    [dataSecurity] VARCHAR(20) NOT NULL,
    [computationalThinking] VARCHAR(20) NOT NULL,
    [apiUsage] VARCHAR(20) NOT NULL,
    CONSTRAINT [cybersecurity_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[CybersecurityRating] ADD CONSTRAINT [fk_cybersecurity_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
