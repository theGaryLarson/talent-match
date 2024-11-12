/*
  Warnings:

  - You are about to drop the `CareerPrepApplication` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CareerPrepApplication] DROP CONSTRAINT [fk_career_prep_app_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [CaseMgmt_careerPrepApplicationJobseekerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[CareerPrepApplication];

-- CreateTable
CREATE TABLE [dbo].[CareerPrepAssessment] (
    [career_prep_app_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CareerPrepAssessment_career_prep_app_id_df] DEFAULT newid(),
    [applicationDate] DATETIME2 NOT NULL,
    [pronouns] VARCHAR(15) NOT NULL,
    [expectedEduCompletion] VARCHAR(45),
    [experienceWithApplying] BIT NOT NULL,
    [experienceWithInterview] BIT NOT NULL,
    [experienceInIT] BIT NOT NULL,
    CONSTRAINT [career_prep_app_PRIMARY] PRIMARY KEY NONCLUSTERED ([career_prep_app_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CareerPrepAssessment] ADD CONSTRAINT [fk_career_prep_app_jobseeker1] FOREIGN KEY ([career_prep_app_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_careerPrepApplicationJobseekerId_fkey] FOREIGN KEY ([careerPrepApplicationJobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([career_prep_app_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
