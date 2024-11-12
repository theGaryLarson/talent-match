BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[BrandingRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [personalBrand] VARCHAR(20) NOT NULL,
    [onlinePresence] VARCHAR(20) NOT NULL,
    [elevatorPitch] VARCHAR(20) NOT NULL,
    [resumeEffectiveness] VARCHAR(20) NOT NULL,
    [coverLetterEffectiveness] VARCHAR(20) NOT NULL,
    [interviewExperience] VARCHAR(20) NOT NULL,
    [responseTechnique] VARCHAR(20) NOT NULL,
    [followUpImportance] VARCHAR(20) NOT NULL,
    [onlineNetworking] VARCHAR(20) NOT NULL,
    [eventNetworking] VARCHAR(20) NOT NULL,
    [relationshipManagement] VARCHAR(20) NOT NULL,
    [jobSearchStrategy] VARCHAR(20) NOT NULL,
    [materialDistribution] VARCHAR(20) NOT NULL,
    [networkingTechniques] VARCHAR(20) NOT NULL,
    [onboardingBestPractices] VARCHAR(20) NOT NULL,
    [developmentPlan] VARCHAR(20) NOT NULL,
    [mentorship] VARCHAR(20) NOT NULL,
    CONSTRAINT [branding_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[BrandingRating] ADD CONSTRAINT [fk_branding_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
