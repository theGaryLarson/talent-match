/*
  Warnings:

  - You are about to drop the `cfa_case_mgmt` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cfa_case_mgmt] DROP CONSTRAINT [fk_admin_contacts1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[cfa_case_mgmt];

-- CreateTable
CREATE TABLE [dbo].[cfa_admin] (
    [admin_id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [cfa_admin_PRIMARY] PRIMARY KEY NONCLUSTERED ([admin_id])
);

-- CreateTable
CREATE TABLE [dbo].[CareerPrepApplication] (
    [career_prep_app_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CareerPrepApplication_career_prep_app_id_df] DEFAULT newid(),
    [applicationDate] DATETIME2 NOT NULL,
    [pronouns] VARCHAR(15) NOT NULL,
    [ExplectedEduCompletion] VARCHAR(45),
    [ExperienceWithApplying] BIT NOT NULL,
    [ExperienceWithInterview] BIT NOT NULL,
    [ExperienceInIT] BIT NOT NULL,
    CONSTRAINT [career_prep_app_PRIMARY] PRIMARY KEY NONCLUSTERED ([career_prep_app_id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseMgmt] (
    [case_mgmt_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CaseMgmt_case_mgmt_id_df] DEFAULT newid(),
    [cfa_admin_id] UNIQUEIDENTIFIER NOT NULL,
    [jobseeker_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [case_mgmt_PRIMARY] PRIMARY KEY NONCLUSTERED ([case_mgmt_id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseMgmtNotes] (
    [case_mgmt_notes_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CaseMgmtNotes_case_mgmt_notes_id_df] DEFAULT newid(),
    [caseMgmtId] UNIQUEIDENTIFIER NOT NULL,
    [createdBy] UNIQUEIDENTIFIER NOT NULL,
    [noteType] VARCHAR(15) NOT NULL,
    [noteContent] NTEXT NOT NULL,
    [meetingDate] DATETIME,
    [createdAt] DATETIME NOT NULL CONSTRAINT [CaseMgmtNotes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    CONSTRAINT [case_mgmt_notes_PRIMARY] PRIMARY KEY NONCLUSTERED ([case_mgmt_notes_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cfa_admin_fk_admin_contacts1_idx] ON [dbo].[cfa_admin]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[CaseMgmt]([cfa_admin_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[CaseMgmt]([jobseeker_id]);

-- AddForeignKey
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CareerPrepApplication] ADD CONSTRAINT [fk_career_prep_app_jobseeker1] FOREIGN KEY ([career_prep_app_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [fk_case_mgmt_user1] FOREIGN KEY ([cfa_admin_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [fk_case_mgmt_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[CareerPrepApplication]([career_prep_app_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_case_mgmt1] FOREIGN KEY ([caseMgmtId]) REFERENCES [dbo].[CaseMgmt]([case_mgmt_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_user1] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
