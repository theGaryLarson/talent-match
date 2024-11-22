BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[Meeting] (
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [Meeting_id_df] DEFAULT newid(),
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [caseMgmtId] UNIQUEIDENTIFIER NOT NULL,
    [title] VARCHAR(45) NOT NULL,
    [meetingAgenda] NTEXT,
    [meetingDate] DATETIME NOT NULL,
    [duration] TIME NOT NULL,
    CONSTRAINT [meeting_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [fk_meeting_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [fk_meeting_case_mgmt1] FOREIGN KEY ([caseMgmtId]) REFERENCES [dbo].[CaseMgmt]([case_mgmt_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
