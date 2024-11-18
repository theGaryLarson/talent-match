BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[DurableSkillsRating] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [emotionManagement] VARCHAR(20) NOT NULL,
    [empathy] VARCHAR(20) NOT NULL,
    [goalSetting] VARCHAR(20) NOT NULL,
    [timeManagement] VARCHAR(20) NOT NULL,
    [adaptability] VARCHAR(20) NOT NULL,
    [criticalThinking] VARCHAR(20) NOT NULL,
    [creativity] VARCHAR(20) NOT NULL,
    [resilience] VARCHAR(20) NOT NULL,
    [communication] VARCHAR(20) NOT NULL,
    [activeListening] VARCHAR(20) NOT NULL,
    [conflictResolution] VARCHAR(20) NOT NULL,
    [nonverbalCommunication] VARCHAR(20) NOT NULL,
    [teamwork] VARCHAR(20) NOT NULL,
    [trustBuilding] VARCHAR(20) NOT NULL,
    [leadership] VARCHAR(20) NOT NULL,
    [perspectiveTaking] VARCHAR(20) NOT NULL,
    [culturalAwareness] VARCHAR(20) NOT NULL,
    [relationshipBuilding] VARCHAR(20) NOT NULL,
    [documentationSkills] VARCHAR(20) NOT NULL,
    CONSTRAINT [durable_skills_rating_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- AddForeignKey
ALTER TABLE [dbo].[DurableSkillsRating] ADD CONSTRAINT [fk_durable_skills_rating_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
