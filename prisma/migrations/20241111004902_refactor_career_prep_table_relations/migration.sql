BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[CareerPrepAssessment] (
    [career_prep_app_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CareerPrepAssessment_career_prep_app_id_df] DEFAULT newid(),
    [assessmentDate] DATETIME2 NOT NULL,
    [pronouns] VARCHAR(15) NOT NULL,
    [expectedEduCompletion] VARCHAR(45),
    [experienceWithApplying] BIT NOT NULL,
    [experienceWithInterview] BIT NOT NULL,
    [experienceInIT] BIT NOT NULL,
    CONSTRAINT [career_prep_app_PRIMARY] PRIMARY KEY NONCLUSTERED ([career_prep_app_id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseMgmt] (
    [jobseeker_id] UNIQUEIDENTIFIER NOT NULL,
    [cfa_admin_id] UNIQUEIDENTIFIER NOT NULL,
    [prepEnrollmentStatus] VARCHAR(30) NOT NULL,
    [ratingTechSkill] TINYINT,
    [ratingCareerReadiness] TINYINT,
    [ratingSoftSkills] TINYINT,
    [careerPrepTrack] VARCHAR(15) NOT NULL,
    [prepStartDate] DATETIME,
    [prepExpectedEndDate] DATETIME,
    CONSTRAINT [case_mgmt_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseeker_id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseMgmtNotes] (
    [case_mgmt_notes_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CaseMgmtNotes_case_mgmt_notes_id_df] DEFAULT newid(),
    [caseMgmtId] UNIQUEIDENTIFIER NOT NULL,
    [meetingId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER NOT NULL,
    [noteType] VARCHAR(15) NOT NULL,
    [noteContent] NTEXT NOT NULL,
    [meetingDate] DATETIME,
    [createdAt] DATETIME NOT NULL CONSTRAINT [CaseMgmtNotes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    CONSTRAINT [case_mgmt_notes_PRIMARY] PRIMARY KEY NONCLUSTERED ([case_mgmt_notes_id])
);

-- CreateTable
CREATE TABLE [dbo].[Meeting] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Meeting_id_df] DEFAULT newid(),
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [title] VARCHAR(45) NOT NULL,
    [meetingAgenda] NTEXT,
    [meetingDate] DATETIME NOT NULL,
    [duration] TIME NOT NULL,
    CONSTRAINT [meeting_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[CaseMgmt]([cfa_admin_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[CaseMgmt]([jobseeker_id]);

-- AddForeignKey
ALTER TABLE [dbo].[CareerPrepAssessment] ADD CONSTRAINT [fk_career_prep_app_jobseeker1] FOREIGN KEY ([career_prep_app_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_jobseeker_id_fkey] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_case_mgmt1] FOREIGN KEY ([case_mgmt_notes_id]) REFERENCES [dbo].[CaseMgmt]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_user1] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_meeting1] FOREIGN KEY ([meetingId]) REFERENCES [dbo].[Meeting]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [fk_meeting_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [fk_meeting_case_mgmt1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CaseMgmt]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
