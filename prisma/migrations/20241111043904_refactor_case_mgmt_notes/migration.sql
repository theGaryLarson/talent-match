BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[CaseMgmtNotes] (
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid(),
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [caseMgmtId] UNIQUEIDENTIFIER NOT NULL,
    [meetingId] UNIQUEIDENTIFIER,
    [createdBy] UNIQUEIDENTIFIER NOT NULL,
    [noteType] VARCHAR(15) NOT NULL,
    [noteContent] NTEXT NOT NULL,
    [meetingDate] DATETIME,
    [createdAt] DATETIME NOT NULL CONSTRAINT [CaseMgmtNotes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    CONSTRAINT [case_mgmt_notes_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_case_mgmt1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_user1] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_meeting1] FOREIGN KEY ([meetingId]) REFERENCES [dbo].[Meeting]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
