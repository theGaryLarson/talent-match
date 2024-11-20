/*
  Warnings:

  - The primary key for the `CareerPrepAssessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `career_prep_app_id` on the `CareerPrepAssessment` table. All the data in the column will be lost.
  - Added the required column `jobseekerId` to the `CareerPrepAssessment` table without a default value. This is not possible if the table is not empty.

*/

BEGIN TRY

    BEGIN TRAN;

-- Drop foreign keys that depend on `career_prep_app_id`
    ALTER TABLE [dbo].[CareerPrepAssessment] DROP CONSTRAINT [fk_career_prep_app_jobseeker1];
    ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [CaseMgmt_jobseeker_id_fkey];
    ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [fk_case_mgmt_notes_case_mgmt1];
    ALTER TABLE [dbo].[Meeting] DROP CONSTRAINT [fk_meeting_career_prep_assessment1];

-- Drop the default constraint on `career_prep_app_id`
    ALTER TABLE [dbo].[CareerPrepAssessment] DROP CONSTRAINT [CareerPrepAssessment_career_prep_app_id_df];

-- Drop primary key and column
    ALTER TABLE [dbo].[CareerPrepAssessment] DROP CONSTRAINT [career_prep_app_PRIMARY];
    ALTER TABLE [dbo].[CareerPrepAssessment] DROP COLUMN [career_prep_app_id];

-- Add new column `jobseekerId` before setting it as the primary key
    ALTER TABLE [dbo].[CareerPrepAssessment] ADD [jobseekerId] UNIQUEIDENTIFIER NOT NULL;

-- Add primary key on `jobseekerId`
    ALTER TABLE [dbo].[CareerPrepAssessment] ADD CONSTRAINT career_prep_app_PRIMARY PRIMARY KEY NONCLUSTERED ([jobseekerId]);

-- Modify `CaseMgmtNotes` table constraints
    ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
    ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- Modify `skill_subcategories` table constraints
    ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
    ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- Re-add foreign keys with new column reference
    ALTER TABLE [dbo].[CareerPrepAssessment] ADD CONSTRAINT [fk_career_prep_app_jobseeker1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_jobseeker_id_fkey] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;

    ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [fk_case_mgmt_notes_case_mgmt1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

    ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [fk_meeting_career_prep_assessment1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

    COMMIT TRAN;

END TRY
BEGIN CATCH

    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW

END CATCH
